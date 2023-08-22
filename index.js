const apiKey = "bc04aef9ef2e460635e7c81360e793b8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

function checkWeather(city) {
    fetch(apiUrl + city + `&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            if (data.weather[0].main == 'Clouds') {
                weatherIcon.src = "images/clouds.png";
            } else if (data.weather[0].main == 'Clear') {
                weatherIcon.src = "images/clear.png";
            } else if (data.weather[0].main == 'Rain') {
                weatherIcon.src = "images/rain.png";
            } else if (data.weather[0].main == 'Drizzle') {
                weatherIcon.src = "images/drizzle.png";
            } else if (data.weather[0].main == 'Mist') {
                weatherIcon.src = "images/mist.png";
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".result").style.display = "none";
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            document.querySelector(".result").innerHTML = "<p>Weather data not available.</p>";
            document.querySelector(".result").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        });
}

searchBtn.addEventListener("click", () => {
    const cityName = searchBox.value.trim();
    
    if (cityName === "") {
        alert("Please enter a city first.");
        return;
    }
    
    checkWeather(cityName);
});
