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

let countryName = document.createElement("h2");
let population = document.createElement("span");
let regin = document.createElement("span");
let capital = document.createElement("span");
let nativeNamec = document.createElement("span");
//-----------------------------------------------------
let data = getLocalStoreg();
imageFlage.setAttribute("src", data[0]);
let countryNameT = document.createTextNode(data[1]);
let populationT = document.createTextNode(data[2]);
let reginT = document.createTextNode(data[3]);
let capitalT = document.createTextNode(data[4]);

countryflage.append(imageFlage);
countryName.append(countryNameT);

countryInfo.append(countryName);
//population
population.append(populationT);
countryInfo.append(population);
//regin
regin.append(reginT);
countryInfo.append(regin);
//capital
capital.append(capitalT);
countryInfo.append(capital);
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
    dataextra(data);
  });
function dataextra(exraInfo) {
  //nativename
  let xNative = document.createElement("span");
  let xname = document.createTextNode(
    `Native Name : ${exraInfo[0].nativeName}`
  );
  xNative.append(xname);
  countryInfo.append(xNative);
  //subRegin
  let xRegin = document.createElement("span");
  let xsub = document.createTextNode(`Sub Regin : ${exraInfo[0].subregion}`);
  xRegin.append(xsub);
  countryInfo.append(xRegin);
  //TopLevelDomain
  let topLevelDomain = document.createElement("span");
  let domain = document.createTextNode(
    `Top Level Domain : ${exraInfo[0].topLevelDomain}`
  );
  topLevelDomain.append(domain);
  countryInfo.append(topLevelDomain);
  //currencies
  let current = document.createElement("span");
  let cur = document.createTextNode(
    `currencies : ${exraInfo[0].currencies[0].name}`
  );
  current.append(cur);
  countryInfo.append(current);
  //languages
  let language = document.createElement("span");
  let languT = exraInfo[0].languages;
  console.log(languT);

  for (let i = 0; i < languT.length; i++) {
    let lang = document.createTextNode(`languages : ${languT[i].name}`);

    
    language.append(lang);
    countryInfo.append(language);
  }
  //borders
  for (let i = 0; i < languT.length; i++) {
    let border = exraInfo[0].borders[i];
  
    let borderCountries = fetch(country + "/v2/name/" + border);
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
        border1.className="borderStyle";
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
// moon.addEventListener("click", () => {
//   let element = document.body;
//   element.classList.toggle("dark-mode");
// });