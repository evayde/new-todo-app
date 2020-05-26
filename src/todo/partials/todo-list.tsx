import React, { FC } from "react";
import { Todo } from "../use-todo";
import TodoItem from "./todo-item";

interface TodoListProps {
  items: Todo[];
  toggleTodo: (todo: Todo) => void;
}

const TodoList: FC<TodoListProps> = ({ items, toggleTodo }) => {
  return (
    <div>
      {items.map(t => <TodoItem toggleTodo={toggleTodo} key={t.duedate+t.title} {...t} />)}
    </div>
  );
}

export default TodoList;