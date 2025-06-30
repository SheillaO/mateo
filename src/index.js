function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  console.log(response.data.condition.description);

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

getForecast(response.data.city);

}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "7601b0fff0179o9d5059a8db34ctbc66";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Nairobi");

//
function formatDay(timestamp){
let date = new Date(timestamp * 1000)
let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

return days[date.getDay()];


}












function getForecast(city) {
  let apiKey = "7601b0fff0179o9d5059a8db34ctbc66";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);

  console.log(apiUrl);
}







//
function displayForecast(response) {
 console.log(response.data);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";

 response.data.daily.forEach(function (day, index) {
if (index < 5) {

    forecastHTML =
      forecastHTML +
      `
    <div class="weather-forecast-day">
       <div class="weather-forecast-date">${formatDay(day.time)}</div>
       <div class="weather-forecast-icon"> 
       <img src="${day.condition.icon_url}" />
       
       
       </div>
       <div class="weather-forecast-temperatures">
           <div class="weather-forecast-temperature">
               <strong>${Math.round(day.temperature.maximum)}°</strong> 
           </div>
           <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
       </div>
   </div>
   `;
  }
  });

  forecastElement.innerHTML = forecastHTML;
}

displayForecast();
getForecast("Nairobi")
