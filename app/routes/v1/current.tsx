import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getClientIPAddress } from "remix-utils";

import { getLocation } from "~/utils/getLocation.server";
import { getCurrent } from "~/utils/getCurrent.server";

export const loader: LoaderFunction = async ({ request }) => {
    let ip = getClientIPAddress(request) || "";
    const location = await getLocation(ip);
    const current = await getCurrent(location.lat, location.lon)
        .then((data) => {
            return json<Current>(data, 200);
        })
        .catch((error) => {
            return json<Error>(error, 400);
        });

    return current;
};
