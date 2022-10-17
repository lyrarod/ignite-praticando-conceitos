import { Todos } from "../../App";
import { Check, ClipboardText, Trash } from "phosphor-react";

import styles from "./tasks.module.css";

interface TodosProps {
  todos: Todos[];
  onDeleteTodo: (id: number) => void;
  onIsCompleted: (id: number) => void;
}

export function Tasks({ todos, onDeleteTodo, onIsCompleted }: TodosProps) {
  const todosLength = todos?.length;
  const todosCompleted = todos?.filter((t) => t.isCompleted).length;

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div>
          Tarefas criadas <span className={styles.counter}>{todosLength}</span>
        </div>
        <div>
          <span style={{ color: "#8284FA" }}>Concluídas</span>
          <span className={styles.counter}>
            {todosLength > 0
              ? `${todosCompleted} de ${todosLength}`
              : todosLength}
          </span>
        </div>
      </div>

      <div className={styles.list}>
        {todos?.map((todo) => (
          <div key={todo.id} className={styles.tasks}>
            <button
              onClick={() => onIsCompleted(todo.id)}
              className={`${styles.btnCheckCompleted} ${
                todo.isCompleted && styles.completed
              }`}
            >
              {todo.isCompleted && <Check weight={"bold"} />}
            </button>
            <div
              className={`${styles.text} ${
                todo.isCompleted && styles.isCompleted
              }`}
            >
              {todo.text}
            </div>
            <button
              onClick={() => onDeleteTodo(todo.id)}
              className={styles.btnTrash}
            >
              <Trash className={styles.trashIcon} />
            </button>
          </div>
        ))}

        {todosLength <= 0 && (
          <div className={styles.empty}>
            <div className={styles.content}>
              <ClipboardText size={56} />
              <p>
                Você ainda não tem tarefas cadastradas
                <br />
                <span>Crie tarefas e organize seus itens a fazer</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
