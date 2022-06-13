import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getClientIPAddress } from "remix-utils";

import { getForecast } from "~/utils/getForecast.server";

export const loader: LoaderFunction = async ({ request }) => {
    let ipAddress = getClientIPAddress(request);
    console.log(ipAddress);
    const location = await fetch(`http://localhost:3000/v1/location`)
        .then((resp) => {
            return resp.json();
        })
        .catch((error) => {
            return error;
        });

    return json<Forecast>(await getForecast(location.lat, location.lon), 200);
};
