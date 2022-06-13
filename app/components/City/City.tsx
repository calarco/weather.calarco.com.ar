import { CSSTransition } from "react-transition-group";

import { Current } from "~/components/Current";
import { Forecast } from "~/components/Forecast";
import useCurrent from "~/hooks/useCurrent";
import useForecast from "~/hooks/useForecast";

type ComponentProps = {
    city?: string;
    className?: string;
};

const City = function ({ city, className }: ComponentProps) {
    const { current, loading: loadingCurrent } = useCurrent({ city });
    const { forecast, loading: loadingForecast } = useForecast({ city });

    return (
        <section
            className={`section relative h-[35rem] lg:h-[26rem] ${className}`}
        >
            <Current data={current} />
            <Forecast data={forecast} />
            <CSSTransition
                in={loadingCurrent || loadingForecast}
                unmountOnExit
                timeout={{
                    enter: 300,
                    exit: 150,
                }}
                classNames={{
                    enter: "opacity-0",
                    enterActive:
                        "opacity-1 duration-300 ease-out transition-all",
                    exit: "opacity-1",
                    exitActive: "opacity-0 duration-150 ease-in transition-all",
                }}
            >
                <div className="absolute inset-0 rounded bg-slate-200 grid items-center dark:bg-neutral-800" />
            </CSSTransition>
        </section>
    );
};

export default City;
