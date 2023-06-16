// Jarak Pandang
window.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Jakarta&appid=03f9ab02cf8566dd0bb9cd990be51fa5";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const visibility = data.visibility / 1000;

      const visibilityElement = document.getElementById("visibility");
      visibilityElement.textContent = `${visibility} km`;
    })
    .catch((error) => {
      console.log("Error:", error);
      const visibilityElement = document.getElementById("visibility");
      visibilityElement.textContent = "Failed to retrieve visibility data";
    });
});

// Index UV
window.addEventListener("DOMContentLoaded", function () {
  fetch("https://api.openweathermap.org/data/2.5/uvi?lat=-6.2088&lon=106.8456&appid=03f9ab02cf8566dd0bb9cd990be51fa5")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("indexUv").innerHTML = `${data.value}`;
    })
    .catch((error) => {
      console.log("Terjadi kesalahan:", error);
      document.getElementById("indexUv").innerHTML = "Terjadi kesalahan saat mengambil data indeks UV.";
    });
});

// Posisi Matahari
window.addEventListener("load", function () {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=Jakarta,id&appid=03f9ab02cf8566dd0bb9cd990be51fa5")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var sunrise = data.sys.sunrise;
      var sunset = data.sys.sunset;

      var sunriseDate = new Date(sunrise * 1000);
      var sunsetDate = new Date(sunset * 1000);

      var sunriseHours = sunriseDate.getHours();
      var sunriseMinutes = sunriseDate.getMinutes();
      var sunsetHours = sunsetDate.getHours();
      var sunsetMinutes = sunsetDate.getMinutes();

      var sunriseAngle = ((sunriseHours * 60 + sunriseMinutes) / 1440) * 360;
      var sunsetAngle = ((sunsetHours * 60 + sunsetMinutes) / 1440) * 360;

      var sunriseSunsetElement = document.getElementById("matahari");
      sunriseSunsetElement.innerHTML = sunriseAngle.toFixed(2) + "&deg - " + sunsetAngle.toFixed(2) + "&deg";
    })
    .catch(function (error) {
      console.log("Error:", error);
    });
});
