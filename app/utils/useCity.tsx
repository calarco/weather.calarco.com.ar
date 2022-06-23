import { useState, useEffect } from "react";
import { useFetcher } from "@remix-run/react";

type ComponentProps = {
    city?: string;
};

const useCity = ({ city }: ComponentProps) => {
    const currentFetcher = useFetcher();
    const forecastFetcher = useFetcher();
    const [current, setCurrent] = useState<Current>({
        date: "-",
        city: "-",
        country: "-",
        weather: "-",
        temp: 0,
        pressure: 0,
        humidity: 0,
    });
    const [forecast, setForecast] = useState<Forecast>(
        Array.from({ length: 5 }).map(() => ({
            date: "-",
            weather: "-",
            temp_day: 0,
            temp_eve: 0,
            temp_night: 0,
            pressure: 0,
            humidity: 0,
        }))
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        currentFetcher.type === "init" &&
            currentFetcher.load(`/v1/current/${city || ""}`);

        currentFetcher.type === "done" && currentFetcher.data.message
            ? setError(currentFetcher.data.message)
            : setCurrent(currentFetcher.data);
    }, [currentFetcher, city]);

    useEffect(() => {
        forecastFetcher.type === "init" &&
            forecastFetcher.load(`/v1/forecast/${city || ""}`);

        forecastFetcher.type === "done" && forecastFetcher.data.message
            ? setError(forecastFetcher.data.message)
            : setForecast(forecastFetcher.data);
    }, [forecastFetcher, city]);

    useEffect(() => {
        if (currentFetcher.type === "load" || forecastFetcher.type === "load") {
            setLoading(true);
            setError("");
        }
        currentFetcher.type === "done" &&
            forecastFetcher.type === "done" &&
            setLoading(false);
    }, [currentFetcher, forecastFetcher]);

    return { current, forecast, loading, error };
};

export default useCity;
