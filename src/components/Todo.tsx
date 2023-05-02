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
    // const [todos, setTodos] = useState<Todo[] | undefined>([])
    const [todos, setTodos] = useState<Todo[]>([])

    useEffect(() => {
        const storedTodo = localStorage.getItem('todo');

        if (storedTodo) {
            // array内にTodo typeのobjectがいくつかはいるため、[Todo]とかく
        const parsedData: [Todo] = JSON.parse(storedTodo)
            setTodos(parsedData)
        }
    }, [])

    const deleteTodo = (id: number) => {
        // 指定したidで削除
        const newTodos1 = todos?.filter((todo) => {
            return todo.id !== id;
        })
        // idをつめる
        // ex)1,3,4,5を1,2,3,4とする
        const newTodos2 = newTodos1?.map((todo) => {
            if (todo.id > id) {
                return {...todo, id: todo.id - 1}
            } else {
                return todo
            }
        })
        localStorage.setItem('todo', JSON.stringify(newTodos2))
        setTodos(newTodos2)
    }

    // up down move
    const moveTodo = (id: number, orderChange: string) => {
        const newTodos = [...todos]

        const index = newTodos.findIndex(todo => todo.id == id);
        if ((orderChange === 'up' && index === 0) || (orderChange === 'down' && index === newTodos.length - 1)) {
            return 
        }

        const indexContent: string = newTodos[index].content
        const indexId: number = newTodos[index].id

        if (orderChange === 'up') {
            const prevContent: string = newTodos[index - 1].content
            const prevId: number = newTodos[index - 1].id

            newTodos[index].id = prevId
            newTodos[index].content = prevContent
    
            newTodos[index - 1].content = indexContent
            newTodos[index - 1].id = indexId

        } else if (orderChange === 'down') {
            const nextContent: string = newTodos[index + 1].content
            const nextId: number = newTodos[index + 1].id

            newTodos[index].id = nextId
            newTodos[index].content = nextContent
    
            newTodos[index + 1].content = indexContent
            newTodos[index + 1].id = indexId 
        }
        localStorage.setItem('todo', JSON.stringify(newTodos))
        setTodos(newTodos)
    }

  const createTodo = (todo: Todo) => {
    if (todos === undefined) {
        setTodos([todo])
      } else {
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
            <List todos={todos} 
            deleteTodo={deleteTodo} 
            updateTodo={updateTodo}
            moveTodo={moveTodo} />
        ) : (
            <p>No todos yet.</p>
        )
        }
        </div>
        <Form 
            todos={todos}
            createTodo={createTodo} />
    </>
  );
};
export default Todo