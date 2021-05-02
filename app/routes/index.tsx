import { Todo } from ".prisma/client";
import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "remix";
import { json, redirect, useRouteData } from "remix";
import { TodoForm } from "../components/todoform";
import { TodoList } from "../components/todolist";
import { prisma } from "../db";
import stylesUrl from "../styles/index.css";

export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let loader: LoaderFunction = async () => {
  const rows = await prisma.todo.findMany({ orderBy: { id: "asc" } });
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

      await prisma.todo.create({ data: { todo } });

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
    <main className="p-4 grid grid-cols-[calc(100%-1400px),1fr,calc(100%-1400px)]">
      <section className="col-start-2 col-end-3 p-4 h-full">
        <h1 className="text-4xl text-center">Todo's</h1>
        <TodoList todos={data} />
        <TodoForm />
      </section>
    </main>
  );
}
