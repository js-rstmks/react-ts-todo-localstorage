import { useState, useEffect } from "react"
import List from "./List"
import Form from "./Form"
import {Box} from '@mui/material'

export type Todo = {
    id: number
    content: string
    editing: boolean
    checked: boolean
    item_order: number
    checkedItem_order: number
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



    const deleteTodo = (id: number) => {
    // const deleteTodo = (id: number, checked: boolean ,originalTodos: [Todo]) => {

        // 指定したidで削除
        const newTodos1 = todos?.filter((todo) => {
        // const newTodos1 = originalTodos?.filter((todo) => {
            return todo.id !== id
        })

        // if (checked === false) {
            localStorage.setItem('todo', JSON.stringify(newTodos1))
            setTodos(newTodos1)
        // } else {
            // localStorage.setItem('CheckedTodo', JSON.stringify(newTodos2))
            // setCheckedTodos(newTodos2)
        // }
    }

    // いきなり一つの関数にまとめるのではなく、まずは重複したコードをかいてでも実装を優先する
    const deleteCheckedTodo = (id: number) => {
        const newTodos1 = checkedTodos?.filter((todo) => {
            // const newTodos1 = originalTodos?.filter((todo) => {
                return todo.id !== id
            })

        localStorage.setItem('CheckedTodo', JSON.stringify(newTodos1))
        setCheckedTodos(newTodos1)
    }

    // チェックリストへ移行
    const transferToCheckedList = (id: number, passedTodo: Todo) => {
        const newTodos = [...todos]

        // 
        const newTodos2 = newTodos?.map((_todo) => {
            return _todo.id === passedTodo.id ? { ..._todo, ...passedTodo} : { ..._todo } 
        })

        console.log(newTodos2)
        const transferredTodos: Todo[] = newTodos2.splice(id, 1)

        const transferredTodo: Todo = transferredTodos[0]

        // transferredTodo.checkedItem_order = todos.length + checkedTodos.length + 100
        // transferredTodo.checkedItem_order = checkedTodos.length + 100

        setTodos(newTodos2)
        localStorage.setItem('todo', JSON.stringify(newTodos2))
        // setAndLocalStorage('todo', newTodos)


        setCheckedTodos([transferredTodo, ...checkedTodos])
        localStorage.setItem('CheckedTodo', JSON.stringify([transferredTodo, ...checkedTodos]))
        // setAndLocalStorage('CheckedTodo', transferredList)

    }

    const updateTodo = (passedTodo: Todo) => {
        const newTodos = todos?.map((_todo) => {
            return _todo.id === passedTodo.id ? { ..._todo, ...passedTodo } : { ..._todo }
        });
        console.log(newTodos)
        localStorage.setItem('todo', JSON.stringify(newTodos))

        setTodos(newTodos);
    };

    // up down move
    const moveTodo = (id: number, orderChange: string) => {
        const newTodos = [...todos]

        // クリックしたitemの配列内におけるインデックス
        const index = newTodos.findIndex(todo => todo.id == id);
        if ((orderChange === 'up' && index === 0) || (orderChange === 'down' && index === newTodos.length - 1)) {
            return
        }

        if (orderChange === 'up') {
            newTodos[index].item_order = newTodos[index].item_order + 1
            newTodos[index - 1].item_order = newTodos[index].item_order - 1

        } else if (orderChange === 'down') {
            newTodos[index].item_order = newTodos[index].item_order - 1
            newTodos[index + 1].item_order = newTodos[index].item_order + 1
        }

        // item_orderの降順に配列内のオブジェクトを入れ替える
        newTodos.sort((a, b) => b.item_order - a.item_order)

        console.log(newTodos)
        localStorage.setItem('todo', JSON.stringify(newTodos))
        setTodos(newTodos)
    }

    const moveCheckedTodo = (id: number, orderChange: string) => {
        const newTodos = [...checkedTodos]

        console.log(67667676)

        // クリックしたitemの配列内におけるインデックス
        const index = newTodos.findIndex(todo => todo.id == id);
        if ((orderChange === 'up' && index === 0) || (orderChange === 'down' && index === newTodos.length - 1)) {
            return
        }

        if (orderChange === 'up') {
            newTodos[index].checkedItem_order = newTodos[index].checkedItem_order + 1
            newTodos[index - 1].checkedItem_order = newTodos[index].checkedItem_order - 1

        } else if (orderChange === 'down') {
            newTodos[index].checkedItem_order = newTodos[index].checkedItem_order - 1
            newTodos[index + 1].checkedItem_order = newTodos[index].checkedItem_order + 1
        }

        newTodos.sort((a, b) => b.item_order - a.item_order)


        setCheckedTodos(newTodos)
        localStorage.setItem('CheckedTodo', JSON.stringify(newTodos))
    }

    const createTodo = (todo: Todo) => {
        localStorage.setItem('todo', JSON.stringify([todo, ...todos]))
        setTodos([todo, ...todos])
    }


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
                    // deleteTodo={deleteTodo} 
                    deleteTodo={deleteCheckedTodo} 
                    updateTodo={updateTodo}
                    // moveTodo={moveTodo}
                    moveTodo={moveCheckedTodo}
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