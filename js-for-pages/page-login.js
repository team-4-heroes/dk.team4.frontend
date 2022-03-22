import { showPage, makeOptions } from "../utils.js"

export function setupLoginHandlers() {
  document.getElementById("btn-login").onclick = login
}

function login() {
  // Athenticate user with credential from login form
  let user = {username: document.getElementById("username").value, password: document.getElementById("password").value}
  fetch("http://localhost:8080/api/auth/login", makeOptions("POST", user)).then(resp=>resp.json())
  .then(resp=>{
    setLoginState(resp.token, resp.roles)
    showPage("page-home") // redirect to page-home
  })
}

export function logout() {
  setLoginState(null)
}

export function setLoginState(token, loggedInAs) {
  if (token) {
    sessionStorage.setItem("token", token)
    if (loggedInAs) {
      sessionStorage.setItem("logged-in-as", loggedInAs)
    }
  } else {
    sessionStorage.clear("token")
    sessionStorage.clear("logged-in-as")
  }
  updateLoginDependentComponents()
}

export function updateLoginDependentComponents() {
  const loggedIn = sessionStorage.getItem("token")
  const loggedInAs = sessionStorage.getItem("logged-in-as")
  /*document.getElementById("logged-in-user").style.display = "none"
  document.getElementById("logged-in-admin").style.display = "none"
  document.getElementById("not-logged-in").style.display = "block"
  document.getElementById("user-role").innerText = "" */
  if (loggedInAs === "ADMIN") {
    // document.getElementById("logged-in-admin").style.display = loggedIn ? "block" : "none"
  }
  if (loggedInAs === "USER") {
    // document.getElementById("logged-in-user").style.display = loggedIn ? "block" : "none"
  }
  if (loggedIn) {
    //document.getElementById("not-logged-in").style.display = "none"
    //document.getElementById("user-role").innerText = "Logged in as: " + loggedInAs
  }
  document.getElementById("page-login").style.display = loggedIn ? "none" : "block"
  document.getElementById("page-logout").style.display = loggedIn ? "block" : "none"
}