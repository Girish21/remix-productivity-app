import { Todo } from ".prisma/client";
import { usePendingFormSubmit, useSubmit } from "remix";

export const TodoItem = ({ completed, id, todo }: Todo) => {
  const pendingForm = usePendingFormSubmit();
  const submit = useSubmit();

  return (
    <li className="flex space-x-3 items-center">
      {pendingForm && Number(pendingForm.data.get("id")) === id ? (
        <input
          type="checkbox"
          checked={pendingForm.data.get("checked") === "true"}
          disabled
          id={`${id}-${todo}`}
        />
      ) : (
        <input
          type="checkbox"
          id={`${id}-${todo}`}
          checked={completed}
          onChange={(e) => {
            submit(
              { checked: String(e.target.checked), id: String(id) },
              { replace: true, method: "put" }
            );
          }}
        />
      )}
      <label htmlFor={`${id}-${todo}`}>{todo}</label>
    </li>
  );
};
