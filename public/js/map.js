
const mapElement = document.querySelector("#map");

// Only initialize Leaflet on pages containing the map
if (mapElement) {
    const map = L.map("map").setView([20.6742, -103.4386], 15);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const reportMarkers = L.layerGroup().addTo(map);

    let selectedMarker = null;
    let selectedCoordinates = null;

    async function loadReports() {
        try {
            const response = await fetch("/reports");

            if (!response.ok) {
                throw new Error("Could not load reports");
            }

            const reports = await response.json();

            reportMarkers.clearLayers();

            reports.forEach(report => {
                const latitude = Number(report.location?.latitude);
                const longitude = Number(report.location?.longitude);

                if (!Number.isFinite(latitude) ||
                    !Number.isFinite(longitude)) {
                    return;
                }

                L.marker([latitude, longitude])
                    .addTo(reportMarkers)
                    .bindPopup(`
                        <strong>${escapeHTML(report.issueType)}</strong>
                        <p>${escapeHTML(report.description)}</p>
                        <small>Reported: ${
                            new Date(report.createdAt).toLocaleDateString()
                        }</small>
                    `);
            });
        } catch (error) {
            console.error("Error loading reports:", error);
        }
    }

    function escapeHTML(value = "") {
        return String(value).replace(/[&<>"']/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[character]);
    }

    const reportForm = document.querySelector("#reportForm");
    const latitudeInput = document.querySelector("#latitude");
    const longitudeInput = document.querySelector("#longitude");
    const locationStatus = document.querySelector("#locationStatus");

    // Only enable report-location selection on the report page
    if (reportForm && latitudeInput && longitudeInput) {
        map.on("click", event => {
            selectedCoordinates = event.latlng;

            latitudeInput.value = event.latlng.lat;
            longitudeInput.value = event.latlng.lng;

            if (selectedMarker) {
                selectedMarker.setLatLng(event.latlng);
            } else {
                selectedMarker = L.marker(event.latlng).addTo(map);
            }

            selectedMarker
                .bindPopup("Selected location for your report")
                .openPopup();

            if (locationStatus) {
                locationStatus.textContent =
                    `Location selected: ${event.latlng.lat.toFixed(5)}, ` +
                    `${event.latlng.lng.toFixed(5)}.`;
            }
        });

        // Run before the existing geolocation form handler
        reportForm.addEventListener("submit", event => {
            if (!selectedCoordinates) return;

            latitudeInput.value = selectedCoordinates.lat;
            longitudeInput.value = selectedCoordinates.lng;
            reportForm.dataset.locationReady = "true";
        }, true);
    }

    loadReports();
}
