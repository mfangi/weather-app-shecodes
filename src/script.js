// Date
let currentDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDate.getDay()];
let hour = currentDate.getHours();
let minutes = ("0" + currentDate.getMinutes()).slice(-2);
let correctDate = document.querySelector(".current-date");
correctDate.innerHTML = `${day} ${hour}:${minutes}`;
// Variables for search engine
let apiKey = "9706500ac8f554aa37ba55acbe2d7310";
let displayedCity = document.querySelector(".current-city");
let displayedTemp = document.querySelector("#cityTemp");
let form = document.querySelector("form");
let geoLocButton = document.querySelector("#geoLocButton");
let currentWeatherDescription = document.querySelector(
  ".current-weather-description"
);
let currentHumidity = document.querySelector(".humidity-data");
let currentWind = document.querySelector(".wind-data");

// City
function updateCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  displayedCity.innerHTML = `${cityInput.value}`;
  let typedCity = displayedCity.innerHTML;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${typedCity}&units=metric&appid=${apiKey}`;
  function showCityTemp(response) {
    console.log(response);
    displayedTemp.innerHTML = Math.round(response.data.main.temp);
    currentHumidity.innerHTML = Math.round(response.data.main.humidity);
    currentWind.innerHTML = Math.round(response.data.wind.speed);
    currentWeatherDescription.innerHTML = response.data.weather[0].description;
  }
  axios.get(apiUrl).then(showCityTemp);
}
form.addEventListener("submit", updateCity);

// Geolocalization
function handlePosition(position) {
  navigator.geolocation.getCurrentPosition(handlePosition);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}
&lon=
${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(geoLoc);
}
function geoLoc(response) {
  console.log("GeoLoc checker");
  displayedCity.innerHTML = response.data.name;
  displayedTemp.innerHTML = Math.round(response.data.main.temp);
}
geoLocButton.addEventListener("click", handlePosition);
// Temp converter
function convTempF(event) {
  event.preventDefault();
  let cityTempNum = document.querySelector("#cityTemp").innerHTML;
  let cityTempF = Math.round((cityTempNum * 9) / 5 + 32);
  let cityTemp = document.querySelector("#cityTemp");
  cityTemp.innerHTML = `${cityTempF}`;
  degreesF.style.color = "#1e78b1";
  degreesC.style.color = "grey";
  degreesF.style.pointerEvents = "none";
  degreesC.style.pointerEvents = "all";
}
let degreesF = document.querySelector(".degrees.F");
degreesF.addEventListener("click", convTempF);

function convTempC(event) {
  event.preventDefault();
  let cityTempNum = document.querySelector("#cityTemp").innerHTML;
  let cityTempC = Math.round(((cityTempNum - 32) * 5) / 9);
  let cityTemp = document.querySelector("#cityTemp");
  cityTemp.innerHTML = `${cityTempC}`;
  degreesC.style.color = "#1e78b1";
  degreesF.style.color = "grey";
  degreesC.style.pointerEvents = "none";
  degreesF.style.pointerEvents = "all";
}
let degreesC = document.querySelector(".degrees.C");
degreesC.addEventListener("click", convTempC);
