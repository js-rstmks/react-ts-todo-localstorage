import React, { useState } from "react"
import { Todo } from "./Todo"
// 受け取るPropsの型を定義する
type FormProps = {
    todos: Todo[]
    checkedTodos: Todo[]
    createTodo: Function
}

const Form: React.FC<FormProps> = ({ todos, checkedTodos, createTodo }) => {
  const [enteredTodo, setEnteredTodo] = useState("");

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // checkedItem_orderはcheckedListに移されたときに値を設定する。
    const newTodo: Todo = {
      id: todos.length + checkedTodos.length + 1,
      content: enteredTodo,
      editing: false,
      checked: false,
      item_order: todos.length + 100,
      checkedItem_order: 0
    }

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