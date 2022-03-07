// https://jsonplaceholder.typicode.com/users

document.getElementById("btn-get").onclick = getUser;
document.getElementById("btn-get-all").onclick = getAllUsers;

function getUser(){
    const id = document.getElementById("input-id").value

    fetch("https://jsonplaceholder.typicode.com/users/" + id)
    .then(res => {
    if(!res.ok){
        return Promise.reject("Error : " + res.status)
    }
    return res.json() 
    })
    .then(data => {
        document.getElementById("id-name").innerText = data.name
        document.getElementById("id-phone").innerText = data.phone
        document.getElementById("id-street").innerText = data.address.street
        document.getElementById("id-city").innerText = data.address.city
    })
    .catch(err => alert("UPS something went wrong! \n" + err))
    .finally(e => console.log("Done fetching Get request"))
}

function getAllUsers(){
    const body = document.getElementById("tbl-body")
    fetch("https://jsonplaceholder.typicode.com/users/")
    .then(res => res.json())
    .then(data => {
        document.getElementById("tbl-body").innerHTML = data.map(u => `
        <tr>
            <td>${encode(u.name)}</td>
            <td>${encode(u.phone)}</td>
            <td>${encode(u.address.street)}</td>
            <td>${encode(u.address.city)}</td>
        </tr>
        `).join("") 
    })

}

/**
 * The encoder method we have used when inserting untrusted data via the innerHTML property
 * Ref: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
 * @param {str} str
 * @returns the encode string
 */
 export function encode(str) {
    let encoded = "" + str
    encoded = encoded.replace(/&/g, "&amp;");
    encoded = encoded.replace(/>/g, "&gt;");
    encoded = encoded.replace(/</g, "&lt;");
    encoded = encoded.replace(/"/g, "&quot;");
    encoded = encoded.replace(/'/g, "&#039;");
    return encoded;
  }
  


// FETCH POST REQUEST
/*
const option = {
    contentType : ""
}
fetch("https://jsonplaceholder.typicode.com/users", 
{ 
    method : "POST",
    headers :{
         "Content-type" : "application/json",
         "Accept" : "application/json"
    },
    body : JSON.stringify(
        {
        //name : "Eric"
        }
    )
}).then(res => {
    console.log(res.status)
    return res.json() 
})  
.then(data => console.log(data))
.catch(err => console.error("UPS :" + err))
.finally("Done")
//*/

/*
// FETCH GET REQUEST
fetch("https://jsonplaceholder.typicode.com/users/1")
.then(res => {
    if(!res.ok){
        return Promise.reject("Error : " + res.status)
    }
    return res.json() 
}).then(data => console.log(data))
.catch(err => console.error("UPS: " + err))
.finally(e => console.log("Finalle Done"))

conesole.log("Who comes first")
//*/