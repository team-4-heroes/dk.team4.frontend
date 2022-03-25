//Vælg 1+ hobbies
import {SERVER_URL} from "../settings";

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