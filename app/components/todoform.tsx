import * as React from "react";
import { Form, usePendingFormSubmit } from "remix";

export const TodoForm = ({
  error,
}: {
  error: Record<string, Record<string, string>>;
}) => {
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
      <Form method="post">
        <fieldset disabled={!!pendingState}>
          <label htmlFor="todo" className="sr-only">
            Todo item
          </label>
          <input
            {...(error && { "aria-errormessage": "todo-error" })}
            ref={inputRef}
            name="todo"
            id="todo"
            type="text"
            className={`border-solid border-b ${
              error ? "border-red-500" : "border-green-500"
            } placeholder-gray-600 placeholder-opacity-75 focus:outline-none focus:border-b-2`}
            placeholder="Enter Todo"
            autoComplete="off"
            disabled={!!pendingState}
            defaultValue={error?.value?.todo}
          />
          {error && (
            <p id="todo-error" className="text-red-600 text-sm">
              {error.error}
            </p>
          )}
        </fieldset>
      </Form>
    </div>
  );
};
