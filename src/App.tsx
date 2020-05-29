import React, { useState } from "react";
import useTodo, { Todo } from "./todo/use-todo";
import TodoList from "./todo/partials/todo-list";
import TodoModal from "./todo/partials/todo-modal";
import useCalendar from "./calendar/use-calendar";

function App() {
  const {todos, addTodo, toggleTodo} = useTodo();
  const {currentDay, gotoNextDay, gotoPreviousDay, isSameDay} = useCalendar();
  const [newTodo, setNewTodo] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleTodoAdd = async () => {
    const todo = {title: newTodo, duedate: new Date(currentDay)};
    await addTodo(todo);
    setNewTodo("");
  }

  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  }

  const handleModalOpen = () => {
    setShowModal(true);
  }

  const handleModalClose = () => {
    setShowModal(false);
  }

  return (
    <div className="App">
      <button onClick={gotoPreviousDay}>Prev</button>
      Day: {currentDay.toDateString()}
      <button onClick={gotoNextDay}>Next</button>

      <TodoModal
        show={showModal}
        value={newTodo}
        onAdd={handleTodoAdd}
        onChange={handleTodoChange}
        onClose={handleModalClose}
      />

      <TodoList items={todos} toggleTodo={toggleTodo} filter={(t: Todo) => isSameDay(t.duedate, currentDay)} />

      {!showModal && <button onClick={handleModalOpen}>+</button>}
    </div>
  );
}

export default App;
