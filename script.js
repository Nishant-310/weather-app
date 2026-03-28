const citySelect = document.getElementById("citySelect");
const tempBox = document.querySelector(".temp");
const weatherBox = document.querySelector(".weather");

const API_KEY = "208f6d8d28336d4c82db9a5bc90de276";

const container = document.querySelector(".container");





citySelect.addEventListener("change", () => {
    const city = citySelect.value;
    if (!city) return;
    getWeather(city);
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.weather[0].main === "Clear") {
    container.style.backgroundImage = "url('clear.jpg')";
} else if (data.weather[0].main === "Clouds") {
    container.style.backgroundImage = "url('cloudy.jpg')";
} else if (data.weather[0].main === "Rain") {
    container.style.backgroundImage = "url('rain.jpg')";
}

        console.log(data);

        if (data.cod !== 200) {
            tempBox.innerText = "Error";
            weatherBox.innerText = "City not found";
            return;
        }

        tempBox.innerText = data.main.temp + "°C";
        weatherBox.innerText = data.weather[0].main;

    } catch (error) {
        console.log("Error:", error);
    }
}

