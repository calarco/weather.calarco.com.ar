import { useState, useEffect } from "react";
import { useFetcher } from "@remix-run/react";

type ComponentProps = {
    city?: string;
};

const useForecast = ({ city }: ComponentProps) => {
    const fetcher = useFetcher();
    const [forecast, setForecast] = useState<Forecast>([
        {
            date: "",
            weather: "",
            temp_day: 0,
            temp_eve: 0,
            temp_night: 0,
            pressure: 0,
            humidity: 0,
        },
    ]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (fetcher.type === "init") {
            setLoading(true);
            fetcher.load(`/v1/forecast/${city ? city : ""}`);
        }
        if (fetcher.type === "done") {
            setForecast(fetcher.data);
            setLoading(false);
        }
    }, [fetcher, city]);

    return { forecast, loading, error };
};

export default useForecast;
