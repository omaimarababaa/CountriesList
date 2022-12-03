//-----------Select Element--------------
let mainSection = document.querySelector("main");
let reginFilter = document.querySelector("#reginFilter");
let moon = document.querySelector(".moon");
let searchSection = document.querySelector(".searchSection");
let searchCountry = document.querySelector(".search");

//---------Dark & Light------------
moon.addEventListener("click", () => {
  let element = document.body;
  element.classList.toggle("dark-mode");
});

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
    imageFlage.setAttribute("width", "248px");
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
//---------------------------------------
function setlocalstorage(data) {
  window.localStorage.setItem("Country", JSON.stringify(data));
  window.open("../details.html", "_self");
}



//-------Search From Country---------------------
searchCountry.addEventListener("input", (e) => {
  e.preventDefault();
  let oldTbody = document.querySelector("main");
  while (oldTbody.firstChild) {
    oldTbody.removeChild(oldTbody.firstChild);
  }
  if (searchCountry.value == "") {
    linkcount = "https://restcountries.com/v2/all";
  } else {
    linkcount = fetch(
      "https://restcountries.com/v2/name/" + searchCountry.value);
  }
 
  let countryFilterS =linkcount;
   
  //----------------------------------
  countryFilterS.then((res)=>{
    if(res.ok){
      return res.json();
    }
  })
    .then((data) => {
      getInfoCountries(data);
      console.log(data);
    })

});
//------Select Regin----------
reginFilter.addEventListener("change", () => {
  let oldTbody = document.querySelector("main");
  while (oldTbody.firstChild) {
    oldTbody.removeChild(oldTbody.firstChild);
  }
  let linkRegin;
  if (reginFilter.value == "filter") {
    linkRegin = "https://restcountries.com/v2/all";
  } else {
    linkRegin = fetch(
      "https://restcountries.com/v3.1/region/" + reginFilter.value
    );
  }
  let reginFilterS = linkRegin;
  //----------------------------------
  reginFilterS
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      getReginCountries(data);
      //console.log(data);
    })
});
//--------------------------------------------
function getReginCountries(countriesData) {
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
    let textName = document.createTextNode(countriesData[c].name.common);
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