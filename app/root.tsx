import type { MetaFunction, LinksFunction } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import tailwindStyles from "./tailwind.css";
import globalStyles from "~/styles/global.css";

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Pronóstico del tiempo",
    description: "Consulte el pronóstico del tiempo por ciudades",
    viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
    {
        rel: "stylesheet",
        href: globalStyles,
    },
    { rel: "stylesheet", href: tailwindStyles },
];

export default function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body className="h-screen w-screen overflow-clip select-none bg-slate-200 text-gray-900/80 font-sans dark:bg-neutral-900 dark:text-gray-100/70">
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
