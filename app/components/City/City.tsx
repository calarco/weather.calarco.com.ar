import { Link } from "@remix-run/react";
import { CSSTransition } from "react-transition-group";

import { Current } from "./Current";
import { Forecast } from "./Forecast";
import useCurrent from "~/hooks/useCurrent";
import useForecast from "~/hooks/useForecast";

type ComponentProps = {
    city?: string;
    remove?: string;
    className?: string;
};

const City = function ({ city, remove, className }: ComponentProps) {
    const {
        current,
        loading: loadingCurrent,
        error: errorCurrent,
    } = useCurrent({ city });
    const {
        forecast,
        loading: loadingForecast,
        error: errorForecast,
    } = useForecast({ city });

    return (
        <section
            className={`relative rounded grid divide-y divide-gray-900/10 dark:divide-gray-100/10 ${
                city
                    ? "outline outline-1 outline-gray-900/10 dark:outline-gray-100/10"
                    : "bg-slate-50 shadow-md dark:bg-gray-800"
            } ${className}`}
        >
            <Current data={current} />
            <Forecast data={forecast} />
            <CSSTransition
                in={
                    loadingCurrent ||
                    loadingForecast ||
                    errorCurrent ||
                    errorForecast
                        ? true
                        : false
                }
                unmountOnExit
                timeout={{
                    enter: 300,
                    exit: 200,
                }}
                classNames={{
                    enter: "opacity-0",
                    enterActive:
                        "opacity-1 transition-opacity duration-300 ease-out",
                    exit: "opacity-1",
                    exitActive:
                        "opacity-0 transition-opacity duration-200 ease-in",
                }}
            >
                <div className="absolute inset-0 rounded bg-slate-100 grid items-center dark:bg-neutral-800">
                    {errorCurrent || errorForecast ? (
                        <p className="grid gap-4 text-red-500/70 text-2xl">
                            <label className="font-mono text-red-500 dark:text-red-500">
                                error
                            </label>
                            {errorCurrent || errorForecast}
                        </p>
                    ) : (
                        <p className="animate-spin text-teal-600 dark:text-amber-500/80 text-3xl">
                            &#9964;
                        </p>
                    )}
                </div>
            </CSSTransition>
            {remove && (
                <Link to={remove} className="button absolute top-4 right-4">
                    &#9932;
                </Link>
            )}
        </section>
    );
};

export default City;
