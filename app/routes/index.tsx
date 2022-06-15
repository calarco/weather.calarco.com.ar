import { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { City } from "~/components/City";
import { Search } from "~/components/Search";

function Weather() {
    const [cities, setCities] = useState([]);

    const handleRemove = (city: string) => {
        var array = [...cities];
        var index = array.indexOf(city);
        if (index !== -1) {
            array.splice(index, 1);
            setCities(array);
        }
    };

    return (
        <main className="h-full w-full py-8 px-4 lg:p-8 overflow-auto grid gap-10 lg:gap-8 justify-center justify-items-center content-start text-center">
            <Search setCities={setCities} />
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
                            enter: "opacity-0 -translate-y-4",
                            enterActive:
                                "opacity-1 transition duration-300 ease-out",
                            exit: "opacity-1",
                            exitActive:
                                "opacity-0 scale-95 transition duration-200 ease-in",
                        }}
                    >
                        <City city={city} remove={() => handleRemove(city)} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </main>
    );
}

export default Weather;
