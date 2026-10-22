import express from "express";
import "dotenv/config";
import path from "node:path";
import { connectDB } from "./config/connectDB.js";
import Report from "./models/Report.js";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);

const currentDirectory = path.dirname(currentFile);
// Export the app separately so tests do not start a listener or connect to Atlas.
export function createApp(ReportModel = Report) {
  const app = express();

  app.use(express.urlencoded({ extended: false }));

  //deliver the mainpage html
  app.get("/", (req, res) => {
    res.sendFile(path.join(currentDirectory, "mainPage.html"));
  });

  //gets the reports from the database
  app.get("/reports", async (req, res) => {
    try {
      const reports = await ReportModel.find();
      res.set("Cache-Control", "no-store");
      res.json(reports);
    } catch (error) {
      res.status(500).send("Error retrieving reports");
    }
  });

  //uploads reports to the database
  app.post("/reports", async (req, res) => {
    try {
      const { issueType, description, latitude, longitude, otherIssue } = req.body ?? {};
      const parsedLatitude = Number(latitude);
      const parsedLongitude = Number(longitude);
      const selectedIssueType = typeof issueType === "string" ? issueType.trim() : "";
      const customIssueType = typeof otherIssue === "string" ? otherIssue.trim() : "";
      const reportDescription = typeof description === "string" ? description.trim() : "";

      //check content of values from the form
      if (
        !selectedIssueType ||
        !reportDescription ||
        (selectedIssueType === "Other" && !customIssueType) ||
        typeof latitude !== "string" || !latitude.trim() ||
        typeof longitude !== "string" || !longitude.trim() ||
        !Number.isFinite(parsedLatitude) ||
        !Number.isFinite(parsedLongitude) ||
        parsedLatitude < -90 ||
        parsedLatitude > 90 ||
        parsedLongitude < -180 ||
        parsedLongitude > 180
      ) {
        return res.status(400).send("Issue type, description, and your location are required.");
      }
      //create the report in the database
      await ReportModel.create({
        issueType: selectedIssueType === "Other" ? customIssueType : selectedIssueType,
        description: reportDescription,
        location: {
          latitude: parsedLatitude,
          longitude: parsedLongitude
        }
      });

      // show the thank-you page after the report is saved
      return res.status(201).sendFile(path.join(currentDirectory, "report-submitted.html"));

    } catch (error) {
      console.error("Error saving report: ", error);
      return res.status(500).send("Error saving report");
    }
  });

  // the html files are now beside server.js
  app.get([
    "/mainPage.html",
    "/index.html",
    "/about.html",
    "/contact.html",
    "/privacy.html",
    "/report-submitted.html"
  ], (req, res) => {
    const pageName = path.basename(req.path);
    res.sendFile(path.join(currentDirectory, pageName));
  });

  // serve the website's asset folders
  app.use("/css", express.static(path.join(currentDirectory, "css")));
  app.use("/js", express.static(path.join(currentDirectory, "js")));
  app.use("/images", express.static(path.join(currentDirectory, "images")));

  return app;
}

// Only accept requests after MongoDB is ready. MONGODB_URI also supports local MongoDB.
if (process.argv[1] && path.resolve(process.argv[1]) === currentFile) {
  const port = Number(process.env.PORT || 3000);
  const dbuser = process.env.DB_USER;
  const dbpass = process.env.DB_PASSWORD;
  const mongoURL = process.env.MONGODB_URI || (dbuser && dbpass
    ? `mongodb+srv://${encodeURIComponent(dbuser)}:${encodeURIComponent(dbpass)}@cluster0.jt2fuzs.mongodb.net/reports`
    : null);

  try {
    if (!mongoURL) throw new Error("Set MONGODB_URI or both DB_USER and DB_PASSWORD in .env");
    await connectDB(mongoURL);
    createApp().listen(port, () => {
      console.log(`FixMyStreet is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exitCode = 1;
  }
}
