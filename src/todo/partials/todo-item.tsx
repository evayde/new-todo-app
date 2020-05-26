import React, { FC } from "react";
import { Todo } from "../use-todo";

interface TodoItemProps {
  toggleTodo: (todo: Todo) => void;
}

const TodoItem: FC<Todo & TodoItemProps> = ({ title, duedate, done, toggleTodo }) => {
  const handleTodoClick = () => {
    toggleTodo({title, duedate, done});
  }

  return (
    <div onClick={handleTodoClick}>
      {title} - {done ? "done" : "todo"}
    </div>
  )
}

export default TodoItem;