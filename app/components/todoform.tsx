export const TodoForm = () => {
  return (
    <div className="mt-4">
      <form method="POST">
        <label htmlFor="todo" className="sr-only">
          Todo item
        </label>
        <input
          name="todo"
          id="todo"
          type="text"
          className="border-solid border-b border-green-500 placeholder-gray-600 placeholder-opacity-75 focus:outline-none focus:border-b-2"
          placeholder="Enter Todo"
          autoComplete="off"
        />
      </form>
    </div>
  );
};
