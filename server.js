import express from "express";
import "dotenv/config";
import path from "node:path";
import { connectDB } from "./config/connectDB.js";
import Report from "./models/Report.js";
import { fileURLToPath } from "node:url";
import { loadEnvFile } from "node:process";

const app = express();
const port = 3000;
const currentFile = fileURLToPath(import.meta.url);

const currentDirectory = path.dirname(currentFile);
const dbuser = process.env.DB_USER;//get user for database from .env
const dbpass = process.env.DB_PASSWORD;//get password for database user from.env
const dbname = 'reports';//name of the database

const mongourl = `mongodb+srv://${dbuser}:${dbpass}@cluster0.jt2fuzs.mongodb.net/${dbname}`;

app.use(express.urlencoded({ extended: false }));

//deliver the mainpage html
app.get("/", (req, res) => {
  res.sendFile(path.join(currentDirectory, "mainPage.html"));
});

//gets the reports from the database
app.get("/reports", async (req, res) => {
    try {
      const reports = await Report.find();
      res.json(reports);
    } catch (error) {
      res.status(500).send("Error retrieving reports");
    }
});

//uploads reports to the database
app.post("/reports", async (req, res) => {
  try {
    const { issueType, description, latitude, longitude, otherIssue } = req.body;
    const parsedLatitude = Number(latitude);
    const parsedLongitude = Number(longitude);

    //check content of values from the form
    if (
      !issueType ||
      !description?.trim() ||
      latitude === "" ||
      longitude === "" ||
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
    await Report.create({
      issueType,
      description: description.trim(),
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

//function to run everything at the same time (for some reason it was slower to start server.js)
// async function startServer() {
//   await connectDB(mongourl);
  
//   app.listen(port, () => {
//     console.log(`FixMyStreet is running at http://localhost:${port}`);
//   });

// }

app.listen(port, () => {
  console.log(`FixMyStreet is running at http://localhost:${port}`);
});
//connect the database with the url
await connectDB(mongourl);
//startServer();
