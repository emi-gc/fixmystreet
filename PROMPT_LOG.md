**Project Name:** [Insert Project Name]  
**Team Members:** [Member 1, Member 2, Member 3]  
**SDG Goal Target:** [Goal # and Title]
 
---
 
## Week [X] Log Entry
*Duplicate this section for each week. If no AI was used this week, state: "No Generative AI was used in Week X."*
 
### 1. High-Level Goal
*What feature, component, or bug were you trying to solve this week?*
* **Example:** Setting up a responsive navbar with Bootstrap that collapses on mobile viewports.
 
### 2. The Interaction Log
*Document the primary prompts you used to generate the base code.*
 
| AI Tool Used | Exact Initial Prompt | What the AI Generated (Summary/Snippet) |
| :--- | :--- | :--- |
| *e.g., ChatGPT-4o* | *"Create a responsive navigation bar using Bootstrap 5 that has links for Home, SDG Dashboard, and Team Profile. Center the links on mobile and right-align them on desktop."* | Generated full HTML structure with standard Bootstrap utility classes (`navbar-expand-lg`, `collapse navbar-collapse`, etc.). |
 
### 3. The Human Audit & Modifications
*What did the AI get wrong or omit? What manual changes did you make to integrate this code into your existing application structure? (Write 2-3 sentences explaining your adjustments).*
* **What we changed/added:** The AI-generated code used static mock hrefs. We modified the HTML to use dynamic Express routing paths (`/` and `/sdg-dashboard`). We also adjusted the CSS padding manually to align with our project's custom color palette, and updated the responsive toggle button's `data-bs-target` to match our custom navbar wrapper ID.
 
### 4. Integration & Learnings
*How does this code integrate with the rest of your system? What is the core mechanism you learned?*
* **Core Mechanics:** The navbar works by utilizing Bootstrap's responsive breakpoints. The `navbar-expand-lg` class keeps it expanded on desktop but triggers the collapsable menu via JS triggers on screen widths below 992px. We had to ensure the Bootstrap bundle JS script was correctly loaded in our base template.
 
### 5. Oral Defense Self-Check
- [ ] We can explain every single line of this code.
- [ ] We understand how the asynchronous operations/CSS classes used here affect other components.
- [ ] We know exactly which file and line numbers this code is located in our repository.