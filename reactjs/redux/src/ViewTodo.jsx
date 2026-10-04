import { useSelector, useDispatch } from "react-redux";
import { updateTodo, deleteTodo } from "./redux/todoSlice";

const ViewTodo = () => {
  const todos = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  if (todos.length === 0) {
    return (
      <div className="mx-auto mt-6 max-w-md rounded-2xl bg-white p-6 text-center text-sm text-gray-400 shadow-md ring-1 ring-gray-100">
        No todos yet. Add your first task above.
      </div>
    );
  }

  return (
    <div className="mx-auto mt-6 max-w-md rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100">
      <h2 className="mb-4 text-lg font-bold text-gray-900">
        Your Todos
        <span className="ml-2 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700">
          {todos.length}
        </span>
      </h2>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(updateTodo({ id: todo.id }))}
              className="h-4 w-4 cursor-pointer accent-indigo-600"
            />
            <span
              className={`flex-1 text-sm ${
                todo.completed ? "text-gray-400 line-through" : "text-gray-800"
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => dispatch(deleteTodo({ id: todo.id }))}
              className="rounded-md px-2 py-1 text-xs font-semibold text-red-500 transition hover:bg-red-50"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewTodo;
