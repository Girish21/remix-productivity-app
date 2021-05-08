import { Outlet } from "react-router-dom";
import {
  ActionFunction,
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
  useRouteData,
} from "remix";
import { TodoTracks } from "../components/todotracks";
import { prisma } from "../db";
import stylesUrl from "../styles/index.css";

export type RouteDataType = {
  name: string;
  selectedCount: number;
  totalCount: number;
}[];

export let meta: MetaFunction = () => {
  return {
    title: "Remix Todo app",
    description: "Simple todo app using Remix",
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader: LoaderFunction = async () => {
  const data = await prisma.track.findMany({
    select: { name: true, Todo: { select: { id: true, completed: true } } },
  });

  if (data.length === 0) return json([]);

  return json(
    data.map(({ name, Todo }) => {
      const selectedCount = Todo.reduce(
        (total, cur) => total + (cur.completed ? 1 : 0),
        0
      );
      const totalCount = Todo.length;

      return { name, selectedCount, totalCount };
    })
  );
};

export const action: ActionFunction = async ({ request }) => {
  const params = new URLSearchParams(await request.text());

  const trackName = params.get("track");

  if (!trackName) return redirect("/");

  await prisma.track.create({ data: { name: trackName, user_id: 1 } });

  return redirect(`/${trackName}`);
};

export default function Index() {
  const data = useRouteData<RouteDataType>();

  return (
    <main className="h-full grid grid-cols-[35ch,1fr] lg:grid-cols-[35ch,1fr,calc(100%-1400px)]">
      <TodoTracks tracks={data} />
      <Outlet />
    </main>
  );
}
