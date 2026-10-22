
const mapElement = document.getElementById("map");

// only set up the map on pages that have one
if (mapElement) {
    const map = L.map("map");
    map.setView([20.6742, -103.4386], 15);

    const mapTiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    });
    mapTiles.addTo(map);
    const reportsStatus = document.getElementById("reportsStatus");

    function validCoordinates(latitude, longitude) {
        return typeof latitude === "number" && Number.isFinite(latitude) &&
            latitude >= -90 && latitude <= 90 &&
            typeof longitude === "number" && Number.isFinite(longitude) &&
            longitude >= -180 && longitude <= 180;
    }

    // show the saved reports
    async function loadReports() {
        try {
            // wait for the server to send the saved reports
            const response = await fetch("/reports", { cache: "no-store" });

            if (!response.ok) {
                throw new Error("Could not load reports");
            }

            const reports = await response.json();
            if (!Array.isArray(reports)) {
                throw new Error("Invalid reports response");
            }

            for (let i = 0; i < reports.length; i++) {
                const report = reports[i];

                // skip reports that have no usable coordinates
                if (!report?.location) {
                    continue;
                }

                const { latitude, longitude } = report.location;

                if (!validCoordinates(latitude, longitude)) {
                    continue;
                }

                // textcontent displays text without treating it as html
                const popup = document.createElement("div");
                const reportDate = new Date(report.createdAt).toLocaleDateString();
                popup.textContent = report.issueType + ": " + report.description +
                    " (Reported: " + reportDate + ")";

                const savedPin = L.marker([latitude, longitude]);
                savedPin.addTo(map);
                savedPin.bindPopup(popup);
            }
            if (reportsStatus) reportsStatus.textContent = "";
        } catch (error) {
            if (reportsStatus) {
                reportsStatus.textContent = "Could not load saved reports. Reload the page to try again.";
            }
            console.error("Error loading reports:", error);
        }
    }

    loadReports();

    // the controls below are only used on the report page
    const reportForm = document.getElementById("reportForm");

    if (reportForm) {
        const latitudeInput = document.getElementById("latitude");
        const longitudeInput = document.getElementById("longitude");
        const locationStatus = document.getElementById("locationStatus");
        const useLocationButton = document.getElementById("useLocation");
        const removePinButton = document.getElementById("removePin");

        // null means no pin or dot has been placed yet
        let reportPin = null;
        let blueDot = null;

        // replace the old pin and save the new coordinates
        function placeReportPin(latitude, longitude) {
            if (!validCoordinates(latitude, longitude)) {
                locationStatus.textContent = "Invalid location. Click the map or try your location again.";
                return false;
            }
            if (reportPin) {
                map.removeLayer(reportPin);
            }

            reportPin = L.marker([latitude, longitude]);
            reportPin.addTo(map);

            // these hidden fields are sent with the report form
            latitudeInput.value = latitude;
            longitudeInput.value = longitude;
            removePinButton.disabled = false;
            locationStatus.textContent = "Report pin placed. Click the map to move it.";
            return true;
        }

        // a map click gives us the coordinates of that point
        function selectOnMap(event) {
            // Leaflet can return longitudes beyond +/-180 after panning around the world.
            const coordinates = event.latlng.wrap();
            placeReportPin(coordinates.lat, coordinates.lng);
        }

        // ask for location only when the button is pressed
        function useLocation() {
            if (!navigator.geolocation) {
                locationError();
                return;
            }

            useLocationButton.disabled = true;
            locationStatus.textContent = "Getting your location...";

            // the browser runs showlocation on success or locationerror on failure
            navigator.geolocation.getCurrentPosition(showLocation, locationError, { timeout: 10000 });
        }

        // this runs when the browser finds a location
        function showLocation(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            if (!placeReportPin(latitude, longitude)) {
                useLocationButton.disabled = false;
                return;
            }

            // replace the blue dot without changing any saved reports
            if (blueDot) {
                map.removeLayer(blueDot);
            }

            blueDot = L.circleMarker([latitude, longitude], {
                radius: 9,
                color: "white",
                weight: 3,
                fillColor: "#287ff0",
                fillOpacity: 1
            });
            blueDot.addTo(map);
            blueDot.bindTooltip("Your location");

            map.setView([latitude, longitude], 16);
            locationStatus.textContent = "The blue dot shows your location. The pin marks your report.";
            useLocationButton.disabled = false;
        }

        // allow another attempt if location could not be found
        function locationError() {
            locationStatus.textContent = "Could not get your location. Check your browser permissions or click the map.";
            useLocationButton.disabled = false;
        }

        // remove only the report pin, keeping the blue dot
        function removePin() {
            if (reportPin) {
                map.removeLayer(reportPin);
            }

            reportPin = null;
            latitudeInput.value = "";
            longitudeInput.value = "";
            removePinButton.disabled = true;
            locationStatus.textContent = "Pin removed. Click the map or use your location to place a new pin.";
        }

        // do not submit until a pin is placed
        function checkPin(event) {
            if (!reportPin || !latitudeInput.value.trim() || !longitudeInput.value.trim() ||
                !validCoordinates(Number(latitudeInput.value), Number(longitudeInput.value))) {
                event.preventDefault();
                locationStatus.textContent = "Click the map or use your location before submitting.";
            }
        }

        // connect each action to its function
        map.on("click", selectOnMap);
        useLocationButton.onclick = useLocation;
        removePinButton.onclick = removePin;
        reportForm.onsubmit = checkPin;
    }
}
