import { makeOptions, renderTemplate, setActive, showPage } from "./utils.js"
import { setupLoginHandlers, logout, updateLoginDependentComponents } from "./js-for-pages/page-login.js"
import { mapAndDraw } from "./js-for-pages/page-search-result.js"
import {signupHandlers} from "./js-for-pages/page-sign-up.js";


function renderMenuItems(evt) {
  const element = evt.target
  setActive(element)
  const id = element.id
  renderTemplate(id)  // update content DOM node with new content
  switch (id) {
    // Execute JS for the chosen page

    case "page-auto-complete": {
        break;
    }
    case "page-search-result": { 
        fetch(`http://127.0.0.1:8080/api/hobby-infos/search-by-hobby/${document.getElementById("hobby-query").value}`, makeOptions("get"))
          .then(res=>res.json()).then(h=>{
            console.log(h)
            mapAndDraw(h)
          })
        break
    }
    case "page-login": {
      setupLoginHandlers()
      break
    }
    case "page-logout": {
      logout()
      break
    }
    case "page-sign-up": {
      console.log("page-sign-up")
      signupHandlers()
      break
    }
    case "page-user-profile": {
        
    }
  }
}

document.getElementById("menu").onclick = renderMenuItems // handle click events on menu-items
document.getElementById("page-search-result").onclick = renderMenuItems
showPage("page-home") // Set the default page to render
updateLoginDependentComponents()
