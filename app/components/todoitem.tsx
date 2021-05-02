import { Todo } from ".prisma/client";

export const TodoItem = ({ todo }: Todo) => {
  return (
    <li>
      <h6>{todo}</h6>
    </li>
  );
};
