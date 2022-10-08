`use strict`;

const apiKey = `282bd2fa7998418991b135313220209`;

let root = null;
let city = null;
let input = null;
let icon = null;
let list = null;
let autoSearchArray = [];

// Budapest:
const lat = 47.4979; // forecast => location.lon:19.08
const lon = 19.0402; // forecast => location.lat: 47.5

const zoom = 8; //1= Earth view, 20 = Street view
// document.querySelector(".testClass").addEventListener("change", search)

init();

function init() {
  root = document.getElementById("root");
  root.insertAdjacentHTML("beforeend", addContainer() + addImageContainer());

  city = document.querySelector("h1");
  input = document.querySelector(".user-input");
  list = document.getElementById("cities");
  addToHtml(createSatelitPicture(lat, lon, zoom));

  listeners();
  search();
  slideUp();
}

function addImageContainer() {
  return `<div class="image-container"></div>`;
}

async function search() {
  input.addEventListener("input", async function (event) {
    let testTown = input.value;
    if (testTown.length >= 2) {
      let response = await fetch(
        `http://api.weatherapi.com/v1/search.json.json?key=${apiKey}&q=${testTown}`
      );
      let data = await response.json();
      autoSearchArray = [];
      let cityOptions = ``;
      console.log(data);
      data.forEach((e, i, arr) => {
        // autoSearchArray.push(e.name);
        cityOptions += `<option value="${e.name}">`;
      });
      list.innerHTML = cityOptions;
    }
    if (testTown.length <= 0) {
      resetCard();
    }
  });
}

function resetCard() {
  const card = document.querySelector(`.card`);
  card.classList.remove("card-active");
  city.textContent = "";
  const description = root.querySelector(".description");
  description.textContent = "";
  const celsius = root.querySelector("h2");
  celsius.textContent = "";
  const inner = document.querySelector(".igenyes-megoldas");
  inner.innerHTML = "";
}

function listeners() {
  input.addEventListener("change", function (event) {
    const value = event.target.value;
    console.log(`value`, value);
    city.textContent = value;

    if (value.length > 0) {
      fecthRequest(value);
    }
  });
}

function slideUp() {
  document
    .querySelector(".user-input")
    .addEventListener("keypress", function (e) {
      console.log(e.key);
      if (e.key === "Enter") {
        const card = document.querySelector(`.card`);
        card.classList.add("card-active");
      }
    });
}

async function fecthRequest(city) {
  try {
    urlForecast = `http://api.weatherapi.com/v1/forecast.json.json?key=${apiKey}&q=${city}`;
    await fetch(urlForecast)
      .then((response) => {
        console.log(response);
        if (!response.ok) throw new Error(`${city}`);
        return response.json();
      })
      .then((data) => {
        setCard(data);
      });
  } catch (error) {
    resetCard();
    alert(`Unrecognized: ${error.message}`);
  }
}

function setCard(data) {
  const { condition, temp_c, location } = data.current;
  const lat = data.location.lat;
  const lon = data.location.lon;
  addToHtml(createSatelitPicture(lat, lon, zoom));

  const text = condition.text;
  const description = root.querySelector(".description");
  description.textContent = text;

  const temp = temp_c;
  const celsius = root.querySelector("h2");
  celsius.textContent = temp + ` °C`;

  const icon = `https:${condition.icon}`;
  const iconElement = root.querySelector(".icon");

  const inner = document.querySelector(".igenyes-megoldas");
  inner.innerHTML = "";
  inner.insertAdjacentHTML("beforeend", addIcon(icon));
}

function addToHtml(markdown) {
  const imageContainer = document.querySelector(`.image-container`);
  imageContainer.innerHTML = ``;
  imageContainer.insertAdjacentHTML(`beforeend`, markdown);
}

function cityOption(city) {
  return `
  <option value='${city}'>'${city}'</option>
    `;
}

function addContainer() {
  return `    
    <div class="container">
      <div class="cover">
        <p class="description"></p>
      </div>
      <div class="card">
        <input id="city-input" list="cities" type="search" class="user-input" placeholder="search..." autocomplete="on" spellcheck="on" />
        <datalist id="cities"></datalist>
        <div class="inner">
          <h1 class="city"></h1>
          <div class="details">
            <div class="igenyes-megoldas"></div>
            <h2></h2>
          </div>
        </div>
      </div>
    </div>`;
}

function addH2() {
  return `<h2></h2>`;
}

function addIcon(icon) {
  return `<img class="icon" src="${icon}" alt="">`;
}

function createSatelitPicture(lat, lon, zoom) {
  return `
      <div class="background-image">
        <iframe src="https://www.rainviewer.com/map.html?loc=${lat},${lon},${zoom}&oFa=0&oC=0&oU=0&oCS=0&oF=0&oAP=1&c=1&o=55&lm=1&layer=radar-sat&sm=1&sn=1" width="100%" frameborder="0" allowfullscreen></iframe>
      </div>`;
}
