import { Todo } from ".prisma/client";
import { usePendingFormSubmit, useSubmit } from "remix";
import { DeleteButton } from "./deletebutton";

export const TodoItem = ({ completed, id, todo }: Todo) => {
  const pendingForm = usePendingFormSubmit();
  const submit = useSubmit();

  const optimisticUpdate =
    pendingForm &&
    pendingForm.method === "put" &&
    Number(pendingForm.data.get("id")) === id;

  const optimisticDelete =
    pendingForm &&
    pendingForm.method === "delete" &&
    Number(pendingForm.data.get("id")) === id;

  return (
    <>
      {!optimisticDelete && (
        <li className="flex space-x-3 items-center">
          {pendingForm && optimisticUpdate ? (
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
          <DeleteButton todoId={id} />
        </li>
      )}
    </>
  );
};
