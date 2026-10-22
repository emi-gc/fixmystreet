# Fix My Street

A web app for neighbors to report urban problems, built with HTML, CSS, Bootstrap, Leaflet, Express and MongoDB for Web Development Class.

## Run locally

Requires Node.js 20.19+ and MongoDB (local or Atlas). GitHub Pages only serves static files and cannot run the Express server or `/reports` API.

```sh
npm ci
```

Create a `.env` file in the project root, using a local development database:

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/fixmystreet
PORT=3000
```

Alternatively, use an Atlas `MONGODB_URI` or the existing `DB_USER` and `DB_PASSWORD` variables. Atlas also requires database permissions and an allowed client IP. Credentials are URI-encoded when using those two variables. The connection uses the system DNS resolver. `.env` is ignored by Git and is not served by Express.

```sh
npm start
```

Open http://localhost:3000/index.html. HTTP starts only after the database connects. A failed connection exits with a nonzero status rather than serving an application that cannot save reports.

## Automated checks

```sh
npm test
```

This runs form/coordinate validation, HTTP status and read/write failure checks, startup failure, map rendering logic, safe popup text, location controls and Other field behavior. These use the real Express routes and Mongoose schema with test doubles for storage and the browser APIs.

For the additional real MongoDB integration check, add a dedicated test database to `.env` and run `npm test` again:

```dotenv
MONGODB_TEST_URI=mongodb://127.0.0.1:27017/fixmystreet_test
```

That check sends a form POST, inspects the saved MongoDB document and reads it through `/reports` using a second app instance. It removes only the records it creates. Without `MONGODB_TEST_URI`, it is explicitly skipped. Use a development database, not production.

## Manual end-to-end cases

Use browser DevTools > Network with **Preserve log** enabled to inspect the POST response. The form navigates to `/reports`, which returns the thank-you HTML with status **201**, after `Report.create` resolves. The map fetches **GET `/reports`**, which returns a JSON array. Coordinates are numbers under `location.latitude` and `location.longitude`.

| Case | Steps | Expected result |
| --- | --- | --- |
| Other | Choose Other, enter `Fallen tree`, describe it, click the map and submit. | POST `/reports` returns 201; MongoDB and GET `/reports` contain `issueType: "Fallen tree"`, not `"Other"`. Surrounding text whitespace is trimmed. |
| Empty Other | Choose Other and leave the extra input empty or enter spaces. | Browser blocks submission; a direct form POST returns 400 and creates no report. |
| Switch category | Enter an Other value, then select Pothole and submit with a location and description. | Extra input is cleared and disabled; saved category is Pothole. |
| Missing location | Fill the text fields and submit without clicking the map; also try after Remove pin. | Browser blocks submission. Hidden coordinates are empty after removal. Missing, blank or invalid direct POST coordinates return 400. |
| Geolocation | Use my location, first denying permission, then allowing it. | Denial shows an error and re-enables the button. Success places a report pin and blue location dot. You can also click the map after denial. |
| Map wrapping | Pan horizontally around the world and click a point. | Longitude is normalized to [-180, 180] before submission. |
| Saved pin | Submit a report near the initial map view, return to the map, reload and also open Home. | Both maps fetch the stored report and show its pin. Click it to see the custom category and description as literal text. For distant reports, pan to the submitted coordinates. |
| Persistence | Restart the Node server and revisit the map. | The report remains in MongoDB and reappears through GET `/reports`. The schema's existing TTL index expires reports after approximately 30 days. |
| Invalid legacy report | In a disposable database, insert a raw report with latitude 91 or null, alongside a valid report, and reload. | Invalid report is skipped; the valid pin still renders. Existing records are not rewritten. |
| Database unavailable | Start with an invalid MongoDB URI; separately stop the local database while the application is running. | Startup failure never opens HTTP. Runtime read/write failures return 500 after the database timeout, with no successful save page. A failed map read displays a reload message. |

Direct API check (use `curl.exe` on Windows if `curl` is a PowerShell alias):

```sh
curl -i http://localhost:3000/reports --data-urlencode "issueType=Other" --data-urlencode "otherIssue=Fallen tree" --data-urlencode "description=Blocks the sidewalk" --data-urlencode "latitude=20.6742" --data-urlencode "longitude=-103.4386"
curl -i http://localhost:3000/reports
```

Repeat the POST with `otherIssue=   `, `latitude=   `, `latitude=91`, `longitude=181`, or with a coordinate omitted: expect **400** and no extra document. `latitude=0` and `longitude=0` are valid coordinates and must be accepted.

## Audit verification, 2026-10-22

The integration was checked locally with Chromium, real Leaflet 1.9.4, Express and an isolated MongoDB 8.2.6 process. It covered Other validation and normalization, a map click, removal, the actual browser POST/201, MongoDB contents, GET `/reports`, pins on both pages, literal popup text, geolocation success/denial, longitude wrapping, and a visible failed-read message. No page JavaScript errors were observed. Bootstrap and map tile requests were replaced during this functional check; external CDN/tile availability and production Atlas connectivity were not tested.
