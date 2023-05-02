import { useState, useEffect } from "react"
import List from "./List"
import Form from "./Form"
import {Box, Checkbox } from '@mui/material'

export type Todo = {
    id: number
    content: string
    editing: boolean
    checked: false
}

const Todo = () => {
    const [todos, setTodos] = useState<Todo[]>([])

    const [checkedTodos, setCheckedTodos] = useState<Todo[]>([])

    useEffect(() => {
        const storedTodo = localStorage.getItem('todo');
        const storedCheckedTodo = localStorage.getItem('CheckedTodo')

        if (storedTodo) {
            // array内にTodo typeのobjectがいくつかはいるため、[Todo]とかく
            const parsedTodo: [Todo] = JSON.parse(storedTodo)
            setTodos(parsedTodo)
        }

        if (storedCheckedTodo){
            const parsedCheckedTodo: [Todo] = JSON.parse(storedCheckedTodo)
            setCheckedTodos(parsedCheckedTodo)
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

    const transferToCheckedList = (id: number) => {
        const newTodos = [...todos]
        const transferredList = newTodos.splice(id - 1, 1)

        console.log(transferredList)
        console.log(newTodos)
        setTodos(newTodos)
        setCheckedTodos(transferredList)
        localStorage.setItem('CheckedTodo', JSON.stringify(transferredList))
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
                    <p>No Checkedtodos yet.</p>
                )
                }

            </Box>


        </Box>


    </>
  );
};
export default Todo