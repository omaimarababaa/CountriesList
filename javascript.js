//-----------Select Element--------------
let mainSection = document.querySelector("main");
let reginFilter = document.querySelector("#reginFilter");
let moon = document.querySelector(".moon");
let searchSection=document.querySelector(".searchSection");

//-----------Get URL-------------------------------------
let country = "https://restcountries.com";
let infoCountryURL = fetch(country + "/v2/all");
//----------------------------------
infoCountryURL
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((data) => {
    getInfoCountries(data);
  })
  .catch((data) => {
    alert("Error" + Error);
  });

function getInfoCountries(countriesData) {
  for (let c = 0; c < countriesData.length; c++) {
    let countryInfo = document.createElement("div");
    let linkCountryInfo = document.createElement("a");
    //---------ImageFlage---------------------------
    let imageFlage = document.createElement("img");
    let imgSrc = countriesData[c].flags.svg;
    imageFlage.setAttribute("src", imgSrc);
    imageFlage.setAttribute("width", "250px");
    imageFlage.setAttribute("height", "166px");
    countryInfo.append(imageFlage);

    //--------CountryName-------------------
    let countryName = document.createElement("span");
    let textName = document.createTextNode(countriesData[c].name);
    countryName.appendChild(textName);
    countryInfo.append(countryName);

    //-------population-------------------------------------

    let population = document.createElement("span");
    let textPop = document.createTextNode(
      `Population : ${countriesData[c].population}`
    );
    population.appendChild(textPop);
    countryInfo.append(population);

    //-----------Regin---------------------------
    let regin = document.createElement("span");
    let textRegin = document.createTextNode(
      `Regin : ${countriesData[c].region}`
    );
    regin.appendChild(textRegin);
    countryInfo.append(regin);
    //-----------Capital---------------------------
    let capital = document.createElement("span");
    let textCapital = document.createTextNode(
      `Capital : ${countriesData[c].capital}`
    );
    capital.appendChild(textCapital);
    countryInfo.append(capital);
    //--------------------------------------------------

    mainSection.className = "countryInfo";
    linkCountryInfo.append(countryInfo);
    mainSection.append(linkCountryInfo);
    let arrayInfo = [
      imgSrc,
      textName.textContent,
      textPop.textContent,
      textRegin.textContent,
      textCapital.textContent,
    ];
    //----------Send data to two page---------------------------------------------------------
    linkCountryInfo.addEventListener("click", () => {
      setlocalstorage(arrayInfo);
    });
  }
   
}

function display(reginSelect) {
  if (reginSelect == regin.textContent) {
    console.log(regin);
  }
}
function setlocalstorage(data) {
  window.localStorage.setItem("Country", JSON.stringify(data));
  window.open("http://127.0.0.1:5500/details.html", "_self");
}
moon.addEventListener("click", () => {
  let element = document.body;
  element.classList.toggle("dark-mode");
});



