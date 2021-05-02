import { Todo } from ".prisma/client";

export const TodoItem = ({ todo }: Todo) => {
  return (
    <li className='list-none'>
      <h6>{todo}</h6>
    </li>
  );
};
