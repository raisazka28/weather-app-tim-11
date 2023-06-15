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
