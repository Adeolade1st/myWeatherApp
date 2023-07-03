function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function getWeather(response) {
  let name = response.data.name;
  let cityName = document.querySelector("#city");
  cityName.innerHTML = `${name}`;
  console.log(response.data.name);

  let temperature = Math.round(response.data.main.temp);
  //let displaying = document.querySelector("#display");
  let temps = document.querySelector("#zero-temp");
  temps.innerHTML = `${temperature}`;
  console.log(response.data);

  let winds = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind: ${winds}km/h`;
  console.log(winds);

  let humidTemp = response.data.main.humidity;
  let humidAir = document.querySelector("#humid");
  humidAir.innerHTML = `Humidity: ${humidTemp}%`;
}

//let apiKey = "1cb6c613345a0d8b9e863edd3e2cbc11";
//let apiLink =
// "https://api.openweathermap.org/data/2.5/weather?q=Sydney&units=metric&appid=1cb6c613345a0d8b9e863edd3e2cbc11";
//axios.get(apiLink).then(getWeather);

function searchCity(city) {
  let apiKey = "1cb6c613345a0d8b9e863edd3e2cbc11";
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiLink).then(getWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#display").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form = document.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "1cb6c613345a0d8b9e863edd3e2cbc11";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let currentLocationButton = document.querySelector("#currentGeo");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Lagos");
