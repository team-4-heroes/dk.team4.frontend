import {makeOptions} from "../utils.js";
import {SERVER_URL} from "../settings.js";

export function displayUserProfile() {
    let currentUser = sessionStorage.getItem("username")
    fetch(`${SERVER_URL}persons/details?username=${currentUser}`, makeOptions("GET"))
        .then(res=>res.json())
        .then(jsonParsed=> {
            console.log(jsonParsed)
            renderUserDetails(jsonParsed.person)
            let address = jsonParsed.address
            if(address === null) {
                inputAddress()
            } else {
                handleAddress(address)
            }
        })
}

function inputAddress() {
    document.getElementById("address-search-container").hidden = false
    document.getElementById("user-address-container").hidden = true
}

function renderUserDetails(user) {
    const readableLabels = {
        "id": "User Id",
        "username": "Username",
        "firstName" : "First name",
        "lastName" : "Last name",
        "email" : "Email address",
        "phoneNumber" : "Phone number"
    }
    let profileContainer = document.getElementById("user-profile-container")
    let userDetailsHTML = "";

    for (var key in user) {
        if (user.hasOwnProperty(key) && readableLabels.hasOwnProperty(key)) {
            userDetailsHTML += renderItem(user[key], readableLabels[key])
        }
    }
    profileContainer.innerHTML=userDetailsHTML
}

function renderItem(item, label) {
    return `<div class="input-group mb-3 ">
        <span id="labelFor${label}" class="input-group-text">${label}</span>
        <input type="text" readOnly class="form-control" id="${label}_id" value="${item}" aria-label="Address" aria-describedby="labelFor${label}">
    </div>`
}

function handleAddress(address) {
    document.getElementById("address-search-container").hidden = true
    let addressContainer = document.getElementById("user-address-container")
    addressContainer.hidden = false
    let addressDetailsHTML =
        `<ul>
            <li>Address: ${renderAddress(address)}</li>
        </ul>`
    addressContainer.innerHTML=addressDetailsHTML
}

function renderAddress(address) {
    // TODO: Account for null values (floor and door nr)
    return `${address.street} ${address.houseNumber}, ${address.floorNumber}${address.doorNumber}. ${address.zipCode}`
}

export function setupAutoComplete() {
    dawaAutocomplete.dawaAutocomplete(document.getElementById('dawa-autocomplete-input'), {
        select: sendAddressToServer
    });
}

function sendAddressToServer(dawaAddress) {
    console.log(dawaAddress)
    var username = sessionStorage.getItem("username")

    let address = {
        street: dawaAddress.data.vejnavn,
        houseNumber: dawaAddress.data.husnr,
        floorNumber: dawaAddress.data.etage,
        doorNumber: dawaAddress.data.dør,
        zipCode: dawaAddress.data.postnr,
        municipality: dawaAddress.data.postnrnavn
    }


    fetch(`${SERVER_URL}persons/${username}/address`, makeOptions("PUT", address))
        .then(res=> res.json())
        .then(address=> handleAddress(address))



}


