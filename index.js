import { makeOptions, renderTemplate, setActive, showPage } from "./utils.js"
import { setupLoginHandlers, logout, updateLoginDependentComponents } from "./js-for-pages/page-login.js"
import { mapAndDraw } from "./js-for-pages/page-search-result.js"
import { signupHandlers } from "./js-for-pages/page-sign-up.js";
import { displayUserProfile, setupAutoComplete } from "./js-for-pages/page-user-profile.js";
import {SERVER_URL} from "../settings.js";

function renderMenuItems(evt) {
  const element = evt.target
  setActive(element)
  const id = element.id
  renderTemplate(id)  // update content DOM node with new content
  switch (id) {
    // Execute JS for the chosen page

    case "page-search-result": { //TODO: use SERVER_URL instead
        fetch(`${SERVER_URL}hobby-infos/search-by-hobby/${document.getElementById("hobby-query").value}`, makeOptions("get"))
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
        setupAutoComplete()
        displayUserProfile()
        break
    }
  }
}

document.getElementById("menu").onclick = renderMenuItems // handle click events on menu-items
document.getElementById("page-search-result").onclick = renderMenuItems
showPage("page-home") // Set the default page to render
updateLoginDependentComponents()