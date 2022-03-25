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
    let profileContainer = document.getElementById("user-profile-container")
    let userDetailsHTML =
        `<ul>
        <li>User id: ${user.id}</li>
        <li>Username: ${user.username}</li>
        <li>First name: ${user.firstName}</li>
        <li>Last name: ${user.lastName}</li>
        <li>Email: ${user.email}</li>
        <li>Phone number: ${user.phoneNumber}</li>
    </ul>`
    profileContainer.innerHTML=userDetailsHTML
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


