import { Todo } from ".prisma/client";
import {
  ActionFunction,
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
  useRouteData,
} from "remix";
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
  const rows = await prisma.todo.findMany();
  return json(rows);
};

export const action: ActionFunction = async ({ request }) => {
  const params = new URLSearchParams(await request.text());
  const todo = params.get("todo")!;

  await prisma.todo.create({ data: { todo } });

  return redirect("/");
};

export default function Index() {
  const data = useRouteData<Todo[]>();
  return (
    <main className="p-4 grid grid-cols-[calc(100%-1400px),1fr,calc(100%-1400px)]">
      <div className="col-start-2 col-end-3 p-4 h-full">
        <h1 className="text-4xl text-center">Todo's</h1>
        <section>
          <TodoList todos={data} />
          <TodoForm />
        </section>
      </div>
    </main>
  );
}
