import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { getLocation } from "~/utils/getLocation.server";

export const loader: LoaderFunction = async ({ params }) => {
    const ip = params.ip;
    const location = await getLocation(ip)
        .then((data) => {
            return json<Location>(data, 200);
        })
        .catch((error) => {
            return json(error, 400);
        });

    return location;
};
