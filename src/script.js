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
// City
let form = document.querySelector("form");
function updateCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let displayedCity = document.querySelector(".current-city");
  displayedCity.innerHTML = `${cityInput.value.toUpperCase()}`;
  let typedCity = displayedCity.innerHTML;
  let apiKey = "9706500ac8f554aa37ba55acbe2d7310";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${typedCity}&units=metric&appid=${apiKey}`;
  function showCityTemp(response) {
    let displayedTemp = document.querySelector("#cityTemp");
    displayedTemp.innerHTML = Math.round(response.data.main.temp);
  }
  axios.get(apiUrl).then(showCityTemp);
}
form.addEventListener("submit", updateCity);

// Geolocalization
let geoLocButton = document.querySelector(".geoLocButton");
function handlePosition(position) {
  navigator.geolocation.getCurrentPosition(handlePosition);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "9706500ac8f554aa37ba55acbe2d7310";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}
&lon=
${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(geoLoc);
}
function geoLoc(response) {
  let displayedCity = document.querySelector(".current-city");
  displayedCity.innerHTML = response.data.name;
  let displayedTemp = document.querySelector("#cityTemp");
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
  degreesF.style.color = "grey";
  degreesC.style.color = "white";
}
let degreesF = document.querySelector(".degrees.F");
degreesF.addEventListener("click", convTempF);

function convTempC(event) {
  event.preventDefault();
  let cityTempNum = document.querySelector("#cityTemp").innerHTML;
  let cityTempC = Math.round(((cityTempNum - 32) * 5) / 9);
  let cityTemp = document.querySelector("#cityTemp");
  cityTemp.innerHTML = `${cityTempC}`;
  degreesC.style.color = "grey";
  degreesF.style.color = "white";
}
let degreesC = document.querySelector(".degrees.C");
degreesC.addEventListener("click", convTempC);
