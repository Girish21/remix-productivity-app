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

export let loader: LoaderFunction = async ({ params }) => {
  const rows = await prisma.todo.findMany({
    where: { track_name: String(params.slug) },
    orderBy: { id: "asc" },
  });
  return json(rows);
};

export const action: ActionFunction = async ({ request }) => {
  const params = new URLSearchParams(await request.text());

  switch (request.method.toLowerCase()) {
    case "put": {
      const todoId = params.get("id");
      const todoStatus = params.get("checked");

      if (!todoId) return redirect("/");

      await prisma.todo.update({
        where: { id: Number(todoId) },
        data: { completed: todoStatus === "true" },
      });

      return redirect("/");
    }
    case "post": {
      const todo = params.get("todo");

      if (!todo) {
        return redirect("/");
      }

      await prisma.todo.create({ data: { todo, track_name: "test" } });

      return redirect("/");
    }
    case "delete": {
      const todoId = params.get("id");

      if (!todoId) return redirect("/");

      await prisma.todo.delete({ where: { id: Number(todoId) } });

      return redirect("/");
    }
    default:
      redirect("/", { status: 404 });
  }
  return redirect("/");
};

export default function Index() {
  const data = useRouteData<Todo[]>();

  return (
    <section className="col-start-2 col-end-3 p-4 h-full">
      <h1 className="text-4xl text-center">Todo's</h1>
      <TodoList todos={data} />
      <TodoForm />
    </section>
  );
}
