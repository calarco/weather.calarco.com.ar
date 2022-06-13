type ComponentProps = {
    data: Forecast;
};

const Forecast = function ({ data }: ComponentProps) {
    return (
        <div className="p-8 pt-px overflow-x-auto grid">
            <div className="min-w-max rounded outline outline-1 outline-gray-900/10 divide-x divide-gray-900/10 grid grid-cols-5 gap-4 dark:outline-gray-100/10 dark:divide-gray-100/10">
                {data?.map((day, index) => (
                    <article key={index} className="article w-60">
                        <div className="grid font-mono">
                            <label className="text-sky-700/70 dark:text-gray-100/50">
                                {new Date(day.date)
                                    .toLocaleDateString("default", {
                                        month: "short",
                                    })
                                    .substring(0, 3)
                                    .toUpperCase()}{" "}
                                {day.date.substring(0, 4)}
                            </label>
                            <p className="text-xl text-sky-700">
                                {day.date.substring(8, 10)}
                            </p>
                        </div>
                        <div className="grid ">
                            <label className="label">Tiempo</label>
                            <p className="">{day.weather}</p>
                        </div>
                        <div className="grid grid-flow-col auto-cols-fr">
                            <div className="grid ">
                                <label className="label">Mañana</label>
                                <p className="font-mono">
                                    {parseInt(day.temp_day)}°
                                </p>
                            </div>
                            <div className="grid ">
                                <label className="label">Tarde</label>
                                <p className="font-mono">
                                    {parseInt(day.temp_eve)}°
                                </p>
                            </div>
                            <div className="grid ">
                                <label className="label">Noche</label>
                                <p className="font-mono">
                                    {parseInt(day.temp_night)}°
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-flow-col auto-cols-fr">
                            <div className="grid ">
                                <label className="label">Humedad</label>
                                <p className="font-mono">{day.humidity}%</p>
                            </div>
                            <div className="grid ">
                                <label className="label">Presion</label>
                                <p className="font-mono">{day.pressure}hPa</p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Forecast;
