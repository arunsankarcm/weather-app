async function getWeather(location) {
    const apiKey = 'beccd42717d44ee888954807230911'; // Replace with your actual API key from WeatherAPI
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
        }

        const data = await response.json();

        const temperature = data.current.temp_c;
        const weatherDescription = data.current.condition.text;

        return `Temperature in ${location}: ${temperature}°C, Weather description: ${weatherDescription}`;
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

document.getElementById('search-button').addEventListener('click', async () => {
    const locationInput = document.getElementById('location-input');
    const weatherInfo = document.getElementById('weather-info');

    const location = locationInput.value;
    if (!location) {
        weatherInfo.textContent = 'Please enter a location.';
        return;
    }

    const result = await getWeather(location);
    weatherInfo.textContent = result;
});
