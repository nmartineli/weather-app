// Searchbox


function formatDate(timestamp){
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
} 
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
} 
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];
return `${day}, ${hours}:${minutes}`;

}

function searchDefaultCity(city){
let apiKey = "6d9cebf9851ed0f6ae8a89e4056f4b5a";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
   axios.get(apiUrl).then(getCityInfo);
}

function searchCity(event) {
  event.preventDefault();
  let searchBox = document.querySelector("#searchBox");
  let newCity = searchBox.value;
  newCity = newCity.trim();
  newCity = newCity.toLowerCase();
  searchDefaultCity(newCity);
 
}

function getCityInfo(response) {
  document.querySelector("#temperature-number").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#city").innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed * 3.6);
 document.querySelector("#humidity").innerHTML = response.data.main.humidity;
 document.querySelector("#description").innerHTML = response.data.weather[0].description;
 document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
 document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/10d@2x.png`)
}

let citySearchButton = document.querySelector("#searchCityButton");
citySearchButton.addEventListener("click", searchCity);

let citySearchBox = document.querySelector("#searchCityBox");
citySearchBox.addEventListener("submit", searchCity);

searchDefaultCity("São Paulo")

// Temperature scale

function getFahrenheitTemperature(event) {
event.preventDefault()
let celsiusTemperature = document.querySelector("#temperature-number");
let fahrenheitTemperature = 1 * 1.8 + 32;
document.querySelector("#temperature-number").innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitScale = document.querySelector("#fahrenheit");
fahrenheitScale.addEventListener("click", getFahrenheitTemperature)

// Current City

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "6d9cebf9851ed0f6ae8a89e4056f4b5a";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getCityInfo);
}

function currentLocation(position) {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", currentLocation);
