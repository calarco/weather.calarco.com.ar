export async function getCurrent(lat: number, lon: number) {
    const data = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=16749c9e1696ec7dcf1cde3c8d8317c7`
    )
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            return { message: error };
        });

    if (data.cod === 200) {
        return {
            date: new Date(data.dt * 1000).toISOString().substring(0, 10),
            city: data.name,
            country: data.sys.country,
            weather: data.weather[0].description,
            temp: data.main.temp,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
        };
    } else {
        throw { message: data.message };
    }
}
