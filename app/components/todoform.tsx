import * as React from "react";
import { Form, usePendingFormSubmit } from "remix";

export const TodoForm = () => {
  const pendingState = usePendingFormSubmit();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }, [pendingState]);

  return (
    <div className="mt-4">
      <Form method="post" name="todo_form">
        <label htmlFor="todo" className="sr-only">
          Todo item
        </label>
        <input
          ref={inputRef}
          name="todo"
          id="todo"
          type="text"
          className="border-solid border-b border-green-500 placeholder-gray-600 placeholder-opacity-75 focus:outline-none focus:border-b-2"
          placeholder="Enter Todo"
          autoComplete="off"
          disabled={!!pendingState}
        />
      </Form>
    </div>
  );
};
