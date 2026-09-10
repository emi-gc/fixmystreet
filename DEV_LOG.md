# Team Developer Log

**Project Name:** [FixMyStreet]  
**Team Members:** [Ian Uribe Maldonado, Jose Emiliano Gomez Cortes, Santiago de la Torre Zamudio]  
**Active Repository Path:** [(https://github.com/emi-gc/fixmystreet.git)]

---

## Session [1] Log Entry

_Duplicate this section for each active coding session, class lab sprint, or out-of-class development block._

### ⏱️ Session Overview

- **Date:** [2026-09-06]
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

## Session [2] Log Entry

_Duplicate this section for each active coding session, class lab sprint, or out-of-class development block._

### ⏱️ Session Overview

- **Date:** [2026-09-09]
- **Module/Feature Scope:** [Design and "beautifying"]
- **Est. Time Invested:** [5 hours]
- **Active Developers:** [Ian Uribe Maldonado & Jose Emiliano Gomez Cortes]

- # **USED LIVE SHARE EXTENSION FOR THIS SESSION**


### 🎯 Session Goals

_Identify what you planned to accomplish before starting to write code._

- [X ] Goal 1: [Change the color scheme and design of the page, implement good looking CSS]
- [X ] Goal 2: [Fix design inconsistencies, typos, and unoptimized code ]

### 🔨 Tasks Completed

_Describe what you actually worked on during this session._

- [x] **visual overhaul** Changed fonts, color schemes, distributions and animations for the website
- [x] **CSS styles:** restyled and made one CSS file so it follows the same color palette and style in every page

### 🧠 Concepts Mastered & Key Learnings

_What technical concepts did you learn or consolidate during this session? Explain the underlying mechanics in 2-3 sentences._

- **CSS and Bootstrap** We understood how CSS and bootstrap handle certain design choices, such as colors and fonts, as well as how to add things exactly where we want them, what we want them to look like and how they behave.
- **General Design** Understood generally what makes a website look good, what is user friendly and how to make it look professional and clean.

### 🛠️ Systematic Bug & Error Tracker

_Record technical roadblocks faced and how they were systematically resolved. Treat these as study guides for your Oral Defense!_

- **Roadblock 1 (The Error):**
  - ❌ Background image in mainPage.html was not loading.
  - ⚙️ _Diagnostic Action:_ Checked the CSS was correct, tried changing background color and adding other images.
  - ✅ _Root Cause & Resolution:_ The Live Share extension we used to code at the same time, when Emiliano tried to add images to Ian's Computer (host), they all got corrupted. We saw this when we tried to download them back from the folder and they didn't show, so any image Emiliano wanted to add was just sent to Ian so he could directly add them to the folder.

### 📚 Documentation & Reference Links

_List any documentation, textbooks, or tutorials utilized during development._

- Bootstrap documentation - [Bootstrap](https://getbootstrap.com/docs/5.3/layout/grid/)
- CSS tutorial by Bro Code - [CSS] (https://www.youtube.com/watch?v=wRNinF7YQqQ)

### 🔮 Next Horizon Actions

_What must be done next to build on this session's progress?_

1. Fix the scaling in the navbar for phones and tablets
2. Start and finish the about page and polish the map page visually.


## Session [3] Log Entry

_Duplicate this section for each active coding session, class lab sprint, or out-of-class development block._

### ⏱️ Session Overview

- **Date:** [2026-09-09]
- **Module/Feature Scope:** [Error fixing and about page]
- **Est. Time Invested:** [2 hours]
- **Active Developers:** [Jose Emiliano Gomez Cortes]

### 🎯 Session Goals

_Identify what you planned to accomplish before starting to write code._

- [X ] Goal 1: [Make an about page with the site's goal and team members, make it have the images of everyone, make it look good]
- [X ] Goal 2: [Fix the navbar scaling on phones and tablets]

### 🔨 Tasks Completed

_Describe what you actually worked on during this session._

- [x] **About page** Made it from scratch based on the existing pages, added a short description, our company's focus and a brief description of the team.
- [x] **Scaling Fix** Using bootstrap's JS and CSS, I added a sandwich bar when going to phone or tablet scaling for Home, Map and About, and fixed the logo staying on the navbar when going to those formats as well.

### 🧠 Concepts Mastered & Key Learnings

_What technical concepts did you learn or consolidate during this session? Explain the underlying mechanics in 2-3 sentences._

- **CSS and Bootstrap** Understood further how elements work with each other and how scaling for different devices work
- **General Design** Understood generally what makes a website look good, what is user friendly and how to make it look professional and clean.

### 🛠️ Systematic Bug & Error Tracker

_Record technical roadblocks faced and how they were systematically resolved. Treat these as study guides for your Oral Defense!_

- **Roadblock 1 (The Error):**
  - ❌ _Error Message / Behavior:_ The navbar did not grow to fit the navigation links when opening the hamburger menu on smaller screens.
  - ⚙️ _Diagnostic Action:_ Checked the navbar's CSS height rule and how it affected the expanded menu.
  - ✅ _Root Cause & Resolution:_ A fixed height prevented the navbar from growing with its content. Using min-height: 72px instead keeps its normal height while allowing it to expand when the hamburger menu opens.

### 📚 Documentation & Reference Links

_List any documentation, textbooks, or tutorials utilized during development._

- Bootstrap documentation - [Bootstrap](https://getbootstrap.com/docs/5.3/layout/grid/)
- Bootstrap exercise in class, portfolio 03.

### 🔮 Next Horizon Actions

_What must be done next to build on this session's progress?_

1. Fix the Map page design and layout.
2. Refine HTML and style for the entire webpage


## Session [4] Log Entry

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
