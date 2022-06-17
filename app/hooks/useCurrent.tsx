import { useState, useEffect } from "react";
import { useFetcher } from "@remix-run/react";

type ComponentProps = {
    city?: string;
};

const useCurrent = ({ city }: ComponentProps) => {
    const fetcher = useFetcher();
    const [current, setCurrent] = useState<Current>({
        date: "-",
        city: "-",
        country: "-",
        weather: "-",
        temp: 0,
        pressure: 0,
        humidity: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (fetcher.type === "init") {
            setLoading(true);
            setError("");
            fetcher.load(`/v1/current/${city ? city : ""}`);
        }
        if (fetcher.type === "done") {
            fetcher.data.message
                ? setError(fetcher.data.message)
                : setCurrent(fetcher.data);
            setLoading(false);
        }
    }, [fetcher, city]);

    return { current, loading, error };
};

export default useCurrent;
