import { Outlet } from "react-router-dom";
import { Link, LinksFunction, MetaFunction } from "remix";
import stylesUrl from "../styles/index.css";

export let meta: MetaFunction = () => {
  return {
    title: "Remix Todo app",
    description: "Simple todo app using Remix",
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Index() {
  return (
    <main className="p-4 grid grid-cols-[calc(100%-1400px),1fr,calc(100%-1400px)]">
      <div className="col-start-1 col-end-2 bg-red-300 h-96">
        <Link to='test'>Test</Link>
      </div>
      <Outlet />
    </main>
  );
}
