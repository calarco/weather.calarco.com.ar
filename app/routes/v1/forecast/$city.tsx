import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { getForecast } from "~/utils/getForecast.server";

export const loader: LoaderFunction = async ({ params }) => {
    const city = params.city;
    const forecast = await getForecast(city.split("_")[0], city.split("_")[1])
        .then((data) => {
            return json<Forecast>(data, 200);
        })
        .catch((error) => {
            return json<Error>(error, 400);
        });

    return forecast;
};
