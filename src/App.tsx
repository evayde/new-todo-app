import React, { useState } from 'react';
import useTodo from './todo/use-todo';
import TodoList from './todo/partials/todo-list';
import TodoModal from './todo/partials/todo-modal';

function App() {
  const {todos, addTodo, toggleTodo} = useTodo();
  const [newTodo, setNewTodo] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleTodoAdd = async () => {
    const todo = {title: newTodo, duedate: new Date()};
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
      <TodoModal
        show={showModal}
        value={newTodo}
        onAdd={handleTodoAdd}
        onChange={handleTodoChange}
        onClose={handleModalClose}
      />

      <TodoList items={todos} toggleTodo={toggleTodo} />

      {!showModal && <button onClick={handleModalOpen}>+</button>}
    </div>
  );
}

export default App;
