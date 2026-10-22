import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import { test } from "node:test";

const mapSource = await readFile(new URL("../js/map.js", import.meta.url), "utf8");
const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

function element() {
  return {
    value: "", disabled: false, style: {}, events: {}, validityMessage: "", textContent: "",
    addEventListener(event, handler) { this.events[event] = handler; },
    setCustomValidity(message) { this.validityMessage = message; }
  };
}

async function setup({ reports = [], failure = false, form = true } = {}) {
  const ids = Object.fromEntries([
    "map", "reportsStatus", ...(form ? ["reportForm", "latitude", "longitude", "locationStatus", "useLocation", "removePin"] : [])
  ].map(id => [id, element()]));
  const markers = [];
  const map = { events: {}, setView() {}, removeLayer(pin) { pin.removed = true; }, on(event, handler) { this.events[event] = handler; } };
  const navigator = { geolocation: { getCurrentPosition(success, error) { this.success = success; this.error = error; } } };
  const context = vm.createContext({
    document: { getElementById: id => ids[id], createElement: element }, navigator,
    console: { error() {} },
    fetch: async url => {
      assert.equal(url, "/reports");
      return { ok: !failure, json: async () => reports };
    },
    L: {
      map: () => map, tileLayer: () => ({ addTo() {} }),
      marker: coordinates => {
        const pin = { coordinates, addTo() {}, bindPopup(popup) { this.popup = popup; } };
        markers.push(pin); return pin;
      },
      circleMarker: () => ({ addTo() {}, bindTooltip() {} })
    }
  });
  vm.runInContext(mapSource, context);
  await new Promise(resolve => setImmediate(resolve));
  return { ids, map, markers, navigator };
}

test("map skips invalid legacy locations and renders subsequent valid reports as text", async () => {
  const { markers, ids } = await setup({ form: false, reports: [
    null, {}, { location: { latitude: null, longitude: null } },
    { location: { latitude: "", longitude: "" } },
    { location: { latitude: 91, longitude: 0 } },
    { location: { latitude: 0, longitude: 181 } },
    { issueType: "<script>custom</script>", description: "<img onerror=alert(1)>",
      location: { latitude: 0, longitude: 0 }, createdAt: "2026-10-22T00:00:00Z" }
  ] });
  assert.equal(markers.length, 1);
  assert.equal(markers[0].coordinates[0], 0);
  assert.match(markers[0].popup.textContent, /<script>custom<\/script>: <img/);
  assert.equal(ids.reportsStatus.textContent, "");
});

test("map reports fetch failures and malformed responses visibly", async () => {
  for (const options of [{ failure: true }, { reports: {} }]) {
    const { ids } = await setup(options);
    assert.match(ids.reportsStatus.textContent, /Could not load saved reports/);
  }
});

test("location selection, wrapping, removal, geolocation denial and retry", async () => {
  const { ids, map, navigator } = await setup();
  function prevented() {
    let blocked = false;
    ids.reportForm.onsubmit({ preventDefault() { blocked = true; } });
    return blocked;
  }
  assert.equal(prevented(), true);
  map.events.click({ latlng: { wrap: () => ({ lat: 20, lng: -179 }) } });
  assert.equal(ids.latitude.value, 20);
  assert.equal(ids.longitude.value, -179);
  // Browser input.value is always a string.
  ids.latitude.value = String(ids.latitude.value);
  ids.longitude.value = String(ids.longitude.value);
  assert.equal(prevented(), false);
  ids.removePin.onclick();
  assert.equal(ids.latitude.value, "");
  assert.equal(ids.longitude.value, "");
  assert.equal(ids.removePin.disabled, true);
  assert.equal(prevented(), true);
  ids.useLocation.onclick();
  assert.equal(ids.useLocation.disabled, true);
  navigator.geolocation.error();
  assert.equal(ids.useLocation.disabled, false);
  assert.match(ids.locationStatus.textContent, /Could not get your location/);
  ids.useLocation.onclick();
  navigator.geolocation.success({ coords: { latitude: 20.6742, longitude: -103.4386 } });
  assert.equal(ids.latitude.value, 20.6742);
  assert.equal(ids.useLocation.disabled, false);
});

test("Other toggles required input, clears stale values and rejects whitespace", () => {
  const ids = Object.fromEntries(["issueType", "otherIssue", "otherIssueContainer", "description"].map(id => [id, element()]));
  const window = element();
  const context = vm.createContext({ document: { getElementById: id => ids[id] }, window });
  const inlineScript = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)][0][1];
  vm.runInContext(inlineScript, context);
  assert.equal(ids.otherIssue.disabled, true);
  ids.issueType.value = "Other";
  ids.issueType.events.change();
  assert.equal(ids.otherIssue.required, true);
  assert.equal(ids.otherIssue.disabled, false);
  ids.otherIssue.value = "   ";
  ids.otherIssue.events.input.call(ids.otherIssue);
  assert.equal(ids.otherIssue.validityMessage, "Specify the issue.");
  ids.otherIssue.value = "Fallen tree";
  ids.otherIssue.events.input.call(ids.otherIssue);
  assert.equal(ids.otherIssue.validityMessage, "");
  ids.issueType.value = "Pothole";
  ids.issueType.events.change();
  assert.equal(ids.otherIssue.value, "");
  assert.equal(ids.otherIssue.required, false);
  ids.issueType.value = "Other";
  window.events.pageshow();
  assert.equal(ids.otherIssueContainer.style.display, "block");
  ids.otherIssue.value = "   ";
  window.events.pageshow();
  assert.equal(ids.otherIssue.validityMessage, "Specify the issue.");
});
