import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, removeAll } from "./redux/todoSlice";

const AddTodo = () => {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  //logic

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleClick = () => {
    const text = todo.trim();
    if (!text) return;
    dispatch(addTodo({ text }));
    setTodo("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleClick();
  };

  const handleClear = () => {
    dispatch(removeAll());
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100">
      <h1 className="mb-4 text-center text-2xl font-bold text-gray-900">
        Add a Todo
      </h1>
      <div className="flex gap-2">
        <input
          value={todo}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Enter any task"
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
        <button
          onClick={handleClick}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95"
        >
          Add
        </button>
      </div>
      <button
        onClick={handleClear}
        className="mt-3 w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
      >
        Clear All
      </button>
    </div>
  );
};

export default AddTodo;
