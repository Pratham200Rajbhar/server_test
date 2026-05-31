"use client";

import { useState, useEffect } from "react";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    if (!input.trim()) return;
    setTodos([
      ...todos,
      { id: crypto.randomUUID(), text: input.trim(), completed: false },
    ]);
    setInput("");
  }

  function toggleTodo(id: string) {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id: string) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  const completed = todos.filter((t) => t.completed).length;

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-xl flex-col gap-6 py-16 px-4">
        <h1 className="text-3xl font-bold tracking-tight">TODO</h1>

        <div className="flex gap-2">
          <input
            className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            placeholder="Add a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <button
            onClick={addTodo}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300"
          >
            Add
          </button>
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {completed} / {todos.length} completed
        </p>

        <ul className="flex flex-col gap-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 rounded-lg border border-zinc-200 px-4 py-3 dark:border-zinc-800"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="h-4 w-4 accent-zinc-900 dark:accent-zinc-100"
              />
              <span
                className={`flex-1 text-sm ${
                  todo.completed
                    ? "text-zinc-400 line-through dark:text-zinc-600"
                    : "text-zinc-900 dark:text-zinc-100"
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-sm text-zinc-400 transition-colors hover:text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
          {todos.length === 0 && (
            <p className="py-8 text-center text-sm text-zinc-400">
              No tasks yet. Add one above!
            </p>
          )}
        </ul>
      </main>
    </div>
  );
}
