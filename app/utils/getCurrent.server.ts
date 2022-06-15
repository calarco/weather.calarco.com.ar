export async function getCurrent(lat: number, lon: number) {
    const data = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=${process.env.WEATHER_API_KEY}`
    ).then((resp) => {
        return resp.json();
    });

    if (data.cod === 200) {
        return {
            date: new Date(data.dt * 1000).toISOString().substring(0, 10),
            city: data.name,
            weather: data.weather[0].description,
            temp: data.main.temp,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
        };
    } else {
        throw { message: data.message };
    }
}
