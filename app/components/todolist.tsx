import { Todo } from ".prisma/client";
import { usePendingFormSubmit } from "remix";
import { TodoItem } from "./todoitem";

export const TodoList = ({ todos }: { todos: Todo[] }) => {
  const pendingState = usePendingFormSubmit();

  todos = [
    ...todos,
    ...((pendingState &&
      pendingState.method === "post" &&
      pendingState.data.get("todo") && [
        {
          todo: (pendingState.data.get("todo") as string)!,
          id: todos.length,
          completed: false,
          created_at: new Date(),
          track_name: "",
        },
      ]) ||
      []),
  ];

  return (
    <>
      {todos.length > 0 && (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ul>
      )}
    </>
  );
};
