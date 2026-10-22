import assert from "node:assert/strict";
import { once } from "node:events";
import { test } from "node:test";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import mongoose from "mongoose";
import { createApp } from "../server.js";
import Report from "../models/Report.js";

const valid = {
  issueType: "Other", otherIssue: "  Fallen tree  ", description: "  Blocks the road  ",
  latitude: "20.6742", longitude: "-103.4386"
};

async function serve(t, model) {
  const server = createApp(model).listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve())));
  return `http://127.0.0.1:${server.address().port}`;
}

function submit(base, body) {
  return fetch(`${base}/reports`, { method: "POST", body: new URLSearchParams(body) });
}

test("form submission returns 201 after save and GET exposes the normalized document", async t => {
  const stored = [];
  const base = await serve(t, {
    async create(data) {
      const report = new Report(data);
      await report.validate();
      report.createdAt = new Date();
      stored.push(report.toObject());
    },
    async find() { return stored; }
  });
  let response = await submit(base, valid);
  assert.equal(response.status, 201);
  assert.match(response.headers.get("content-type"), /text\/html/);
  assert.match(await response.text(), /Your report has been saved/);
  response = await fetch(`${base}/reports`);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  const [report] = await response.json();
  assert.equal(report.issueType, "Fallen tree");
  assert.equal(report.description, "Blocks the road");
  assert.deepEqual(report.location, { latitude: 20.6742, longitude: -103.4386 });
  assert.ok(report._id && report.createdAt);

  response = await submit(base, { ...valid, issueType: "Pothole", otherIssue: "ignored", latitude: "0", longitude: "0" });
  assert.equal(response.status, 201);
  assert.equal(stored[1].issueType, "Pothole");
  assert.deepEqual(stored[1].location, { latitude: 0, longitude: 0 });
  assert.equal((await fetch(`${base}/.env`)).status, 404);
  for (const page of ["/", "/index.html", "/mainPage.html", "/js/map.js", "/css/mainStyle.css"]) {
    assert.equal((await fetch(base + page)).status, 200, page);
  }
});

test("invalid form bodies return 400 without attempting a database write", async t => {
  let writes = 0;
  const base = await serve(t, { create() { writes++; }, find() { return []; } });
  const cases = [
    {}, { ...valid, otherIssue: "" }, { ...valid, otherIssue: "   " },
    { ...valid, issueType: "   " }, { ...valid, description: "   " },
    ...["latitude", "longitude"].flatMap(field => [
      ...["", "   ", "NaN", "Infinity", "abc"].map(value => ({ ...valid, [field]: value })),
      Object.fromEntries(Object.entries(valid).filter(([key]) => key !== field))
    ]),
    { ...valid, latitude: "90.001" }, { ...valid, latitude: "-90.001" },
    { ...valid, longitude: "180.001" }, { ...valid, longitude: "-180.001" },
    // Repeated fields are arrays with express.urlencoded({ extended: false }).
    [...Object.entries(valid), ["description", "duplicate"]],
    [...Object.entries(valid), ["otherIssue", "duplicate"]],
    [...Object.entries(valid), ["latitude", "duplicate"]],
    [...Object.entries(valid), ["issueType", "duplicate"]]
  ];
  for (const body of cases) assert.equal((await submit(base, body)).status, 400, JSON.stringify(body));
  const unsupported = await fetch(`${base}/reports`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(valid)
  });
  assert.equal(unsupported.status, 400);
  assert.equal(writes, 0);
});

test("201 is withheld while a write is pending; failures return 500", async t => {
  let finishWrite;
  let markStarted;
  const started = new Promise(resolve => { markStarted = resolve; });
  const pendingWrite = new Promise(resolve => { finishWrite = resolve; });
  const base = await serve(t, {
    async create() { markStarted(); await pendingWrite; },
    async find() { throw new Error("Read unavailable"); }
  });
  let finished = false;
  const request = submit(base, valid).then(response => { finished = true; return response; });
  await started;
  assert.equal(finished, false);
  finishWrite();
  assert.equal((await request).status, 201);
  assert.equal((await fetch(`${base}/reports`)).status, 500);

  const failingBase = await serve(t, {
    async create() { throw new Error("Write unavailable"); }
  });
  const failed = await submit(failingBase, valid);
  assert.equal(failed.status, 500);
  assert.doesNotMatch(await failed.text(), /Your report has been saved/);
});

test("a database connection failure exits without opening the HTTP server", async () => {
  await assert.rejects(promisify(execFile)(process.execPath, ["server.js"], {
    cwd: new URL("..", import.meta.url),
    env: { ...process.env, MONGODB_URI: "invalid-mongodb-uri", PORT: "0" }
  }), error => {
    assert.equal(error.code, 1);
    assert.match(error.stderr, /Database Connection Error/);
    assert.doesNotMatch(error.stdout, /FixMyStreet is running/);
    return true;
  });
});

test("MongoDB integration: saved document survives a new app instance", {
  skip: !process.env.MONGODB_TEST_URI
}, async t => {
  await mongoose.connect(process.env.MONGODB_TEST_URI);
  const ids = [];
  t.after(async () => {
    try { await Report.deleteMany({ _id: { $in: ids } }); }
    finally { await mongoose.disconnect(); }
  });
  const description = `Report audit ${crypto.randomUUID()}`;
  const base = await serve(t, Report);
  const response = await submit(base, { ...valid, description });
  assert.equal(response.status, 201);
  const saved = await Report.findOne({ description }).lean();
  assert.ok(saved);
  ids.push(saved._id);
  assert.equal(saved.issueType, "Fallen tree");
  assert.equal(saved.location.latitude, 20.6742);
  assert.equal(saved.location.longitude, -103.4386);
  const secondBase = await serve(t, Report);
  const reports = await (await fetch(`${secondBase}/reports`)).json();
  assert.ok(reports.some(report => report._id === String(saved._id) && report.issueType === "Fallen tree"));
});
