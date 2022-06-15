import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getClientIPAddress } from "remix-utils";

import { getLocation } from "~/utils/getLocation.server";
import { getForecast } from "~/utils/getForecast.server";

export const loader: LoaderFunction = async ({ request }) => {
    let ip = getClientIPAddress(request) || "";
    const location = await getLocation(ip);
    const forecast = await getForecast(location.lat, location.lon)
        .then((data) => {
            return json<Forecast>(data, 200);
        })
        .catch((error) => {
            return json(error, 400);
        });

    return forecast;
};
