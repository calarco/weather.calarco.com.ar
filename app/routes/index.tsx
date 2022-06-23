import { useSearchParams } from "@remix-run/react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { City } from "~/components/City";
import { Search } from "~/components/Search";

function Weather() {
    const [searchParams] = useSearchParams();
    const cities = searchParams.getAll("city");

    const handleRemove = (city: string) => {
        if (cities[1]) {
            const array = [...cities];
            const index = array.indexOf(city);
            if (index !== -1) {
                array.splice(index, 1);
            }
            return "?city=" + array.join("&city=");
        } else {
            return "/";
        }
    };

    return (
        <main className="h-full w-full py-10 overflow-auto grid grid-cols-[auto,minmax(auto,80rem),auto] gap-y-10 gap-x-4 lg:gap-x-8 justify-items-center content-start text-center">
            <Search />
            <City />
            <TransitionGroup component={null}>
                {cities.map((city) => (
                    <CSSTransition
                        key={city}
                        timeout={{
                            enter: 300,
                            exit: 200,
                        }}
                        classNames={{
                            enter: "opacity-0 max-h-[0rem]",
                            enterActive:
                                "opacity-1 max-h-[34rem] lg:max-h-[26rem] transition-all duration-300 ease-out",
                            exit: "opacity-1",
                            exitActive:
                                "opacity-0 scale-95 transition duration-200 ease-in",
                        }}
                    >
                        <City city={city} remove={handleRemove(city)} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </main>
    );
}

export default Weather;
