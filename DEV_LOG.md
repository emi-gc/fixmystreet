# Team Developer Log

**Project Name:** [FixMyStreet]  
**Team Members:** [Ian Uribe Maldonado, Jose Emiliano Gomez Cortes, Santiago de la Torre Zamudio]  
**Active Repository Path:** [(https://github.com/emi-gc/fixmystreet.git)]

---

## Session [1] Log Entry

_Duplicate this section for each active coding session, class lab sprint, or out-of-class development block._

### ⏱️ Session Overview

- **Date:** [2006-09-06]
- **Module/Feature Scope:** [Creating the main html file]
- **Est. Time Invested:** [e.g., 2.5 hours]
- **Active Developers:** [Ian Uribe]

### 🎯 Session Goals

_Identify what you planned to accomplish before starting to write code._

- [ ] Goal 1: [Setup the index.html file]
- [ ] Goal 2: [create the barebones for the main page]

### 🔨 Tasks Completed

_Describe what you actually worked on during this session._

- [x] **Setup the index.html file:** Created the main file .
- [x] **Create the barebones:** Started the main layout for the web page .

### 🧠 Concepts Mastered & Key Learnings

_What technical concepts did you learn or consolidate during this session? Explain the underlying mechanics in 2-3 sentences._

- **Underlying Mechanics:** We learned how bootstrap uses the row and col classes to organize all the components inside the html neatly. Also some of the options that bootstrap offers to style
  some elements

### 🛠️ Systematic Bug & Error Tracker

_Record technical roadblocks faced and how they were systematically resolved. Treat these as study guides for your Oral Defense!_

- None were encountered today

### 📚 Documentation & Reference Links

_List any documentation, textbooks, or tutorials utilized during development._

- Bootstrap documentation - [Card/Navbar](https://getbootstrap.com/docs/5.3/components/)

### 🔮 Next Horizon Actions

_What must be done next to build on this session's progress?_

1. Define the final distribution we want for our web
2. Start investigating about map apis.

## Session [X] Log Entry

_Duplicate this section for each active coding session, class lab sprint, or out-of-class development block._

### ⏱️ Session Overview

- **Date:** [YYYY-MM-DD]
- **Module/Feature Scope:** [e.g., Express.js Server Setup / CSS Box Model Layout / React State Integration]
- **Est. Time Invested:** [e.g., 2.5 hours]
- **Active Developers:** [List names of team members who coded in this session]

### 🎯 Session Goals

_Identify what you planned to accomplish before starting to write code._

- [ ] Goal 1: [e.g., Set up Express backend server boilerplate on port 5000]
- [ ] Goal 2: [e.g., Configure CORS and body-parser middleware]
- [ ] Goal 3: [e.g., Test active server connection with a GET /api/health endpoint]

### 🔨 Tasks Completed

_Describe what you actually worked on during this session._

- [x] **Boilerplate server setup:** Created `/server/server.js` and initialized npm workspace directory.
- [x] **Configured API foundations:** Integrated Express, implemented standard server listening on fallback environment port `3000`.
- [x] **Configured CORS:** Restocked server header settings to permit incoming fetch requests from our static frontend origin.

### 🧠 Concepts Mastered & Key Learnings

_What technical concepts did you learn or consolidate during this session? Explain the underlying mechanics in 2-3 sentences._

- **Underlying Mechanics:** We learned how Express middleware works as a sequential pipeline. When a request hits the server, it passes through `express.json()` to parse raw incoming payloads, then `cors()` to intercept and validate headers, before finally routing to our custom endpoint handlers. This prevents manual buffer parsing.

### 🛠️ Systematic Bug & Error Tracker

_Record technical roadblocks faced and how they were systematically resolved. Treat these as study guides for your Oral Defense!_

- **Roadblock 1 (The Error):**
  - ❌ _Error Message / Behavior:_ `Error: Listen EADDRINUSE: address already in use :::3000` when executing `node server.js`.
  - ⚙️ _Diagnostic Action:_ Ran `lsof -i :3000` in the terminal to identify what background service was hijacking our target port.
  - ✅ _Root Cause & Resolution:_ A previously crashed node process was left hanging on port 3000. Resolved by executing `kill -9 <PID>` to free up the port, and modified our server configuration to use a fallback port pattern: `const PORT = process.env.PORT || 5000;`.

- **Roadblock 2 (The Error):**
  - ❌ _Error Message / Behavior:_ `Access to fetch at 'http://localhost:5000/api/health' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy.`
  - ⚙️ _Diagnostic Action:_ Examined incoming network request headers in Chrome DevTools Network Tab. Found `Access-Control-Allow-Origin` was missing from response headers.
  - ✅ _Root Cause & Resolution:_ The backend was receiving requests but rejecting the browser's request origins. Resolved by installing the CORS package (`npm i cors`) and mounting it early in our middleware chain: `app.use(cors({ origin: 'http://127.0.0.1:5500' }))`.

### 📚 Documentation & Reference Links

_List any documentation, textbooks, or tutorials utilized during development._

- MDN Web Docs - [Express/Node Introduction](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)
- Express.js Official Guide - [Using Middleware](https://expressjs.com/en/guide/using-middleware.html)

### 🔮 Next Horizon Actions

_What must be done next to build on this session's progress?_

1. Define a persistent database connection script using Mongoose to connect to MongoDB Atlas.
2. Design the `/api/users` user model schema to validate email inputs and passwords.
