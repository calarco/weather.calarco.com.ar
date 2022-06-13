import { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { City } from "~/components/City";

function Weather() {
    const [input, setInput] = useState("");
    const [inputCities, setInputCities] = useState([]);
    const [city, setCity] = useState("");
    const [cities, setCities] = useState([]);

    const handleInputChange = async (event) => {
        setInput(event.target.value);
        if (!event.target.value) return;

        const result = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=pk.eyJ1Ijoic2NhbGFyY28iLCJhIjoiY2w0YTh3cHVkMGUzczNibXoyNnY4YjhqZiJ9.9Bn2TItXzvs1Yt6njyMi_A&autocomplete=true&types=place`
        )
            .then((resp) => {
                return resp.json();
            })
            .catch((error) => {
                return error;
            });
        result.features &&
            !inputCities.includes(event.target.value) &&
            setInputCities(result.features.map((place) => place.place_name));
        result.features &&
            setCity(
                `${result.features[0].center[1]}_${result.features[0].center[0]}`
            );
    };

    function handleSubmit(event) {
        event.preventDefault();
        setCities((cities) => [...cities, city]);
        setInput("");
        setInputCities([]);
    }

    return (
        <main className="h-screen w-screen px-4 py-8 lg:p-8 overflow-auto grid gap-8 justify-center justify-items-center content-start text-center">
            <City className="bg-slate-50 shadow-lg dark:bg-gray-800" />
            <TransitionGroup component={null}>
                {cities.map((city, index) => (
                    <CSSTransition
                        key={index}
                        timeout={{
                            enter: 300,
                            exit: 150,
                        }}
                        classNames={{
                            enter: "opacity-0 max-h-0",
                            enterActive:
                                "opacity-1 max-h-[35rem] lg:max-h-[26rem] duration-300 ease-out transition-all",
                            exit: "opacity-1 max-h-[35rem] lg:max-h-[26rem]",
                            exitActive:
                                "opacity-0 max-h-0 duration-150 ease-in transition-all",
                        }}
                    >
                        <City city={city} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
            <form
                onSubmit={handleSubmit}
                className="rounded bg-slate-200 shadow-md dark:bg-neutral-800"
            >
                <input
                    list="cities"
                    name="input"
                    value={input}
                    onChange={handleInputChange}
                    pattern={inputCities.join("|")}
                    placeholder="Ciudades"
                    autoComplete="off"
                    required
                    className="input"
                />
                <datalist id="cities">
                    {inputCities.map((city, index) => (
                        <option key={index}>{city}</option>
                    ))}
                </datalist>
                <button type="submit" className="button">
                    Agregar
                </button>
            </form>
        </main>
    );
}

export default Weather;
