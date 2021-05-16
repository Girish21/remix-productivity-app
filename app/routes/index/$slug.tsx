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
import { commitSession, getSession, getUserSession } from "../../session";

type RouteData = {
  data: Todo[];
  error: Record<string, Record<string, string>>;
};

export let loader: LoaderFunction = async ({ params, request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user_id = await getUserSession(request);

  const track_id = await prisma.track.findUnique({
    select: { id: true },
    where: { name_user_id: { user_id, name: params.slug } },
  });
  if (!track_id) {
    return redirect("/");
  }

  const { id } = track_id;

  const rows = await prisma.todo.findMany({
    where: { track_id: id },
    orderBy: { created_at: "asc" },
  });
  return json({ data: rows, error: session.get("creation_error") });
};

export const action: ActionFunction = async ({
  request,
  params: routeParams,
}) => {
  const params = new URLSearchParams(await request.text());
  const session = await getSession(request.headers.get("Cookie"));
  const user_id = await getUserSession(request);

  const track_id = await prisma.track.findUnique({
    select: { id: true },
    where: { name_user_id: { user_id, name: routeParams.slug } },
  });
  if (!track_id) {
    return redirect("/");
  }

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
        data: { todo, track_id: track_id.id, user_id },
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
