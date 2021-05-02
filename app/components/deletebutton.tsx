import * as React from "react";
import { Form } from "remix";

type DeleteButtonType = {
  todoId: number;
} & React.HTMLAttributes<HTMLButtonElement>;

export const DeleteButton = React.forwardRef<
  HTMLButtonElement,
  DeleteButtonType
>(({ todoId, ...rest }, ref) => {
  return (
    <Form method="delete" replace>
      <input type="hidden" name="id" value={todoId} />
      <button
        type="submit"
        ref={ref}
        className="rounded-full w-6 h-6 p-1 bg-red-500 fill-current text-white grid place-content-center focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-red-300"
        aria-label="delete action"
        {...rest}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </Form>
  );
});
