// Current Time

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

let hour = currentDate.getHours();
let minutes = currentDate.getMinutes();
let day = days[currentDate.getDay()];

let time = document.querySelector("#date");

if (minutes < 10) {
  time.innerHTML = `${day} ${hour}:0${minutes}`;
} else {
  time.innerHTML = `${day} ${hour}:${minutes}`;
}

// Searchbox

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
 document.querySelector("#description").innerHTML = response.data.weather[0].main;
 
}

let citySearchButton = document.querySelector("#searchCityButton");
citySearchButton.addEventListener("click", searchCity);

let citySearchBox = document.querySelector("#searchCityBox");
citySearchBox.addEventListener("submit", searchCity);

searchDefaultCity("São Paulo")

// Temperature scale

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
