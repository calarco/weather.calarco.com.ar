type ComponentProps = {
    data: Current;
};

const Current = function ({ data }: ComponentProps) {
    return (
        <article className="article grid-cols-2 lg:grid-cols-none lg:grid-flow-col">
            <p className="col-span-2 text-2xl text-sky-700 dark:text-sky-500/80">
                {data.city}
            </p>
            <div className="col-span-2 lg:col-span-1 grid font-mono">
                <label className="text-sky-700/70 dark:text-gray-100/50">
                    {new Date(data.date)
                        .toLocaleDateString("default", {
                            month: "short",
                        })
                        .substring(0, 3)
                        .toUpperCase()}{" "}
                    {data.date.substring(0, 4)}
                </label>
                <p className="text-xl text-sky-700">
                    {data.date.substring(8, 10)}
                </p>
            </div>
            <div className="grid ">
                <label className="label">Tiempo</label>
                <p className="">{data.weather}</p>
            </div>
            <div className="grid ">
                <label className="label">Temperatura</label>
                <p className="font-mono">{parseInt(data.temp)}°</p>
            </div>
            <div className="grid ">
                <label className="label">Humedad</label>
                <p className="font-mono">{data.humidity}%</p>
            </div>
            <div className="grid ">
                <label className="label">Presion</label>
                <p className="font-mono">{data.pressure}hPa</p>
            </div>
        </article>
    );
};

export default Current;
