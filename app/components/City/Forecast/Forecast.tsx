type ComponentProps = {
    data: Forecast;
};

const Forecast = function ({ data }: ComponentProps) {
    return (
        <div className="overflow-x-auto grid">
            <div className="min-w-max divide-x divide-gray-900/10 grid grid-cols-5 dark:divide-gray-100/10">
                {data?.map((day, index) => (
                    <article
                        key={index}
                        className="w-60 px-8 py-4 grid auto-cols-fr items-center gap-y-4 gap-x-8"
                    >
                        <div className="col-span-6">
                            <label className="capitalize text-sky-700/70 dark:text-sky-400/50">
                                {new Date(day.date).toLocaleDateString(
                                    "default",
                                    {
                                        weekday: "long",
                                    }
                                )}
                            </label>
                            <p className="text-xl font-mono text-sky-700 dark:text-sky-400/80">
                                {day.date.substring(8, 10) || "-"}
                            </p>
                        </div>
                        <div className="col-span-6">
                            <label className="label">Pronostico</label>
                            <p className="font-mono">{day.weather}</p>
                        </div>
                        <div className="col-span-2">
                            <label className="label">Mañana</label>
                            <p className="font-mono">
                                {parseInt(day.temp_day)}°
                            </p>
                        </div>
                        <div className="col-span-2">
                            <label className="label">Tarde</label>
                            <p className="font-mono">
                                {parseInt(day.temp_eve)}°
                            </p>
                        </div>
                        <div className="col-span-2">
                            <label className="label">Noche</label>
                            <p className="font-mono">
                                {parseInt(day.temp_night)}°
                            </p>
                        </div>
                        <div className="col-span-3">
                            <label className="label">Humedad</label>
                            <p className="font-mono">{day.humidity}%</p>
                        </div>
                        <div className="col-span-3">
                            <label className="label">Presion</label>
                            <p className="font-mono">{day.pressure}hPa</p>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Forecast;
