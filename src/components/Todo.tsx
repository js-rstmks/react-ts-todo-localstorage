import { useState, useEffect } from "react"
import List from "./List"
import Form from "./Form"
import { parse } from "path"

export type Todo = {
    id: number
    content: string
    editing: boolean
}

const Todo = () => {
  const [todos, setTodos] = useState<Todo[] | undefined>([])

  useEffect(() => {
    const storedTodo = localStorage.getItem('todo');
    console.log(storedTodo)

    if (storedTodo) {
        // array内にTodo typeのobjectがいくつかはいるため、[Todo]とかく
      const parsedData: [Todo] = JSON.parse(storedTodo)
        setTodos(parsedData)
    }
  }, [])

  const deleteTodo = (id: number) => {
    console.log(todos)
    const newTodos = todos?.filter((todo) => {
      return todo.id !== id;
    })

    localStorage.setItem('todo', JSON.stringify(newTodos))
    setTodos(newTodos)
  }

  const createTodo = (todo: Todo) => {
    if (todos === undefined) {
        setTodos([todo])
      } else {
        console.log(JSON.stringify(todo))
        localStorage.setItem('todo', JSON.stringify([...todos, todo]))

        setTodos([...todos, todo])
      }
  }

  const updateTodo = (todo: Todo) => {
    const newTodos = todos?.map((_todo) => {
      return _todo.id === todo.id ? { ..._todo, ...todo } : { ..._todo }
    });
    localStorage.setItem('todo', JSON.stringify(newTodos))

    setTodos(newTodos);
  };

  return (
    <>
        <h1>LIST</h1>
        <span>double click and You can edit content</span>
        <div style={{marginTop: 30}}>
        { todos ? (
            <List todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
        ) : (
            <p>No todos yet.</p>
        )
        }
        </div>
      <Form createTodo={createTodo} />
    </>
  );
};
export default Todo