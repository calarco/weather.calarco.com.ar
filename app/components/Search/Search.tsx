import { useState } from "react";

type ComponentProps = {
    setCities: (cities: string[]) => void;
};

const Search = function ({ setCities }: ComponentProps) {
    const [input, setInput] = useState("");
    const [inputCities, setInputCities] = useState([]);
    const [inputCity, setInputCity] = useState("");

    const handleInputChange = async (event) => {
        setInput(event.target.value);
        if (!event.target.value) return;

        const search = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=pk.eyJ1Ijoic2NhbGFyY28iLCJhIjoiY2w0YTh3cHVkMGUzczNibXoyNnY4YjhqZiJ9.9Bn2TItXzvs1Yt6njyMi_A&autocomplete=true&types=place`
        )
            .then((resp) => {
                return resp.json();
            })
            .catch((error) => {
                return error;
            });
        search.features &&
            !inputCities.includes(event.target.value) &&
            setInputCities(search.features.map((place) => place.place_name));
        search.features[0].center &&
            setInputCity(
                `${search.features[0].center[1]}_${search.features[0].center[0]}`
            );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setCities((cities) => [inputCity, ...cities]);
        setInput("");
        setInputCities([]);
        setInputCity("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="sticky top-0 z-50 w-full max-w-[40rem] h-14 rounded bg-slate-300/70 dark:bg-neutral-800/70 backdrop-blur shadow-inner dark:shadow-lg grid"
        >
            <input
                list="cities"
                name="input"
                value={input}
                onChange={handleInputChange}
                pattern={inputCities.join("|")}
                required
                placeholder="Ciudades"
                autoComplete="off"
                className="input"
            />
            <datalist id="cities">
                {inputCities.map((city, index) => (
                    <option key={index}>{city}</option>
                ))}
            </datalist>
            <button
                type="submit"
                className="button absolute right-2 top-2 bottom-2"
            >
                Agregar
            </button>
        </form>
    );
};

export default Search;
