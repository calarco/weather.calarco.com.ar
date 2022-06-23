import { useState } from "react";
import { useSearchParams } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { SwitchTransition, CSSTransition } from "react-transition-group";

type InputCities = {
    name: string;
    country: string;
    city: string;
};

function Search() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);
    const [inputCities, setInputCities] = useState<InputCities>([]);
    const [searchParams] = useSearchParams();
    const cities = searchParams.getAll("city");

    const handleInputChange = async (event) => {
        setInput(event.target.value);
        if (event.target.value) {
            setLoading(true);
            const search = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${event.target.value}&limit=5&appid=16749c9e1696ec7dcf1cde3c8d8317c7`
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
            setLoading(false);
        } else {
            setInputCities([]);
        }
    };

    return (
        <nav className="col-start-2 sticky top-0 z-30 w-full max-w-[30rem] h-[3.5rem] grid">
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
                <button
                    type="button"
                    onClick={() => setInput("")}
                    className="button absolute right-2 top-2 bottom-2 z-50 pt-0 pb-1"
                >
                    &#9932;
                </button>
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
                <div className="absolute top-full left-2 right-2 h-[17.5rem] rounded-b-xl overflow-clip bg-slate-300/70 dark:bg-neutral-800/70 backdrop-blur shadow-lg">
                    <SwitchTransition mode="in-out">
                        <CSSTransition
                            key={loading ? 0 : !inputCities[0] ? 1 : 2}
                            unmountOnExit
                            timeout={150}
                            classNames={{
                                enter: "opacity-0",
                                enterActive:
                                    "opacity-1 transition duration-150",
                                exit: "opacity-1",
                                exitActive: "opacity-0 transition duration-150",
                            }}
                        >
                            <div className="absolute inset-0 grid grid-rows-5">
                                {loading ? (
                                    <div className="row-span-5 grid items-center">
                                        <p className="animate-spin text-teal-600 dark:text-amber-500/80 text-3xl">
                                            &#9964;
                                        </p>
                                    </div>
                                ) : !inputCities[0] ? (
                                    <p className="label row-span-5 grid items-center">
                                        Sin resultados
                                    </p>
                                ) : (
                                    inputCities.map((city, index) => (
                                        <Link
                                            key={index}
                                            to={`?city=${city.city}${
                                                cities[0]
                                                    ? "&city=" +
                                                      cities.join("&city=")
                                                    : ""
                                            }`}
                                            onClick={() => setInput("")}
                                            className="px-6 py-2 hover:bg-teal-400/20 flex items-center text-left text-teal-600 dark:text-amber-500 lg:text-lg hover:cursor-pointer"
                                        >
                                            {city.name}{" "}
                                            <small className="label pl-2 font-mono">
                                                {city.country}
                                            </small>
                                        </Link>
                                    ))
                                )}
                            </div>
                        </CSSTransition>
                    </SwitchTransition>
                </div>
            </CSSTransition>
        </nav>
    );
}

export default Search;
