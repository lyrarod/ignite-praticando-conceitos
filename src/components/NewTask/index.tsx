import React, { ChangeEvent, FormEvent } from "react";
import { PlusCircle } from "phosphor-react";
import styles from "./newtask.module.css";

interface NewTaskProps {
  text: string;
  inputEl: React.MutableRefObject<HTMLInputElement>;
  onNewText: (e: ChangeEvent<HTMLInputElement>) => void;
  onCreateTodo: (e: FormEvent) => void;
}

export function NewTask({
  text,
  inputEl,
  onNewText,
  onCreateTodo,
}: NewTaskProps) {
  return (
    <form onSubmit={onCreateTodo} className={styles.container}>
      <input
        type={"text"}
        ref={inputEl}
        value={text}
        onChange={onNewText}
        placeholder="Adicione uma nova tarefa"
      />
      <button type="submit">
        Criar
        <PlusCircle size={20} />
      </button>
    </form>
  );
}
