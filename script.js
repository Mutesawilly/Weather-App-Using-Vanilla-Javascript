const API_KEY = "56b4c44dd4b491edaa1faa6ae56c3f2b";
const city = document.getElementById("city");
const searchButton = document.getElementById("submit");

getWeatherData("Kigali"); // Fetch weather data for Kigali on page load

async function getWeatherData(city) {
    // Construct the URL for the OpenWeatherMap API request
    // The `encodeURIComponent` function ensures that the city name is properly encoded for use in a URL.
    // The `units=metric` parameter specifies that the temperature should be returned in Celsius.
    // The `appid` parameter includes the API key required to authenticate the request.
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${encodeURIComponent(city)}&appid=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        console.log(data);
        
        displayWeatherData(data);

    } catch (error) {
        console.error("Failed To Fetch: ", error);
    }
}

// Trigger search when the button is clicked
searchButton.addEventListener("click", (event) => {
    event.preventDefault(); 
    getWeatherData(city.value);
});

// Trigger search when the "Enter" key is pressed in the input field
// The `addEventListener` method attaches an event listener to the `city` input field.
// The `keydown` event is triggered whenever a key is pressed while the input field is focused.
// The `event` object contains information about the event, including the key that was pressed.
city.addEventListener("keydown", (event) => {
    // Check if the pressed key is the "Enter" key
    // The `key` property of the `event` object specifies the key that was pressed.
    if (event.key === "Enter") {
        // Prevent the default behavior of the "Enter" key
        // In a form, pressing "Enter" typically submits the form. This line prevents that behavior.
        event.preventDefault();

        // Call the `getWeatherData` function with the value of the `city` input field
        // The `value` property of the `city` input field contains the text entered by the user.
        getWeatherData(city.value);
    }
});

async function displayWeatherData(data) {
    const humidity = data.main.humidity;
    const temperature = data.main.temp;
    const cityName = data.name;
    const feelsLike = data.main.feels_like;
    const windSpeed = data.wind.speed;
    const weatherDescription = data.weather[0].description;
    // Extract the country code from the `sys` object in the API response
    const country = data.sys.country;

    // Extract the weather icon code from the `weather` array in the API response
    const icon = data.weather[0].icon;

    // Construct the URL for the weather icon using the extracted icon code
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    // Extract the sunrise time (in seconds since the Unix epoch) from the `sys` object in the API response
    const sunrise = data.sys.sunrise;

    // Extract the timezone offset (in seconds) from the API response
    const timezoneOffset = data.timezone; 

    // Calculate the current time in the specified city's timezone
    // `Date.now()` provides the current time in milliseconds since the Unix epoch
    // Multiplying `timezoneOffset` by 1000 converts the offset from seconds to milliseconds
    // Adding the adjusted offset to `Date.now()` gives the current time in the specified city's timezone
    const currentTime = new Date(Date.now() + timezoneOffset * 1000);

    // Update weather details in the DOM
    document.getElementById("cityName").innerText = cityName;
    document.getElementById("temperature").innerText = `${temperature}°C`;
    document.getElementById("Feels").innerText = `${feelsLike}°C`;
    document.getElementById("Humidity").innerText = `${humidity}%`;
    document.getElementById("WindSpeed").innerText = `${windSpeed} km/h`;
    document.getElementById("description").innerText = weatherDescription;
    document.getElementById("country").innerText = country;

    // Update the "src" attribute of the element with the ID "weather-icon"
    // The `getElementById` method selects the HTML element with the specified ID.
    // The `src` property sets the source URL of an image element.
    // `iconUrl.replace("@2x", "@4x")` replaces "@2x" in the URL string with "@4x" to load a higher resolution image.
    document.getElementById("weather-icon").src = iconUrl.replace("@2x", "@4x");

    // Update the "href" attribute of the element with the ID "favicon"
    // The `getElementById` method selects the HTML element with the specified ID.
    // The `href` property sets the URL of the favicon (the small icon displayed in the browser tab).
    // Again, `iconUrl.replace("@2x", "@4x")` ensures the favicon uses a higher resolution image.
    document.getElementById("favicon").href = iconUrl.replace("@2x", "@4x");

    // Update the text content of the element with the ID "sunrise"
    // The `getElementById` method selects the HTML element with the specified ID.
    // The `innerText` property sets the text content of the selected element.
    // `new Date(sunrise * 1000)` converts the sunrise time (in seconds since the Unix epoch) into a JavaScript Date object.
    // `.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })` formats the time into a human-readable string with only hours and minutes.
    document.getElementById("sunrise").innerText = new Date(sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Update the text content of the element with the ID "date"
    // The `getElementById` method selects the HTML element with the specified ID.
    // The `innerText` property sets the text content of the selected element.
    // `currentTime.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })`
    // formats the current date into a readable string that includes the weekday, year, month, and day.
    document.getElementById("date").innerText = currentTime.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}