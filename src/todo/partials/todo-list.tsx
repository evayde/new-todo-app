import React, { FC } from "react";
import { Todo } from "../use-todo";
import TodoItem from "./todo-item";

interface TodoListProps {
  items: Todo[];
  toggleTodo: (todo: Todo) => void;
  filter: any;
}

const TodoList: FC<TodoListProps> = ({ items, toggleTodo, filter }) => {
  return (
    <div>
      {
        items
          .filter(filter)
          .map(t => <TodoItem toggleTodo={toggleTodo} key={t.duedate+t.title} {...t} />)
      }
    </div>
  );
}

export default TodoList;