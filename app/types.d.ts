type Location = {
    country: string;
    city: string;
    lat: number;
    lon: number;
};

type Current = {
    city: string;
    date: string;
    weather: string;
    temp: number;
    humidity: number;
    pressure: number;
};

type Forecast = {
    date: string;
    weather: string;
    temp_day: number;
    temp_eve: number;
    temp_night: number;
    humidity: number;
    pressure: number;
}[];
