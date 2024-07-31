
const apiKey = 'c82efa078b9cf98522821dfdb04daf47';
let mapa;
let marcador;

document.getElementById("btn-menu").addEventListener("click", function () {
  document.getElementById("menu").classList.toggle("open");
});

document.getElementById("btn-close").addEventListener("click", function () {
  document.getElementById("menu").classList.remove("open");
});

document.getElementById('btn-search').addEventListener('click', function () {
  const cityInput = document.getElementById('city-search').value;
  if (cityInput) {
    fetchWeather(cityInput);
    document.getElementById("menu").classList.remove("open");
    document.getElementById('city-search').value = '';

  }
})

document.getElementById('location').addEventListener('click', function () {
  getCurrentUbication()
})

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric&lang=es`;

  await fetch(url)
    .then(response => response.json())
    .then(data => {
      //Código para renderizar el html
      renderWeather(data);
      console.log(data);

    })
    .catch(error => {
      console.log('Eror', error);
      const html = `
        <p class="error-info">No tenemos información de esa ciudad</p>
      `
      document.querySelector('#weather-info').innerHTML = html;
    });
}

function renderWeather(weatherData) {
  const { name, main, weather, wind, sys } = weatherData;
  
  const image = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`
  const lat = weatherData.coord.lat;
  const lon = weatherData.coord.lon;

  const html = `
      <img src="${image}">
      <h2 class="info-temperature">${main.temp}°C</h2>
      <h2 class="info-condicion">${weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1)}</h2>
      <h2 class="info-city">${name},${sys.country}</h2>
    `

  const html1 = `
      <p class="title-highlight">Vel. del viento</p>
      <p class="highlight">${wind.speed}m/s</p>
    `

  const html2 = `
      <p class="title-highlight">Humedad</p>
      <p class="highlight">${main.humidity}%</p>
    `

  const html3 = `
      <p class="title-highlight">Sensación térmica</p>
      <p class="highlight">${main.feels_like}°C</p>
    `

  const html4 = `
    <div class="minmaxContainer">
    <div class="min">
        <p class="minHeading">Min</p>
        <p class="minTemp">${main.temp_min}°</p>
    </div>
    <div class="max">
        <p class="maxHeading">Max</p>
        <p class="maxTemp">${main.temp_max}°</p>
    </div>
</div>
  `

  showUbication(lat, lon);

  document.querySelector('#weather-info').innerHTML = html;
  document.querySelector('#wind-info').innerHTML = html1;
  document.querySelector('#humidity-info').innerHTML = html2;
  document.querySelector('#feels-like-info').innerHTML = html3;
  document.querySelector('#visibility-info').innerHTML = html4;
}

function getCurrentUbication() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      //Llamado a la función que obtiene los datos de lat y lon desde la api del clima
      getWeatherData(lat, lon);
    }, function (error) {
      console.log('Error al obtener la ubicación: ' + error.message);
    });
  } else {
    console.log('El navegador no soporta la geolocalización');
  }
}

function getWeatherData(lat, lon) {

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey}&units=metric&lang=es`

  fetch(url)
    .then(response => response.json())
    .then(data => {
      //Código para renderizar el html
      renderWeather(data);
      console.log(data);
    })
    .catch(error => {
      console.log('Eror', error);
    });

}

function showUbication(latitud, longitud) {

  if (typeof mapa !== 'undefined') {
    mapa.setView([latitud, longitud]);
    marcador.setLatLng([latitud, longitud]);
  } else {
    mapa = L.map('map').setView([latitud, longitud], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(mapa);

    marcador = L.marker([latitud, longitud]).addTo(mapa);
  }
}

