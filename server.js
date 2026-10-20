import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = 3000;
const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);
const publicDirectory = path.join(currentDirectory, "public");
const reports = [];

app.use(express.urlencoded({ extended: false }));

app.get("/reports", (req, res) => {
    res.json(reports);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(publicDirectory, "mainPage.html"));
});

app.post("/reports", (req, res) => {
  const { issueType, description, latitude, longitude } = req.body;
  const parsedLatitude = Number(latitude);
  const parsedLongitude = Number(longitude);

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

  reports.push({
    id: reports.length + 1,
    issueType,
    description: description.trim(),
    location: { latitude: parsedLatitude, longitude: parsedLongitude },
    createdAt: new Date().toISOString(),
  });

  return res.status(201).send(`
    <h1>Report submitted</h1>
    <p>Thank you for helping improve your community.</p>
    <p><a href="/index.html">Submit another report</a></p>
  `);
});

app.use(express.static(publicDirectory));

app.listen(port, () => {
  console.log(`FixMyStreet is running at http://localhost:${port}`);
});
