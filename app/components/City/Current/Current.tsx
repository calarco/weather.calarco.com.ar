type ComponentProps = {
    data: Current;
};

function Current({ data }: ComponentProps) {
    return (
        <article className="grid auto-cols-fr items-center content-evenly lg:grid-cols-5">
            <p className="col-span-3 lg:col-span-5 px-4 text-teal-500 font-bold text-2xl dark:text-amber-500">
                {data.city}{" "}
                <small className="label pl-2 font-mono">{data.country}</small>
            </p>
            <div className="col-span-3 lg:col-span-1">
                <label className="text-sky-700/70 dark:text-sky-400/50">
                    {new Date(data.date)
                        .toLocaleDateString("default", {
                            month: "long",
                        })
                        .toUpperCase() +
                        " " +
                        data.date.substring(0, 4)}
                </label>
                <p className="text-xl font-mono capitalize text-sky-700 dark:text-sky-400/80">
                    {new Date(data.date).toLocaleDateString("default", {
                        weekday: "long",
                    }) +
                        " " +
                        data.date.substring(8, 10)}
                </p>
            </div>
            <div className="col-span-3 lg:col-span-1">
                <label className="label">Pronóstico</label>
                <p className="font-mono">{data.weather}</p>
            </div>
            <div>
                <label className="label">Temperatura</label>
                <p className="font-mono">{parseInt(data.temp)}°</p>
            </div>
            <div>
                <label className="label">Humedad</label>
                <p className="font-mono">{data.humidity}%</p>
            </div>
            <div>
                <label className="label">Presión</label>
                <p className="font-mono">{data.pressure}hPa</p>
            </div>
        </article>
    );
}

export default Current;
