**Project Name:** [FixMyStreet]  
**Team Members:** [Ian Uribe Maldonado, Jose Emiliano Gomez Cortes, Santiago de la Torre Zamudio]  
**SDG Goal Target:** [Goal #11 Sustainable cities and communities]

---

## Week [1] Log Entry

_Duplicate this section for each week. If no AI was used this week, state: "No Generative AI was used in Week X."_

### 1. High-Level Goal

_What feature, component, or bug were you trying to solve this week?_

- **Arrangement of main page components:** Arranging two different heroes and cards in the main page as well as ideal.
- **Map page redesign:** Improve the map page UI/UX, fix HTML bugs, remove unnecessary complexity, and apply right panel layout (map on left, issue buttons on right) as the main design.

### 2. The Interaction Log

_Document the primary prompts you used to generate the base code._

### 2. The Interaction Log

*Document the primary prompts you used to generate the base code.*

| AI Tool Used       | Exact Initial Prompt                                                                                                                                                                                                                                                                                                                                                                                                                                    | What the AI Generated (Summary/Snippet) |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------- |
| ChatGPT-4o | "how would you do a web main page where you have the website title on top followed by a hero with a photo spanning the whole width of the page like the banner of a youtube channel with some text on top of the hero and a get started button at the bottom of that page. this would be for the project i have talked you about the interactive map on reporting issues on a city so also help me decide on a color palette that fits on that theme" | Generated the main page layout with hero sections, a color palette (dark blue #1a4161 + gold #E9C46A), and Bootstrap components for the layout.                                                 |
| Devin AI         | "create a right panel layout for the map page with map on left and issue buttons on right"                                                                                                                                                                                                                                                                                                                                                            | Generated `index.html` using Bootstrap's grid system, with the map taking `col-lg-8` and the issue panel taking `col-lg-4`.                                                                     |
| Devin AI         | "remove transitions hover and focus effects and svg icons. remove border radius from boxes. simplify everything"                                                                                                                                                                                                                                                                                                                          | Removed transitions, hover states, focus states, and SVG icons. Simplified the buttons and set `border-radius: 0` globally.                                                                     |
| Devin AI         | "strip away most of the bootstrap and style, make it rly minimal. remove the magnifying glass in teh search bar and the stupid text under it and all the corners everywhere."                                                                                                                                                                                                                                                                              | Removed the search bar, animations, rounded corners, team photo styling, and unnecessary button styling to make the page more minimal.                                                          |
| ChatGPT-5.6 Luna | "Can you simplify the Bootstrap layout and remove the `col-lg-8`, `col-lg-4`, `row`, and `container-fluid` classes while keeping the same functionality?"                                                                                                                                                                                                                                                                                             | Replaced the Bootstrap grid layout with simple custom CSS using Flexbox. The map and issue panel use `flex: 2` and `flex: 1`, and a media query makes them stack vertically on smaller screens. |


### 3. The Human Audit & Modifications

_What did the AI get wrong or omit? What manual changes did you make to integrate this code into your existing application structure? (Write 2-3 sentences explaining your adjustments)._

- **What we changed/added:** The AI-generated code had elements which sizes were not ideal. We modified the css so that everything fitted how we wanted to. The code also had placeholder text for some titles and elements which we changed to text more fitting to the project. Added spacing that was missing between the two heroes with padding. For the map page, we removed search bars and icons. We manually fixed HTML bugs (unclosed img tag in original index.html, absolute image paths in about.html). We added CSS rules to mainStyle.css where AI loved to use bootstrap.

### 4. Integration & Learnings

_How does this code integrate with the rest of your system? What is the core mechanism you learned?_

- **Core Mechanics:** The two heroes sit one on top of another using sections and a 100% width linking the backgrond images through the css. The cards are distributed evenly through the bootstrap system of rows and columns
The map and issue panel are placed side by side using CSS Flexbox. The map takes up twice as much space as the issue panel using flex: 2 and flex: 1. On smaller screens, a media query changes the layout to a column so the sections stack vertically. The map image also uses width: 100% so it scales with the available space

### 5. Oral Defense Self-Check

- [ ] We can explain every single line of this code.
- [ ] We understand why each element looks how it does based on the css and the bootstrap classes.
- [ ] We know exactly which file and line numbers this code is located in our repository.
- [ ] We didnt copy the whole code generated by the ai. We made it our own
