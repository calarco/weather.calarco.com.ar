import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getClientIPAddress } from "remix-utils";

import { getLocation } from "~/utils/getLocation.server";

export const loader: LoaderFunction = async ({ request }) => {
    const ip = getClientIPAddress(request) || "";
    const location = await getLocation(ip)
        .then((data) => {
            return json<Location>(data, 200);
        })
        .catch((error) => {
            return json<Error>(error, 400);
        });

    return location;
};
