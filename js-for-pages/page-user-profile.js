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
    profileContainer.innerHTML="some nice kisses to special person!"
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
    let addressContainer = document.getElementById("user-address-container")
    let addressDetailsHTML =
        `<ul>
            <li>My Address Here</li>
        </ul>`
    addressContainer.innerHTML=addressDetailsHTML
}

export function setupAutoComplete() {
    dawaAutocomplete.dawaAutocomplete(document.getElementById('dawa-autocomplete-input'), {
        select: function (selected) {
            document.getElementById('selected-address').innerHTML = selected.tekst;
        }
    });
}


