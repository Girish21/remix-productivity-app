import { Todo } from ".prisma/client";
import { TodoItem } from "./todoitem";

export const TodoList = ({ todos }: { todos: Todo[] }) => {
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
