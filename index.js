let now = new Date();
let days = [
  "Suday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

function formatCurrentTime() {
  let hour = now.getHours();
  let minutes = now.getMinutes();

  if (hour <= 9) {
    hour = "0" + hour;
  }
  if (minutes <= 9) {
    minutes = "0" + minutes;
  }

  return hour + ":" + minutes;
}

//let currentDate = document.querySelector("h1");
//currentDate.innerHTML = `${day}, ${formatCurrentTime()}`;

function showCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = input.value;

  getTemperatureDatafromApi(input.value, "metric");
}
//let cityForm = document.querySelector("#city-form");
//cityForm.addEventListener("submit", showCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureInfo = document.querySelector("#current-temperature");
  temperatureInfo.innerHTML = `${temperature}°C`;
  

  let weather= response.data.weather[0].icon;
  let weatherIcon=document.querySelector("#current-icon");
  weatherIcon.src=  `http://openweathermap.org/img/wn/${weather}@2x.png`;
  

  let state= response.data.weather[0].description;
  let currentState=document.querySelector("#current-state");
  currentState.innerHTML=`${state}`;
  
  //console.log(response);
}
  

function getTemperatureDatafromApi(city, units) {
  let apiKey = "f220ef8713fe3a276b12db39fffa267f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

function main () {
  let currentDate = document.querySelector("h1");
  currentDate.innerHTML = `${day}, ${formatCurrentTime()}`;

  let cityForm = document.querySelector("#city-form");
  cityForm.addEventListener("submit", showCity);
}

window.onload = main;