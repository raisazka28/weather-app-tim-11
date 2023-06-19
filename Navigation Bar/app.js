window.addEventListener('load', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const apiKey = '559bb81ceb5f6f48b0fb1e4eeb0bca23';
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        console.log(position);
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const temperature = (data.main.temp - 273.15).toFixed(1);
            const feelsLike = (data.main.feels_like - 273.15).toFixed(1);
            const weatherDescription = data.weather[0].description;
            const humidity = data.main.humidity;
            const rainChance = data.clouds.all;
            const city=data.name;
            console.log(data);
            document.getElementById('city').textContent = `${city}`;
            document.getElementById('temperature').textContent = `${temperature}°C`;
            document.getElementById('weatherDescription').textContent = `${weatherDescription}`;
            document.getElementById('feelsLike').textContent = `Feels Like: ${feelsLike}°C`;
            document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
            document.getElementById('rainChance').textContent = `Rain Chance: ${rainChance}%`;
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

  //ini js buat air quality
  window.addEventListener('load', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const apiKey = '559bb81ceb5f6f48b0fb1e4eeb0bca23';
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            let so2 = data.list[0].components.so2 / 350 * 100
            let co = data.list[0].components.co / 15400 * 100
            let nh3 = data.list[0].components.nh3 / 200 * 100
            let no = data.list[0].components.no / 100 * 100
            let no2 = data.list[0].components.no2 / 200 * 100
            let o3 = data.list[0].components.o3 / 180 * 100
            let pm2_5 = data.list[0].components.pm2_5 / 75 * 100
            let pm10 = data.list[0].components.pm10 / 200 * 100
            let jumlah = (so2 + co + nh3 + no + no2 + o3 + pm2_5 + pm10) / 8
            let classs = "progress w-full "
  
            // document.getElementById('so2').setAttribute('value',so2)
            // document.getElementById('co').setAttribute('value',co)
            // document.getElementById('nh3').setAttribute('value',nh3)
            // document.getElementById('no').setAttribute('value',no)
            // document.getElementById('no2').setAttribute('value',no2)
            // document.getElementById('o3').setAttribute('value',o3)
            // document.getElementById('pm10').setAttribute('value',pm10)
            // document.getElementById('pm2_5').setAttribute('value',pm2_5)
            document.getElementById('persentase').setAttribute('value', jumlah)
            document.getElementById('persentase').setAttribute('class', classs+"progress"+celas(jumlah))
            document.getElementById('persentase-t').innerText = jumlah.toString().slice(0, 3) + "%"
            document.getElementById('keterangan').innerText = ket(jumlah)
            document.getElementById('keterangan').setAttribute('class',"font-bold text-xl text"+celasColor(jumlah)+"-500")
            
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
    if (value >= 0 && value <= 20) return "Sangat Sehat"
    if (value >= 21 && value <= 40) return "Sehat"
    if (value >= 41 && value <= 60) return "Cukup Tercemar"
    if (value >= 61 && value <= 80) return "Tercemar"
    if (value >= 81 && value <= 100) return "Sangat Tercemar"
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
            console.log(data);
            const weatherData = data.list;
            const weatherTable = document.getElementById('weatherData');
  
            // Loop through the weather data and create table rows dynamically
            for (let i = 0; i < weatherData.length; i++) {
              const dateTime = new Date(weatherData[i].dt_txt);
              const time = `${dateTime.getHours()}:00`;
              const temperature = (weatherData[i].main.temp - 273.15).toFixed(1);
              const weatherDescription = weatherData[i].weather[0].description;
              const humidity = weatherData[i].main.humidity;
  
              const row = document.createElement('tr');
              row.innerHTML = `
                <td>${time}</td>
                <td>${temperature}</td>
                <td>${weatherDescription}</td>
                <td>${humidity}</td>
              `;
              console.log(data);
              weatherTable.appendChild(row);
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

  window.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeatherForecast);
    } else {
      console.log('Geolokasi tidak didukung oleh browser.');
    }
  });
  
  function getWeatherForecast(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const API_KEY = '559bb81ceb5f6f48b0fb1e4eeb0bca23';
    console.log(position);
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
      .then(response => response.json())
      .then(data => {
        const forecasts = data.list;
        const table = document.getElementById('weather-table');
  
        forecasts.forEach(forecast => {
          const date = forecast.dt_txt.split(' ')[0];
          const weather = forecast.weather[0].description;
          const temperature = forecast.main.temp;
          const humidity = forecast.main.humidity;
  
          const row = document.createElement('div');
          row.classList.add('weather-row');
          row.innerHTML = `
            <div class="weather-date">${date}</div>
            <div class="weather-info">
              <div class="weather-description">${weather}</div>
              <div class="weather-temperature">${temperature}°C</div>
              <div class="weather-humidity">Kelembapan: ${humidity}%</div>
            </div>
          `;
  
          table.appendChild(row);
        });
      })
      .catch(error => {
        console.log('Terjadi kesalahan:', error);
      });
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

            const visibilityElement = document.getElementById("visibility");
            visibilityElement.textContent = `${visibility} km`;
          })
          .catch((error) => {
            console.log("Error:", error);
            const visibilityElement = document.getElementById("visibility");
            visibilityElement.textContent = "Failed to retrieve visibility data";
          });
      },
      function (error) {
        console.log("Error:", error);
        const visibilityElement = document.getElementById("visibility");
        visibilityElement.textContent = "Geolocation is not supported by this browser";
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

//ini rekomendasi kegiatan
function getWeather(latitude, longitude) {
  var apiKey = "03f9ab02cf8566dd0bb9cd990be51fa5"; // Ganti <API_KEY> dengan kunci API Anda dari OpenWeatherMap

  var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          var mainWeather = data.weather[0].main;
          var description = data.weather[0].description;

          var activities = [];

          if (description.includes("rain")) {
              activities.push("Membawa payung atau jas hujan jika bepergian");
              activities.push("Membaca buku di dalam ruangan");
              activities.push("Menonton film sambil minum teh hangat");
          } else if (description.includes("cloud")) {
              activities.push("Berjalan-jalan di taman");
              activities.push("Mengunjungi museum atau galeri seni");
              activities.push("Bermain olahraga di luar ruangan");
          } else if (description.includes("clear")) {
              var temperature = data.main.temp;

              if (temperature > 25) {
                  activities.push("Berenang atau bermain air di pantai atau kolam renang");
                  activities.push("Piknik di taman");
                  activities.push("Mengunjungi taman hiburan");
              } else {
                  activities.push("Berjalan-jalan di taman");
                  activities.push("Berpiknik di taman");
                  activities.push("Bermain sepak bola di lapangan");
              }
          } else if (description.includes("snow")) {
              activities.push("Bermain ski atau snowboarding di resor ski");
              activities.push("Membuat manusia salju");
              activities.push("Bermain olahraga salju seperti luncur atau bermain snowball");
          } else {
              activities.push("Cuaca saat ini tidak dapat dikenali, silakan coba lagi nanti");
          }

          var activityList = document.getElementById("activityList");
          activityList.innerHTML = "";

          for (var i = 0; i < activities.length; i++) {
              var activityItem = document.createElement("div");
              activityItem.classList.add("activityItem");
              activityItem.textContent = activities[i];

              activityList.appendChild(activityItem);
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
          document.getElementById("location").textContent = locationText;

          getWeather(latitude, longitude);
      }, function () {
          var errorText = document.createElement("p");
          errorText.textContent = "Tidak dapat mengakses lokasi.";
          document.getElementById("activityList").appendChild(errorText);
      });
  } else {
      var errorText = document.createElement("p");
      errorText.textContent = "Geolokasi tidak didukung oleh browser.";
      document.getElementById("activityList").appendChild(errorText);
  }
}

getLocation();
