let now = new Date();
let days = [
  "Sunday",
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

  getTemperatureDataFromApi(input.value, "metric");
  getForecastDataFromApi(input.value);
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
  
  let humidity=response.data.main.humidity;
  let currentHumidity=document.querySelector("#current-humidity");
  currentHumidity.innerHTML=`humidity: ${humidity}`;
  
  let precipitation=0;
  if (response.data.rain !==undefined) {
    precipitation=response.data.rain["1h"];
  }
  let currentPrecipitation=document.querySelector("#current-precipitation");
  currentPrecipitation.innerHTML=`precipitation: ${precipitation}`;
  
  //console.log(response);
}


function getTemperatureDataFromApi(city, units) {
  let apiKey = "f220ef8713fe3a276b12db39fffa267f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

function getForecastDataFromApi (city){
  let apiKey = "f220ef8713fe3a276b12db39fffa267f";
  let apiUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast); 
}

function showForecast (response){
  let today=now.getDate();
  let forecastCards=null;
  let currDt=null;
  response.data.list.forEach(period => {
    let day=new Date (period.dt_txt);
    let dt=day.getDate();
    if (currDt!==dt && dt>today) {
      console.log(`${day} - ${days[day.getDay()]}`);
      let cardDay=days[day.getDay()];
      let cardImg=`http://openweathermap.org/img/wn/${period.weather[0].icon}@2x.png`;
      let cardTemp=period.main.temp;
      let cardDesc=period.weather[0].description;
      forecastCards += createForecastCard(cardDay, cardImg, cardTemp, cardDesc);

      currDt=dt;
    }
  });

  let forecast=document.querySelector("#forecast");
  forecast.innerHTML=forecastCards;
}

function createForecastCard (cardDay, cardImg, cardTemp, cardDesc){
  let card= ` <div class="col">
    <div class="forecastCard">
      <ul>
        <li class="forecastCardDay">${cardDay}</li>
        <li class="forecastCardImg"><img src=${cardImg}></li>
        <li class="forecastCardTemp">${cardTemp}</li>
        <li class="forecastCardState">${cardDesc}</li>
      </ul>
    </div>
  </div>`;
  return card;
}


function main () {
  let currentDate = document.querySelector("h1");
  currentDate.innerHTML = `${day}, ${formatCurrentTime()}`;

  let cityForm = document.querySelector("#city-form");
  cityForm.addEventListener("submit", showCity);
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "f220ef8713fe3a276b12db39fffa267f";
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(getPosition);

//let currentLocation = document.querySelector("#current-position-button");
//currentLocation.addEventListener("click", getPosition);


window.onload = main;