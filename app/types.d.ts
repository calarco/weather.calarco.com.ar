type Current = {
    date: string;
    city: string;
    weather: string;
    temp: number;
    pressure: number;
    humidity: number;
};

type Forecast = {
    date: string;
    weather: string;
    temp_day: number;
    temp_eve: number;
    temp_night: number;
    pressure: number;
    humidity: number;
}[];
