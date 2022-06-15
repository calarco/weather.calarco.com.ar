export async function getForecast(lat: number, lon: number) {
    const data = await fetch(
        `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=es&units=metric&exclude=current,minutely,hourly,alerts&appid=${process.env.WEATHER_API_KEY}`
    ).then((resp) => {
        return resp.json();
    });

    if (!data.message) {
        return data.daily?.slice(1, 6).map((day) => {
            return {
                date: new Date(day.dt * 1000).toISOString().substring(0, 10),
                weather: day.weather[0].description,
                temp_day: day.temp.day,
                temp_eve: day.temp.eve,
                temp_night: day.temp.night,
                pressure: day.pressure,
                humidity: day.humidity,
            };
        });
    } else {
        throw { message: data.message };
    }
}
