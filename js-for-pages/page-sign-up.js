import {makeOptions} from "../utils";
import {SERVER_URL} from "../settings";

export function addPersonHandlers() {
    document.getElementById("btn-sign-up").onclick(signUp())
}

const person = {}

function signUp() {
    console.log("Called signUp")
    //Select username
    person.username = document.getElementById("floatingUsername").value()
    //Select password
    person.password = document.getElementById("floatingPassword").value()
    //Get additional info
    person.email = document.getElementById("input-email").value()
    person.firstName = document.getElementById("input-firstname").value()
    person.lastName = document.getElementById("input-lastname").value()
    person.phoneNumber = document.getElementById("input-telephone").value()

    const options = makeOptions("POST", person)

    fetch(SERVER_URL+"persons", options)
    .then(res=>res.json())
    .then(newPerson => {
        document.getElementById("person-info-all").innerText = JSON.stringify(newPerson)
    })
    .catch(e=>console.error(e))