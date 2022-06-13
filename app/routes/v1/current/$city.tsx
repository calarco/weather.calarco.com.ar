import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { getCurrent } from "~/utils/getCurrent.server";

export const loader: LoaderFunction = async ({ params }) => {
    const city = params.city;

    return json(await getCurrent(city.split("_")[0], city.split("_")[1]), 200);
};
