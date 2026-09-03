# Team Developer Log
 
**Project Name:** [Insert Project Name]  
**Team Members:** [Member 1, Member 2, Member 3]  
**Active Repository Path:** [e.g., /client or /server or Monorepo Root]
 
---
 
## Session [X] Log Entry
*Duplicate this section for each active coding session, class lab sprint, or out-of-class development block.*
 
### ⏱️ Session Overview
* **Date:** [YYYY-MM-DD]
* **Module/Feature Scope:** [e.g., Express.js Server Setup / CSS Box Model Layout / React State Integration]
* **Est. Time Invested:** [e.g., 2.5 hours]
* **Active Developers:** [List names of team members who coded in this session]
 
### 🎯 Session Goals
*Identify what you planned to accomplish before starting to write code.*
- [ ] Goal 1: [e.g., Set up Express backend server boilerplate on port 5000]
- [ ] Goal 2: [e.g., Configure CORS and body-parser middleware]
- [ ] Goal 3: [e.g., Test active server connection with a GET /api/health endpoint]
 
### 🔨 Tasks Completed
*Describe what you actually worked on during this session.*
* [x] **Boilerplate server setup:** Created `/server/server.js` and initialized npm workspace directory.
* [x] **Configured API foundations:** Integrated Express, implemented standard server listening on fallback environment port `3000`.
* [x] **Configured CORS:** Restocked server header settings to permit incoming fetch requests from our static frontend origin.
 
### 🧠 Concepts Mastered & Key Learnings
*What technical concepts did you learn or consolidate during this session? Explain the underlying mechanics in 2-3 sentences.*
* **Underlying Mechanics:** We learned how Express middleware works as a sequential pipeline. When a request hits the server, it passes through `express.json()` to parse raw incoming payloads, then `cors()` to intercept and validate headers, before finally routing to our custom endpoint handlers. This prevents manual buffer parsing.
 
### 🛠️ Systematic Bug & Error Tracker
*Record technical roadblocks faced and how they were systematically resolved. Treat these as study guides for your Oral Defense!*
 
* **Roadblock 1 (The Error):**
  * ❌ *Error Message / Behavior:* `Error: Listen EADDRINUSE: address already in use :::3000` when executing `node server.js`.
  * ⚙️ *Diagnostic Action:* Ran `lsof -i :3000` in the terminal to identify what background service was hijacking our target port.
  * ✅ *Root Cause & Resolution:* A previously crashed node process was left hanging on port 3000. Resolved by executing `kill -9 <PID>` to free up the port, and modified our server configuration to use a fallback port pattern: `const PORT = process.env.PORT || 5000;`.
 
* **Roadblock 2 (The Error):**
  * ❌ *Error Message / Behavior:* `Access to fetch at 'http://localhost:5000/api/health' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy.`
  * ⚙️ *Diagnostic Action:* Examined incoming network request headers in Chrome DevTools Network Tab. Found `Access-Control-Allow-Origin` was missing from response headers.
  * ✅ *Root Cause & Resolution:* The backend was receiving requests but rejecting the browser's request origins. Resolved by installing the CORS package (`npm i cors`) and mounting it early in our middleware chain: `app.use(cors({ origin: 'http://127.0.0.1:5500' }))`.
 
### 📚 Documentation & Reference Links
*List any documentation, textbooks, or tutorials utilized during development.*
* MDN Web Docs - [Express/Node Introduction](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)
* Express.js Official Guide - [Using Middleware](https://expressjs.com/en/guide/using-middleware.html)
 
### 🔮 Next Horizon Actions
*What must be done next to build on this session's progress?*
1. Define a persistent database connection script using Mongoose to connect to MongoDB Atlas.
2. Design the `/api/users` user model schema to validate email inputs and passwords.
 