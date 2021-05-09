import { Todo } from ".prisma/client";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
  useRouteData,
} from "remix";
import { TodoForm } from "../../components/todoform";
import { TodoList } from "../../components/todolist";
import { prisma } from "../../db";
import { commitSession, getSession } from "../../session";

type RouteData = {
  data: Todo[];
  error: Record<string, Record<string, string>>;
};

export let loader: LoaderFunction = async ({ params, request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const validSlug = await prisma.track.findUnique({
    where: { name: String(params.slug) },
  });

  if (!validSlug)
    return redirect("/", {
      headers: { "Set-Cookie": await commitSession(session) },
    });

  const rows = await prisma.todo.findMany({
    where: { track_name: String(params.slug) },
    orderBy: { created_at: "asc" },
  });
  return json(
    { data: rows, error: session.get("creation_error") },
    { headers: { "Set-Cookie": await commitSession(session) } }
  );
};

export const action: ActionFunction = async ({
  request,
  params: routeParams,
}) => {
  const params = new URLSearchParams(await request.text());
  const session = await getSession(request.headers.get("Cookie"));

  switch (request.method.toLowerCase()) {
    case "put": {
      const todoId = params.get("id");
      const todoStatus = params.get("checked");

      if (!todoId) return redirect(`/${routeParams.slug}`);

      await prisma.todo.update({
        where: { id: Number(todoId) },
        data: { completed: todoStatus === "true" },
      });

      return redirect(`/${routeParams.slug}`);
    }
    case "post": {
      const todo = params.get("todo");

      if (!todo) {
        session.flash("creation_error", {
          error: "Enter a valid Todo item",
          value: { todo },
        });
        return redirect(`/${routeParams.slug}`, {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        });
      }

      await prisma.todo.create({
        data: { todo, track_name: routeParams.slug },
      });

      return redirect(`/${routeParams.slug}`);
    }
    case "delete": {
      const todoId = params.get("id");

      if (!todoId) return redirect(`/${routeParams.slug}`);

      await prisma.todo.delete({ where: { id: Number(todoId) } });

      return redirect(`/${routeParams.slug}`);
    }
    default:
      redirect(`/${routeParams.slug}`, { status: 404 });
  }
  return redirect(`/${routeParams.slug}`);
};

export default function Index() {
  const { data, error } = useRouteData<RouteData>();

  return (
    <section className="col-start-2 col-end-3 p-4 h-full">
      <h1 className="text-4xl text-center">Todo's</h1>
      <TodoList todos={data} />
      <TodoForm error={error} />
    </section>
  );
}
