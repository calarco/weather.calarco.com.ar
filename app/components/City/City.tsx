import { Link } from "@remix-run/react";
import { SwitchTransition, CSSTransition } from "react-transition-group";

import { Current } from "./Current";
import { Forecast } from "./Forecast";
import useCity from "~/utils/useCity";

type ComponentProps = {
    city?: string;
    remove?: string;
    className?: string;
};

function City({ city, remove, className }: ComponentProps) {
    const { current, forecast, loading, error } = useCity({ city });

    return (
        <section
            className={`col-start-2 relative justify-self-stretch h-[34rem] lg:h-[26rem] rounded-xl ${
                city
                    ? "outline outline-1 outline-gray-900/10 dark:outline-gray-100/10"
                    : "bg-slate-50 shadow-md dark:bg-gray-800"
            } ${className}`}
        >
            <SwitchTransition>
                <CSSTransition
                    key={loading ? 0 : error ? 1 : 2}
                    timeout={{
                        enter: 200,
                        exit: 150,
                    }}
                    classNames={{
                        enter: "opacity-0",
                        enterActive:
                            "opacity-1 transition duration-200 ease-out",
                        exit: "opacity-1",
                        exitActive: "opacity-0 transition duration-150 ease-in",
                    }}
                >
                    {loading ? (
                        <div className="w-full h-full p-8 grid items-center">
                            <p className="animate-spin text-teal-600 dark:text-amber-500/80 text-3xl">
                                &#9964;
                            </p>
                        </div>
                    ) : error ? (
                        <div className="w-full h-full p-8 grid items-center content-center gap-8">
                            <label className="font-mono text-2xl text-red-500 dark:text-red-500">
                                error
                            </label>
                            <p className="text-lg text-red-500/70">{error}</p>
                        </div>
                    ) : (
                        <div className="w-full h-full grid grid-rows-[1fr,1fr] lg:grid-rows-[1fr,2fr] divide-y divide-gray-900/10 dark:divide-gray-100/10">
                            <Current data={current} />
                            <Forecast data={forecast} />
                        </div>
                    )}
                </CSSTransition>
            </SwitchTransition>
            {remove && (
                <Link to={remove} className="button absolute top-3 right-6">
                    &#9932;
                </Link>
            )}
        </section>
    );
}

export default City;
