let windOutput = document.querySelector(".wind");
let cloudOutput = document.querySelector(".cloud");
let pressureOutput = document.querySelector(".pressure");
let humidityOutput = document.querySelector(".humidity");
let sunriseOutput = document.querySelector(".sunrise");
let sunsetOutput = document.querySelector(".sunset");
let conditionOutput = document.querySelector(".condition");
let tempOutput = document.querySelector(".temp");
let timeOutput = document.querySelector(".time");

let checkBtn = document.querySelector(".btn");

checkBtn.addEventListener("click", () => {
  let cityInput = document.querySelector(".city-input").value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInput},lat=52.520008&lon=13.404954&appid=9402f793619e51d05bb385d059512f3c&units=metric&lang=de`
  )
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      let sunriseMs = data.sys.sunrise;
      console.log(sunriseMs);
      let date1 = new Date(sunriseMs);
      console.log(date1);
      let sunrise = date1.toLocaleTimeString();
      console.log(sunrise);

      let sunsetMs = data.sys.sunset;
      console.log(sunsetMs);
      let date2 = new Date(sunsetMs);
      console.log(date2);
      let sunset = date2.toLocaleTimeString();
      console.log(sunrise);

      tempOutput.innerHTML = `<p>${data.main.temp}</p> <p>°C</p>`;
      conditionOutput.innerHTML = `<p>${data.weather[0].description}</p>`;
      windOutput.innerHTML = `<h3>Windgeschwindigkeit:</h3> <p>${data.wind.speed}</p>`;
      pressureOutput.innerHTML = `<h3>atmosphärischer Druck:</h3> <p>${data.main.pressure}</p>`;
      humidityOutput.innerHTML = `<h3>Luftfeuchtigkeit:</h3> <p>${data.main.humidity}</p>`;
      sunriseOutput.innerHTML = `<h3>Sonnenaufgang</h3> <p>${sunrise}</p>`;
      sunsetOutput.innerHTML = `<h3>Sonnenuntergang</h3> <p>${sunset}</p>`;
    });
});
