//Vælg adresse
// TODO: Remove because not used anywhere?
function addAddress() {
    console.log("Called addAddress")
    const address = {}
    address.street =  document.getElementById("input-street").value()
    address.additionalInfo = document.getElementById("input-additional-info").value()
    address.zipCode = document.getElementById("input-zip-code").value()
    address.city = document.getElementById("input-city").value()
}