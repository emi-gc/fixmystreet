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

## Session [3] Log Entry

_Duplicate this section for each active coding session, class lab sprint, or out-of-class development block._

### ⏱️ Session Overview

- **Date:** [2026-09-09]
- **Module/Feature Scope:** [CSS styles / html about page / refining all html and one uniform style]
- **Est. Time Invested:** [3 hours]
- **Active Developers:** [Ian Uribe Maldonado]

### 🎯 Session Goals

_Identify what you planned to accomplish before starting to write code._

- [ ] Goal 1: [ add a getting started section and a map preview onto the main page]
- [ ] Goal 2: [ reformat the map page with the buttons ]
- [ ] Goal 3: [ give a uniform style to the whole web]

### 🔨 Tasks Completed

_Describe what you actually worked on during this session._

- [x] **getting started and map preview:** created the map preview section and the getting started section with general description on the main page.
- [x] **redo of map page:** changed the distribution of the buttons and map as well as making them addapt to the window size.
- [x] **CSS styles:** restyled the map page so it follows the same color palette and style as the main page.

### 🧠 Concepts Mastered & Key Learnings

_What technical concepts did you learn or consolidate during this session? Explain the underlying mechanics in 2-3 sentences._

- **DOM tree understanding:** I got a better understanding on how does the css manages to get a hold of different components based on certain notacion like the . or the # or separating elements with a space to get the inmediate child of the component.
- **Managing the elements and alignment** Understood how to change the sizing and alignment of elements so that when the window's size changes, all the elements are still displayed neatly

### 🛠️ Systematic Bug & Error Tracker

_Record technical roadblocks faced and how they were systematically resolved. Treat these as study guides for your Oral Defense!_

- **Roadblock 1 (The Error):**
  - ❌ _Error Message / Behavior:_ Map not shrinking in size when making the window smaller.
  - ⚙️ _Diagnostic Action:_ Checked which attributes where giving the map its size.
  - ✅ _Root Cause & Resolution:_ The attribute width and height was set on % with no max-width declared so it grew indefinitely.

### 📚 Documentation & Reference Links

_List any documentation, textbooks, or tutorials utilized during development._

- Bootstrap documentation - [Bootstrap](https://getbootstrap.com/docs/5.3/layout/grid/)

### 🔮 Next Horizon Actions

_What must be done next to build on this session's progress?_

1. Learn how to make pop up windows to submit the reports when clickin on the buttons.
2. Development of the js to manage the action listeners and forms interactions with the user.
