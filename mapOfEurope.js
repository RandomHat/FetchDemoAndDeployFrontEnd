document.getElementById("svg2").onclick = getCountry;

var previouslySelected

function getCountry(e){
    if(!(undefined === previouslySelected)){
        previouslySelected.style.fill ="#dcdcdc"
        clearInfoBox()
    }
    e.target.style.fill = "darkblue"
    fetchCountry(e.target.id)
    previouslySelected = e.target
}

function fetchCountry(id){
    fetch("https://countries.plaul.dk/api/countries/" + id)
    .then((res) => {
        if(!res.ok){
            return Promise.reject(res.json())
        }
        return res.json()
    })
    .then((data) => {   
        document.getElementById("id-flag-img").src = data.flag
        document.getElementById("id-country-name").innerText = `Name: ${data.name.common}`
        document.getElementById("id-member-status").innerText = `Is UN member: ${data.unMember}`
        document.getElementById("id-currencies").innerHTML = unpackCurrency(data.currencies)
        document.getElementById("id-capital").innerText = `Capital: ${data.capital[0]}`
        document.getElementById("id-borders").innerText = `Borders: ${data.borders.join(", ")}`
        document.getElementById("id-wrapper").style.borderColor = "lightblue"
    })
    .catch(err => {
        err.then(data =>{
            document.getElementById("id-error").innerText = `Something went wrong: ${data.msg}, ${data.code}`
            document.getElementById("id-wrapper").style.borderColor = "red"
        })
    })
}

function unpackCurrency(currency){
    let currencyEntries = Object.keys(currency)
    let result = "Currencies: "
    currencyEntries.forEach(id => {
        result+=`${encode(id)}, ${encode(currency[id].name)} - ${encode(currency[id].symbol)} <br>`
    })
    return result
}

function clearInfoBox(){
    document.getElementById("id-flag-img").src = ""
    document.getElementById("id-country-name").innerText = ""
    document.getElementById("id-member-status").innerText = ""
    document.getElementById("id-currencies").innerHTML = ""
    document.getElementById("id-capital").innerText = ""
    document.getElementById("id-borders").innerText = ""
    document.getElementById("id-error").innerText = ""
    document.getElementById("id-wrapper").class = ""
}

export function encode(str) {
    let encoded = "" + str
    encoded = encoded.replace(/&/g, "&amp;");
    encoded = encoded.replace(/>/g, "&gt;");
    encoded = encoded.replace(/</g, "&lt;");
    encoded = encoded.replace(/"/g, "&quot;");
    encoded = encoded.replace(/'/g, "&#039;");
    return encoded;
  }