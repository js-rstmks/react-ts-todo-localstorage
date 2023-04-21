import React, { useState } from "react";

// 受け取るPropsの型を定義する

type FormProps = {
    createTodo: Function
}

const Form: React.FC<FormProps> = ({ createTodo }) => {
  const [enteredTodo, setEnteredTodo] = useState("");

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 1e5 is a shorthand notation for the number 100000
    const newTodo = {
      id: Math.floor(Math.random() * 1e5),
      content: enteredTodo,
      editing: false
    }

    console.log(newTodo)
    createTodo(newTodo)
    setEnteredTodo("")
  }

  return (
    <div>
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="enter todo"
          value={enteredTodo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEnteredTodo(e.target.value)
          }
        />
        <button>+</button>
      </form>
    </div>
  );
};

export default Form