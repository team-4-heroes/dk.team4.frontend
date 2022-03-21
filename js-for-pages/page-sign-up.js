import {makeOptions} from "../utils";

export function addPersonHandlers() {
    document.getElementById(btn-person-add).onclick(addPerson())
}

function addPerson() {
    console.log("Called addPerson")
    const person = {}
    person.email = document.getElementById("input-email").value()
    person.firstName = document.getElementById("input-firstname").value()
    person.lastName = document.getElementById("input-lastname").value()
    person.phoneNumber = document.getElementById("input-phone-number").value()

    const options = makeOptions("POST", person)

    fetch(SERVER_URL+"/persons", options)
        .then(res=>res.json())
        .then(newPerson => {
            document.getElementById("person-info-all").innerText = JSON.stringify(newPerson)
        })
        .catch(e=>console.error(e))
}
