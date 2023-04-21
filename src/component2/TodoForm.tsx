import React, { useState } from 'react';

type FormProps = {
    addTodo: Function
}

const TodoForm: React.FC<FormProps> = ({ addTodo }) => {
    const [value, setValue] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!value) return;
      addTodo(value);
      setValue('');
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add ToDo..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    );
  };

export default TodoForm