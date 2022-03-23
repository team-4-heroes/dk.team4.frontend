export const mapAndDraw = h=>drawTable(h.map(h=>h.person)) // Extract persons from hobbyinfos and draw table

const drawTable = persons=>{
    console.log("in drawtable"+persons)
    let markup = ""
    persons.forEach(p=>{
        markup += `<tr><td>${p.firstName}</td><td>${p.lastName}</td><td>${p.email}</td><td>${p.phoneNumber}</td></tr>`
    })
    document.getElementById("tbody").innerHTML = markup
}