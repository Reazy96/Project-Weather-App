let windOutput = document.querySelector(".wind");
let cloudOutput = document.querySelector(".cloud");
let pressureOutput = document.querySelector(".pressure");
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

      console.log(lat);
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9402f793619e51d05bb385d059512f3c&units=metric&lang=de`
      )
        .then((respo) => respo.json())
        .then((singledata) => {
          let sunriseMs = singledata.sys.sunrise;

          let date1 = new Date(sunriseMs);

          let sunrise = date1.toLocaleTimeString();
          // -------------------------------------------------------------
          let sunsetMs = singledata.sys.sunset;

          let date2 = new Date(sunsetMs);

          let sunset = date2.toLocaleTimeString();

          console.log(singledata.sys.country);

          let icons = `https://openweathermap.org/img/wn/`;

          console.log(singledata);

          countryOutput.innerHTML = `<p> ${singledata.sys.country}</p>`;
          iconOutput.innerHTML = `<img src="${icons}${singledata.weather[0].icon}@2x.png"/>`;
          tempOutput.innerHTML = `<p>${singledata.main.temp}</p> <p>°C</p>`;
          conditionOutput.innerHTML = `<p>${singledata.weather[0].description}</p>`;
          windOutput.innerHTML = `<h3>Windgeschwindigkeit:</h3> <p>${singledata.wind.speed}</p>`;
          pressureOutput.innerHTML = `<h3>atmosphärischer Druck:</h3> <p>${singledata.main.pressure}</p>`;
          humidityOutput.innerHTML = `<h3>Luftfeuchtigkeit:</h3> <p>${singledata.main.humidity}</p>`;
          sunriseOutput.innerHTML = `<h3>Sonnenaufgang</h3> <p>${sunrise}</p>`;
          sunsetOutput.innerHTML = `<h3>Sonnenuntergang</h3> <p>${sunset}</p>`;
        });
    });
});
