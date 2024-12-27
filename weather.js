async function getWeather() {
    const city = document.getElementById('city').value;
    if (city === "") {
        alert("Please enter a city");
        return;
    }

    const apiKey = 'c2b990ba98b4938929918110e9b108b9';
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

    // Show the loader while the request is being processed
    document.getElementById('loader').style.display = 'block';
    document.getElementById('weather').style.display = 'none';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        // Check if the API returned an error
        if (data.error) {
            throw new Error(data.error.info || "City not found or invalid API response");
        }

        updateWeather(data);
        updateDatetime();
    } catch (error) {
        console.error(error);
        alert(`Error: ${error.message}`);
    } finally {
        document.getElementById('loader').style.display = 'none';
    }
}

function updateWeather(data) {
    const weather = data.current;
    const location = data.location;

    document.getElementById('weather').style.display = 'block';
    document.getElementById('city-name').innerText = location.name;
    document.getElementById('temperature').innerHTML = `Temperature: ${weather.temperature}°C`;
    document.getElementById('description').innerText = `Description: ${weather.weather_descriptions[0]}`;
    document.getElementById('humidity').innerText = `Humidity: ${weather.humidity}%`;
    document.getElementById('wind').innerText = `Wind speed: ${weather.wind_speed} kph`;

    // Update the weather icon if necessary
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.src = weather.weather_icons[0];
    weatherIcon.alt = weather.weather_descriptions[0];
}

function updateDatetime() {
    const now = new Date();
    const dateValue = now.toLocaleDateString();
    const timeValue = now.toLocaleTimeString();
    const yearValue = now.getFullYear();

    document.getElementById('date-value').innerText = dateValue;
    document.getElementById('time-value').innerText = timeValue;
    document.getElementById('year-value').innerText = yearValue;
}
