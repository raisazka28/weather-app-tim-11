function animateValue(obj, end, unit = '') {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / 850, 1);
    obj.innerHTML = Math.floor(progress * (end - 0) + 0) + unit;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

window.addEventListener('DOMContentLoaded', () => {
  const locationElement = document.getElementById('location');
  const temperatureElement = document.getElementById('temperature');
  const weatherDescriptionElement = document.getElementById('weather-description');
  const weatherIconElement = document.getElementById('weather-icon');
  const feelsLikeElement = document.getElementById('feels-like');
  const humidityElement = document.getElementById('humidity');
  const rainChanceElement = document.getElementById('rain-chance');

  // Mendapatkan data cuaca menggunakan geolokasi
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      getWeatherData(latitude, longitude);
    },
    (error) => {
      console.error('Error getting location:', error);
    }
  );
// console.log(position);
  // Mendapatkan data cuaca dari API
  function getWeatherData(latitude, longitude) {
    const apiKey = '559bb81ceb5f6f48b0fb1e4eeb0bca23';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const location = data.name;
        const temperature = `${data.main.temp}°C`;
        const weatherDescription = data.weather[0].description;
        const weatherIcon = data.weather[0].icon;
        const feelsLike = `${data.main.feels_like}°C`;
        const humidity = `${data.main.humidity}%`;
        const rainChance = '20%';

        // Menampilkan data cuaca ke elemen HTML
        locationElement.textContent = `${location}`;
        animateValue(temperatureElement, parseInt(temperature), '°C')
        weatherDescriptionElement.textContent = `${weatherDescription}`;
        weatherIconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">`;
        animateValue(feelsLikeElement, parseInt(feelsLike), '°C')
        animateValue(humidityElement, parseInt(humidity), '%')
        animateValue(rainChanceElement, parseInt(rainChance), '%')
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }
});

  //ini js buat air quality
  window.addEventListener('load', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const apiKey = '559bb81ceb5f6f48b0fb1e4eeb0bca23';
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            console.log('aq', data);
            let so2 = data.list[0].components.so2 / 350 * 100
            let co = data.list[0].components.co / 15400 * 100
            let nh3 = data.list[0].components.nh3 / 200 * 100
            let no = data.list[0].components.no / 100 * 100
            let no2 = data.list[0].components.no2 / 200 * 100
            let o3 = data.list[0].components.o3 / 180 * 100
            let pm2_5 = data.list[0].components.pm2_5 / 75 * 100
            let pm10 = data.list[0].components.pm10 / 200 * 100
            let jumlah = (so2 + co + nh3 + no + no2 + o3 + pm2_5 + pm10) / 8
            let aq = data.list[0].main.aqi
            let classs = "progress w-full "
  
            animateValue(document.getElementById('aq-size'), parseInt(aq))

            document.getElementById('keterangan').innerText = ket(jumlah)
            document.getElementById('keterangan').setAttribute('class',"font-bold text-xl text"+celasColor(jumlah)+"-500")
            document.getElementById('aqi-level').setAttribute('style', `width: ${jumlah > 300 ? 100 : jumlah / 300 * 100}%`)
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }, error => {
        console.error('Error:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  });
  
  function ket(value) {
    console.log('ket', value)
    if (value >= 0 && value <= 20) return "Very Healthy"
    if (value >= 21 && value <= 40) return "Healthy"
    if (value >= 41 && value <= 60) return "Moderately Polluted"
    if (value >= 61 && value <= 80) return "Polluted"
    if (value >= 81 && value <= 100) return "Very Polluted"
  }
  function celas(value) {
    if (value >= 0 && value <= 20) return "-info"
    if (value >= 21 && value <= 40) return "-success"
    if (value >= 41 && value <= 60) return "-warning"
    if (value >= 61 && value <= 80) return "-error"
    if (value >= 81 && value <= 100) return ""
  }
  function celasColor(value) {
    if (value >= 0 && value <= 20) return "-blue"
    if (value >= 21 && value <= 40) return "-green"
    if (value >= 41 && value <= 60) return "-yellow"
    if (value >= 61 && value <= 80) return "-rose"
    if (value >= 81 && value <= 100) return "black "
  }


  //ini weather forecash
  window.addEventListener('load', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const apiKey = '559bb81ceb5f6f48b0fb1e4eeb0bca23';
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      console.log(position);
        fetch(url)
          .then(response => response.json())
          .then(data => {
            // console.log(data);
            const weatherData = data.list;
            console.log({ weatherData });
            const weatherTodayContainer = document.getElementById('forecast-today');
  
            // Loop through the weather data and create table rows dynamically
            for (let i = 0; i < weatherData.length; i++) {
              const dateTime = new Date(weatherData[i].dt_txt);
              const icon = `https://openweathermap.org/img/wn/${weatherData[i].weather[0].icon}.png`;
              const time = `${dateTime.getHours()}:00`;
              const temperature = (weatherData[i].main.temp - 273.15).toFixed(1);
              const weatherDescription = weatherData[i].weather[0].description;
              const humidity = weatherData[i].main.humidity;
  
              const item = document.createElement('div');
              item.classList.add('forecast-today__item');
              item.innerHTML = `
              <h5>${time}</h5>
                <img src="${icon}" />
              <span class="temp__label">${Math.floor(temperature)} °C</span>
              `
              weatherTodayContainer.appendChild(item);
            }
          })
          
          .catch(error => {
            console.error('Error:', error);
          });
      }, error => {
        console.error('Error:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  });

  window.addEventListener('load', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const apiKey = "03f9ab02cf8566dd0bb9cd990be51fa5";
            const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const nextWeekContainer = document.getElementById('forecast-week');
                    const forecasts = data.list;

                    for (let i = 0; i < forecasts.length; i += 8) {
                        const forecast = forecasts[i];
                        const date = forecast.dt_txt.split(' ')[0];
                        const temperature = Math.round(forecast.main.temp);
                        const description = forecast.weather[0].description;
                        const iconCode = forecast.weather[0].icon;

                        const item = document.createElement('div');
                        item.classList.add('forecast-week__item');
                        item.innerHTML = `
                        <h5>${getDayName(date)}</h5>
                        <hr style="width: 100%; margin-top: 8px" />
                        <img src="https://openweathermap.org/img/w/${iconCode}.png" />
                        <span class="temp__label">${temperature}°C</span>
                        `
                        nextWeekContainer.appendChild(item);

                    }
                })
                .catch(error => {
                    console.error("Error fetching weather data:", error);
                });
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
});

const getDayName = (date) => {
  const convertedDate = new Date(date);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  console.log(date);
  return days[convertedDate.getDay()];
}
  
  //ini yang index uv dan jarak pandang
// Jarak Pandang
window.addEventListener("DOMContentLoaded", function () {
  // Mendapatkan geolokasi pengguna
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const API_KEY = '559bb81ceb5f6f48b0fb1e4eeb0bca23'
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            const visibility = data.visibility / 1000;
          })
          .catch((error) => {
            console.log("Error:", error);
            const visibilityElement = document.getElementById("visibility");
            visibilityElement.textContent = "Failed to retrieve visibility data";
          });
      },
      function (error) {
        console.log("Error:", error);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser");
    const visibilityElement = document.getElementById("visibility");
    visibilityElement.textContent = "Geolocation is not supported by this browser";
  }
});


