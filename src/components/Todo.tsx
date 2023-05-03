import { useState, useEffect } from "react"
import List from "./List"
import Form from "./Form"
import {Box} from '@mui/material'

export type Todo = {
    id: number
    content: string
    editing: boolean
    // checked: boolean
}

const Todo = () => {
    const [todos, setTodos] = useState<Todo[]>([])

    const [checkedTodos, setCheckedTodos] = useState<Todo[]>([])

    useEffect(() => {
        const storedTodos = localStorage.getItem('todo');
        const storedCheckedTodos = localStorage.getItem('CheckedTodo')

        if (storedTodos) {
            // array内にTodo typeのobjectがいくつかはいるため、[Todo]とかく
            const parsedTodos: [Todo] = JSON.parse(storedTodos)
            setTodos(parsedTodos)
        }

        if (storedCheckedTodos){
            const parsedCheckedTodos: [Todo] = JSON.parse(storedCheckedTodos)
            setCheckedTodos(parsedCheckedTodos)
        }
    }, [])

    // const setAndLocalStorage = (key: string, todosArray: Todo[]) => {
    //     console.log(todosArray)
    //     setTodos(todosArray)
    //     localStorage.setItem(key , JSON.stringify(todosArray))
    // }

    // const deleteTodo = (id: number) => {
    const deleteTodo = (id: number, checked: boolean ,originalTodos: [Todo]) => {
        // 指定したidで削除
        // const newTodos1 = todos?.filter((todo) => {
        const newTodos1 = originalTodos?.filter((todo) => {
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

        if (checked === false) {
            localStorage.setItem('todo', JSON.stringify(newTodos2))
            setTodos(newTodos2)
        } else {
            localStorage.setItem('CheckedTodo', JSON.stringify(newTodos2))
            setTodos(newTodos2)
        }
    }

    const transferToCheckedList = (id: number) => {
        const newTodos = [...todos]
        const transferredTodos: Todo[] = newTodos.splice(id - 1, 1)

        const transferredTodo: string = t

        console.log(transferredTodo)
        setTodos(newTodos)
        localStorage.setItem('todo', JSON.stringify(newTodos))
        // setAndLocalStorage('todo', newTodos)

        setCheckedTodos([...checkedTodos, transferredTodo])
        localStorage.setItem('CheckedTodo', JSON.stringify([...checkedTodos, transferredTodo]))
        // setAndLocalStorage('CheckedTodo', transferredList)
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
        localStorage.setItem('todo', JSON.stringify([...todos, todo]))
        setTodos([...todos, todo])
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
        <Form 
            todos={todos}
            checkedTodos={checkedTodos}
            createTodo={createTodo} 
        />
        <Box sx={{ display: 'flex'}}>
            <Box>
                <h2>LIST</h2>
                <span>double click and You can edit content</span>
                <div style={{marginTop: 30}}>
                    { todos.length !== 0 ? (
                        <List todos={todos}
                            deleteTodo={deleteTodo} 
                            updateTodo={updateTodo}
                            moveTodo={moveTodo}
                            transferToCheckedList={transferToCheckedList}
                        />
                        ) : (
                            <p>No todos yet.</p>
                        )
                    }
                </div>
            </Box>

            <Box>
                <h2>Checked List</h2>

                { checkedTodos.length !== 0 ? (
                    <List todos={checkedTodos} 
                    deleteTodo={deleteTodo} 
                    updateTodo={updateTodo}
                    moveTodo={moveTodo}
                    transferToCheckedList={transferToCheckedList}
                     />
                ) : (
                    <p>No CheckedTodos yet.</p>
                )
                }
            </Box>
        </Box>
    </>
  );
};
export default Todo