import {makeOptions} from "../utils";
import {SERVER_URL} from "../settings";

export function addPersonHandlers() {
    document.getElementById("opret").onclick(addPerson())
}

const person = {}

function addPerson() {
    console.log("Called addPerson")
    person.email = document.getElementById("input-email").value()
    person.firstName = document.getElementById("input-firstname").value()
    person.lastName = document.getElementById("input-lastname").value()
    person.phoneNumber = document.getElementById("input-telephone").value()

    const options = makeOptions("POST", person)

    fetch(SERVER_URL+"/persons", options)
    .then(res=>res.json())
    .then(newPerson => {
        document.getElementById("person-info-all").innerText = JSON.stringify(newPerson)
    })
    .catch(e=>console.error(e))
}

//Vælg adresse
function addAddress() {
    console.log("Called addAddress")
    const address = {}
    address.street =  document.getElementById("input-street").value()
    address.additionalInfo = document.getElementById("input-additional-info").value()
    address.zipCode = document.getElementById("input-zip-code").value()
    address.city = document.getElementById("input-city").value()
}

//Vælg 1+ hobbies
function addHobbies() {
    console.log("Called addHobbies")
    const hobbyInfo = {}
    hobbyInfo.person = person
    hobbyInfo.hobby = document.getElementById("input-hobby").value()

    fetch(SERVER_URL + "/persons/" + 3)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const rows = data.map(hobbyInfo => `
    <tr>
      <td>${hobbyInfo.hobby.name} </td>
    </tr>
    `).join("\n")
    document.getElementById("hobby-table").innerHTML = rows;
        })
        .catch(err => console.error(err))
        .finally(e => console.log("Finally Done"))
    //Hent endpoint der tilhører personen (fetch på SERVER_URL + "persons/{person.id}")
    //Hent herfra personens hobbies:
    //for (person.hobbyinfo -> <td>person.hobbyinfo.hobby.name<td>)


}
