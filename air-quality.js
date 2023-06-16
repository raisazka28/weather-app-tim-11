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