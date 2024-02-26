let windOutput = document.querySelector(".wind");

let humidityOutput = document.querySelector(".humidity");
let sunriseOutput = document.querySelector(".sunrise");
let sunsetOutput = document.querySelector(".sunset");
let conditionOutput = document.querySelector(".condition");
let tempOutput = document.querySelector(".temp");
let timeOutput = document.querySelector(".time");
let countryOutput = document.querySelector(".country");
let iconOutput = document.querySelector(".icon");

let checkBtn = document.querySelector(".btn");

checkBtn.addEventListener("click", () => {
  let cityInput = document.querySelector(".city-input").value;
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=50&appid=9402f793619e51d05bb385d059512f3c`
  )
    .then((resp) => resp.json())
    .then((data) => {
      let lat = data[0].lat;
      let lon = data[0].lon;

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9402f793619e51d05bb385d059512f3c&units=metric&lang=de`
      )
        .then((respo) => respo.json())
        .then((singledata) => {
          let sunriseMs = (singledata.sys.sunrise + singledata.timezone) * 1000;

          let date1 = new Date(sunriseMs);

          let sunrise = date1.toLocaleTimeString();
          // -------------------------------------------------------------
          let sunsetMs = (singledata.sys.sunset + singledata.timezone) * 1000;

          let date2 = new Date(sunsetMs);

          let sunset = date2.toLocaleTimeString();

          //  --------------------------------------------------------------

          let actualDate = new Date();
          let options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
          let actualDateFormat = actualDate.toLocaleDateString("de-DE", options);

          let icons = `https://openweathermap.org/img/wn/`;

          iconOutput.innerHTML = `<img src="${icons}${singledata.weather[0].icon}@2x.png"/>`;

          conditionOutput.innerHTML = `<p>${singledata.weather[0].description}</p>`;
          tempOutput.innerHTML = `<h2>${singledata.main.temp}°C</h2> `;
          timeOutput.innerHTML = `<p>${actualDateFormat}</p>`;
          countryOutput.innerHTML = `<h4>${cityInput.toUpperCase()}</h4>  <p> ( ${singledata.sys.country} )</p>`;

          windOutput.innerHTML = `<h3>Windgeschwindigkeit</h3> <p>${singledata.wind.speed} km/h</p>`;

          humidityOutput.innerHTML = `<h3>Luftfeuchtigkeit</h3> <p>${singledata.main.humidity} %</p>`;
          sunriseOutput.innerHTML = `<h3>Sonnenaufgang</h3> <p>${sunrise} Uhr</p>`;
          sunsetOutput.innerHTML = `<h3>Sonnenuntergang</h3> <p>${sunset} Uhr</p>`;
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    })
    .catch((error) => {
      console.error("Error fetching city data:", error);
    });
});