// Index UV
window.addEventListener("DOMContentLoaded", function () {
  fetch("https://api.openweathermap.org/data/2.5/uvi?lat=-6.2088&lon=106.8456&appid=03f9ab02cf8566dd0bb9cd990be51fa5")
    .then((response) => response.json())
    .then((data) => {
      animateValue(document.getElementById("indexUv"), data.value, ' UVI')
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
    })
    .catch(function (error) {
      console.log("Error:", error);
    });
});

//ini rekomendasi kegiatan
function getWeather(latitude, longitude) {
  var apiKey = "03f9ab02cf8566dd0bb9cd990be51fa5";

  var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          var mainWeather = data.weather[0].main;
          var description = data.weather[0].description;

          var activities = [];

          if (description.includes("rain")) {
              activities.push("Eat Indomie");
              activities.push("Meditate in the room");
              activities.push("Watch a movie while drinking hot tea");
          } else if (description.includes("cloud")) {
              activities.push("Take a walk in the park");
              activities.push("Visit a museum or art gallery");
              activities.push("Play sports outdoors");
          } else if (description.includes("clear")) {
              var temperature = data.main.temp;

              if (temperature > 25) {
                  activities.push("Swim or splash at the beach or pool");
                  activities.push("Picnic at the park");
                  activities.push("Visit amusement parks");
              } else {
                  activities.push("Take a walk in the park");
                  activities.push("Picnic in the park");
                  activities.push("Play soccer on the field");
              }
          } else if (description.includes("haze")) {
              activities.push("Listen to music or podcast");
              activities.push("Stay inside the room");
              activities.push("Cook warming food");
          } else {
              activities.push("Exercise for a healthy body");
              activities.push("Develop new skills");
              activities.push("Self deep talk");
          }

          const activitiesContainer = document.getElementById("list-container");

          for (var i = 0; i < activities.length; i++) {
              var activityItem = document.createElement("div");
              activityItem.classList.add("task__item");
              activityItem.textContent = activities[i];

              activitiesContainer.appendChild(activityItem);
          }
      }
  };
  xhr.send();
}

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;

          var locationText = "Lokasi saat ini: " + latitude.toFixed(2) + ", " + longitude.toFixed(2);

          getWeather(latitude, longitude);
      }, function () {
          var errorText = document.createElement("p");
          errorText.textContent = "Tidak dapat mengakses lokasi.";
      });
  } else {
      var errorText = document.createElement("p");
      errorText.textContent = "Geolokasi tidak didukung oleh browser.";
      // document.getElementById("activityList").appendChild(errorText);
  }
}

getLocation();
