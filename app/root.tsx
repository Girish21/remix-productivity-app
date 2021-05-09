import { Outlet } from "react-router-dom";
import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  MetaFunction,
  Scripts,
} from "remix";
import tailwindUrl from "./styles/app.css";
import stylesUrl from "./styles/global.css";

export const meta: MetaFunction = () => {
  return {
    viewport: "width=device-width,initial-scale=1,viewport-fit=cover",
  };
};

export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindUrl },
    { rel: "stylesheet", href: stylesUrl },
  ];
};

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}

        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  );
}
