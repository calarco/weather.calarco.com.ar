import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getClientIPAddress } from "remix-utils";

export const loader: LoaderFunction = async ({ request }) => {
    let ipAddress = getClientIPAddress(request);
    const data = await fetch(
        `http://ip-api.com/json/${
            ipAddress ? ipAddress : ""
        }?lang=es&fields=49361`
    )
        .then((resp) => {
            return resp.json();
        })
        .catch((error) => {
            return error;
        });
    return json(data, 200);
};
