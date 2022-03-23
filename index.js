import { renderTemplate, setActive, showPage } from "./utils.js"


function renderMenuItems(evt) {
  const element = evt.target
  setActive(element)
  const id = element.id
  renderTemplate(id)  // update content DOM node with new content
  switch (id) {
    // Execute JS for the chosen page
    case "page-example": { 
      // Example
      break;
    }
    case "page-auto-complete": {
        break;
    }
  }
}


document.getElementById("menu").onclick = renderMenuItems; // handle click events on menu-items
showPage("page-home") // Set the default page to render
