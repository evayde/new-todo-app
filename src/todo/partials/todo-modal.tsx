import React, { FC } from "react";

interface TodoModalProps {
  show: boolean;
  value: string;
  onAdd: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
}

const TodoModal: FC<TodoModalProps> = ({ show, onChange, value, onAdd, onClose }) => {
  return (
    <>
      {show && <div>
        <input value={value} onChange={onChange} />
        <button onClick={onAdd}>add</button>
        <button onClick={onClose}>x close Modal</button>
      </div>}
    </>
  );
}

export default TodoModal;