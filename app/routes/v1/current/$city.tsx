import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { getCurrent } from "~/utils/getCurrent.server";

export const loader: LoaderFunction = async ({ params }) => {
    const city = params.city;
    const current = await getCurrent(city.split("_")[0], city.split("_")[1])
        .then((data) => {
            return json<Current>(data, 200);
        })
        .catch((error) => {
            return json<Error>(error, 400);
        });

    return current;
};
