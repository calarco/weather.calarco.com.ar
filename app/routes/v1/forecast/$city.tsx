import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { getForecast } from "~/utils/getForecast.server";

export const loader: LoaderFunction = async ({ params }) => {
    const city = params.city;

    return json(await getForecast(city.split("_")[0], city.split("_")[1]), 200);
};
