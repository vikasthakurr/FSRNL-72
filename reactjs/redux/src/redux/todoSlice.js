import { createSlice, nanoid } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: nanoid(),
        text: action.payload.text,
        completed: false,
      };
      state.push(newTodo);
    },
    updateTodo: (state, action) => {
      const todo = state.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      return state.filter((t) => t.id !== action.payload.id);
    },
    removeAll: () => {
      return [];
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, removeAll } = todoSlice.actions;

export default todoSlice.reducer;
