const apiKey = 'YOUR_API_KEY';
const apiUrl = 'http://api.weatherstack.com/current';

const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeather(city);
    }
});

function fetchWeather(city) {
    const url = `${apiUrl}?access_key=${apiKey}&query=${city}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.location.name;
            temperatureElement.textContent = `${data.current.temperature}°C`;
            descriptionElement.textContent = data.current.weather_descriptions[0];
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// Automatically get weather for user's location
navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    const url = `${apiUrl}?access_key=${apiKey}&query=${latitude},${longitude}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.location.name;
            temperatureElement.textContent = `${data.current.temperature}°C`;
            descriptionElement.textContent = data.current.weather_descriptions[0];
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});
