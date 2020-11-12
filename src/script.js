function formatDate(timestamp){
let date = new Date(timestamp);
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
return `${day}, ${formatHours(timestamp)}`;

}

function formatHours(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
} 
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

return `${hours}:${minutes}`;
}

function searchDefaultCity(city){
let apiKey = "6d9cebf9851ed0f6ae8a89e4056f4b5a";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
   axios.get(apiUrl).then(getCityInfo);

   apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response){
   document.querySelector("#forecast").innerHTML = null; 
  let forecast = null;

  for (let index = 0; index < 5; index++) {
  
  forecast = response.data.list[index]; 
  document.querySelector("#forecast").innerHTML += 
  `
           <div class="col" id="cards">
            <ul id="card-list">
                <li class="card-day">${formatHours(forecast.dt * 1000)}</li>
                <li class="card-forecast">
                  <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="${forecast.weather[0].description}" class="forecast-image">
                </li>
                <li class="card-forecast">
                  <strong>${Math.round(forecast.main.temp_max)}° </strong>${Math.round(forecast.main.temp_min)}°
                </li>
              </ul>
            </div>
          </div>
`    
  }

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
  celsiusTemperature = response.data.main.temp
  document.querySelector("#temperature-number").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#city").innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed * 3.6);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
}

let citySearchButton = document.querySelector("#searchCityButton");
citySearchButton.addEventListener("click", searchCity);

let citySearchBox = document.querySelector("#searchCityBox");
citySearchBox.addEventListener("submit", searchCity);


function displayFahrenheitTemperature(event) {
event.preventDefault();
celsiusLink.classList.remove("active");
fahrenheintLink.classList.add("active");
let fahrenheitTemperature = (celsiusTemperature * 9/5) + 32;
document.querySelector("#temperature-number").innerHTML = Math.round(fahrenheitTemperature);
}


function displayCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheintLink.classList.remove("active");
  celsiusLink.classList.add("active");
  document.querySelector("#temperature-number").innerHTML = Math.round(celsiusTemperature);

}

let fahrenheintLink = document.querySelector("#fahrenheit-link")
fahrenheintLink.addEventListener("click", displayFahrenheitTemperature)

let celsiusTemperature = null

let celsiusLink = document.querySelector("#celsius-link")
celsiusLink.addEventListener("click", displayCelsiusTemperature)

// Current City

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "6d9cebf9851ed0f6ae8a89e4056f4b5a";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getCityInfo);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

function currentLocation(position) {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", currentLocation);


searchDefaultCity("São Paulo")