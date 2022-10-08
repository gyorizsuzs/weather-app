`use strict`;

console.log(`done`);

const apiKey = `5751d19b5d9a496cba484718220808`;
const city = `Budapest`;
const urlLocation = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
const urlForecast = `http://api.weatherapi.com/v1/forecast.json.json?key=${apiKey}&q=${city}`;

// const googleMap = `<div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=budapest&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://fmovies-online.net">fmovies</a><br><style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}</style><a href="https://www.embedgooglemap.net"></a><style>.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}</style></div></div>`;

const lon = 47.4979; // forecast => location.lon:19.08
const lat = 19.0402; // forecast => location.lat: 47.5

const lonParis = 48.886976832073124;
const latParis = 2.288023437297188;
const satelitePicsHtml = `    <iframe src="https://www.rainviewer.com/map.html?loc=${lon},${lat},6&oFa=0&oC=0&oU=0&oCS=1&oF=0&oAP=1&c=1&o=83&lm=1&layer=radar&sm=1&sn=1" width="100%" frameborder="0" style="border:0;width:50vw;height:40vh;" allowfullscreen></iframe>`;

// weatherFetch(urlLocation);
// weatherFetch(urlForecast);

async function weatherFetch(url) {
  const data = await fetch(url);
  const response = await data.json();

  console.log(response);
}

Init();
function Init() {
  addToHtml(createSatelitPicture(lonParis, latParis));
}

function createSatelitPicture(lon, lat) {
  return `<iframe src="https://www.rainviewer.com/map.html?loc=${lon},${lat},6&oFa=0&oC=0&oU=0&oCS=1&oF=0&oAP=1&c=1&o=83&lm=1&layer=radar&sm=1&sn=1" width="100%" frameborder="0" style="border:0;width:50vw;height:40vh;" allowfullscreen></iframe>`;
}

function addToHtml(markdown) {
  const root = document.getElementById(`root`);
  root.insertAdjacentHTML(`beforeend`, markdown);
}
