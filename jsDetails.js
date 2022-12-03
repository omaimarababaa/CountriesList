let moon = document.querySelector(".moon");
let back = document.querySelector("a");
let countryflage = document.querySelector(".countryFlage");
let countryInfo = document.querySelector(".countryInfo2");
let Border = document.querySelector(".Border");
let imageFlage = document.querySelector(".flagImge");
//-----------Get URL-------------------------------------
let country = "https://restcountries.com";
//----------------------------
function getLocalStoreg() {
  let data = window.localStorage.getItem("Country");
  let info = JSON.parse(data);
  return info;
}

let countryName = document.querySelector(".NameC");
let population = document.querySelector("#Population");
let regin = document.querySelector("#Regin");
let SubRegin = document.querySelector("#SubRegin");
let capital = document.querySelector("#Capital");
let nativeNamec = document.querySelector("#NativeName");
let topLevelDomain = document.querySelector("#TopLevelDomain");
let currencies = document.querySelector("#currencies");
let Language = document.querySelector("#Language");
//-----------------------------------------------------
let dataOld = getLocalStoreg();
imageFlage.setAttribute("src", dataOld[0]);
countryName.textContent = dataOld[1];
population.textContent = dataOld[2];
regin.textContent = dataOld[3];
capital.textContent = dataOld[4];

//------get More data-------------------
let namecoy = countryName.textContent;
let infoCountryURL = fetch(country + "/v2/name/" + namecoy);
infoCountryURL
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((data) => {
    //console.log(data);
    dataextra(data);
  });

function dataextra(exraInfo) {
  //nativename
  nativeNamec.textContent += ` ${exraInfo[0].nativeName}`;
  //subRegin
  SubRegin.textContent += ` ${exraInfo[0].subregion}`;
  //TopLevelDomain
  topLevelDomain.textContent += `${exraInfo[0].topLevelDomain}`;
  //currencies
  currencies.textContent += `${exraInfo[0].currencies[0].name}`;
  //languages
  let languT = `${exraInfo[0].languages}`;
  for (let i = 0; i < languT.length; i++) {
    Language.textContent += `${exraInfo[0].languages[i].name} ,`;
  }
  //borders
  let border=[];
 border =exraInfo[0].borders;
  for (let i = 0; i < border.length; i++) {
    let borderN=border[i];
    let borderCountries =fetch(country+"/v2/name/"+ borderN);
    borderCountries
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        let border1 = document.createElement("span");
        let bor = document.createTextNode(data[0].name);
        border1.className = "borderStyle";
        border1.append(bor);
        Border.append(border1);
      });
    }
  }


//---------Back to one page--------------
back.addEventListener("click", () => {
  window.localStorage.removeItem("Country");
  // window.open("http://127.0.0.1:5500/index.html", "_self");
});
//---------
moon.addEventListener("click", () => {
  let element = document.body;
  element.classList.toggle("dark-mode");
});
