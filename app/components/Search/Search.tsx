import { useState } from "react";
import { CSSTransition } from "react-transition-group";

type ComponentProps = {
    setCities: (cities: string[]) => void;
};

type InputCities = {
    name: string;
    country: string;
    city: string;
};

const Search = function ({ setCities }: ComponentProps) {
    const [input, setInput] = useState("");
    const [inputCities, setInputCities] = useState<InputCities>([]);

    const handleInputChange = async (event) => {
        setInput(event.target.value);
        if (!event.target.value) return;

        const search = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${event.target.value}&limit=5&appid=16749c9e1696ec7dcf1cde3c8d8317c7`
        )
            .then((resp) => {
                return resp.json();
            })
            .catch((error) => {
                return error;
            });
        search[0]
            ? !inputCities.includes(event.target.value) &&
              setInputCities(
                  search.map((place) => {
                      return {
                          name: place.local_names?.es
                              ? place.local_names.es
                              : place.name,
                          country: place.country,
                          city: place.lat + "_" + place.lon,
                      };
                  })
              )
            : setInputCities([]);
    };

    const handleAdd = (city: string) => {
        setCities((cities) => [city, ...cities]);
        setInput("");
        setInputCities([]);
    };

    return (
        <form className="sticky top-0 z-30 w-full max-w-[30rem] h-[3.5rem] grid">
            <input
                type="text"
                name="input"
                value={input}
                onChange={handleInputChange}
                placeholder="Buscar ciudades"
                autoComplete="off"
                className="input z-40"
            />
            <CSSTransition
                in={input !== ""}
                unmountOnExit
                timeout={{
                    enter: 200,
                    exit: 150,
                }}
                classNames={{
                    enter: "opacity-0 -translate-y-4",
                    enterActive: "opacity-1 transition duration-200 ease-out",
                    exit: "opacity-1",
                    exitActive:
                        "opacity-0 -translate-y-4 transition duration-150 ease-in",
                }}
            >
                <div className="absolute top-[3.5rem] left-0 right-0 h-[17.5rem] rounded-b overflow-clip bg-slate-300/70 dark:bg-neutral-800/70 backdrop-blur shadow-lg grid grid-rows-5">
                    {inputCities.map((city, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => handleAdd(city.city)}
                            className="px-6 py-2 hover:bg-teal-400/20 text-left text-teal-600 dark:text-amber-500 lg:text-lg hover:cursor-pointer"
                        >
                            {city.name}{" "}
                            <small className="label">{city.country}</small>
                        </button>
                    ))}
                </div>
            </CSSTransition>
            <CSSTransition
                in={input !== ""}
                unmountOnExit
                timeout={{
                    enter: 200,
                    exit: 150,
                }}
                classNames={{
                    enter: "opacity-0 -translate-y-4",
                    enterActive: "opacity-1 transition duration-200 ease-out",
                    exit: "opacity-1",
                    exitActive:
                        "opacity-0 -translate-y-4 transition duration-150 ease-in",
                }}
            >
                <button
                    type="button"
                    onClick={() => setInput("")}
                    className="button absolute right-2 top-2 bottom-2 z-50"
                >
                    Borrar
                </button>
            </CSSTransition>
        </form>
    );
};

export default Search;
