import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Tasks } from "./components/Tasks";
import { Header } from "./components/Header";
import { NewTask } from "./components/NewTask";

import { data } from "./data";

export interface Todos {
  id: number;
  text: string;
  isCompleted: boolean;
}

const getTodosLocalStorage = () => {
  const todos = localStorage.getItem("@Todos");
  return todos ? JSON.parse(todos) : data;
};

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todos[]>(getTodosLocalStorage);
  const inputEl = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    localStorage.setItem("@Todos", JSON.stringify(todos));
  }, [todos]);

  const handleCreateTodo = (e: FormEvent) => {
    e.preventDefault();
    inputEl.current.focus();
    const cleanText = text.trim();
    setText("");

    if (!cleanText) return;

    const newTodo = {
      id: Date.now(),
      text: cleanText,
      isCompleted: false,
    };

    setTodos((prevState) => [newTodo, ...prevState]);
    console.log("createTodo", newTodo);
  };

  const handleDeleteTodo = (id: number) => {
    const filterTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filterTodos);
    console.log("deleteTodo", id);
  };

  const handleNewText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleIsCompleted = (id: number) => {
    setTodos((prevState) => [
      ...prevState.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }
        return {
          ...todo,
        };
      }),
    ]);
  };

  return (
    <>
      <Header />

      <NewTask
        text={text}
        inputEl={inputEl}
        onNewText={handleNewText}
        onCreateTodo={handleCreateTodo}
      />

      <Tasks
        todos={todos}
        onDeleteTodo={handleDeleteTodo}
        onIsCompleted={handleIsCompleted}
      />
    </>
  );
}

export default App;
