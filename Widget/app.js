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