import {makeOptions} from "../utils.js";
import {SERVER_URL} from "../settings.js";

export function signupHandlers() {
    document.getElementById("btn-sign-up").onclick = signUp
}

function signUp() {
    const person = {}
    console.log("Called signUp")
    person.username = document.getElementById("floatingUsername").value
    person.password = document.getElementById("floatingPassword").value
    person.email = document.getElementById("floatingEmail").value
    person.firstName = document.getElementById("floatingFname").value
    person.lastName = document.getElementById("floatingLname").value
    person.phoneNumber = document.getElementById("floatingTelephone").value

    const options = makeOptions("POST", person)

    fetch(SERVER_URL + "auth/register", options)
        .then(res => res.json())
        .then(newPerson => {
            document.getElementById("person-info-all").innerText =
                "New user created with username " + JSON.stringify(newPerson.username)
        })
        .catch(e => console.error(e))
}