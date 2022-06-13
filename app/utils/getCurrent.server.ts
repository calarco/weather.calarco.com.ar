export async function getCurrent(lat: number, lon: number) {
    const weather = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=${process.env.WEATHER_API_KEY}`
    )
        .then((resp) => {
            return resp.json();
        })
        .catch((error) => {
            return error;
        });

    return {
        date: new Date(weather.dt * 1000).toISOString().substring(0, 10),
        city: weather.name,
        weather: weather.weather[0].description,
        temp: weather.main.temp,
        pressure: weather.main.pressure,
        humidity: weather.main.humidity,
    };
}
