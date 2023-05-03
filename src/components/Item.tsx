import React, { useState } from "react";
import { Todo } from "./Todo";
import { Button, TextField, Box, Typography, Checkbox } from '@mui/material';

// 受け取るPropsの型を定義する
type ItemProps = {
    todo: Todo;
    deleteTodo: Function
    updateTodo: Function
    moveTodo: Function
    transferToCheckedList: Function
};

export const Item: React.FC<ItemProps> = ({ todo, deleteTodo, updateTodo, moveTodo, transferToCheckedList }) => {
// テキストのState管理
  const [editingContent, setEditingContent] = useState(todo.content);

    const editMode = () => {
        const newTodo = {
        ...todo,
        editing: !todo.editing,
        };
        updateTodo(newTodo)
    };

    const clickUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(e.currentTarget.id)
        moveTodo(e.currentTarget.id, 'up')
    }

    const clickDown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        moveTodo(e.currentTarget.id, 'down')
    }

    const confirmContent = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTodo = {
            ...todo,
            content: editingContent,
            editing: !todo.editing,
        }
        updateTodo(newTodo)
    }

    const transferList = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation()
        const newTodo = {
            ...todo,
            checked: !todo.checked
        }
        console.log(e.currentTarget.id)
        transferToCheckedList(e.target.id, newTodo)
    }

    return (
        <div key={todo.id}>
            <form onSubmit={confirmContent} style={{ display: "inline" }}>
                <span onDoubleClick={editMode}>
                {todo.editing ? (
                    <TextField id="outlined-basic" 
                        type="text"
                        placeholder="enter updated content"
                        color="success"
                        label="enter updated content" variant="outlined"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEditingContent(e.target.value)
                    } />
                ) : (
                    <>
                        {todo.checked === false ? (
                            <Checkbox id={String(todo.id)} onChange={(e) => transferList(e)}/>
                            ) : (
                            <Checkbox id={String(todo.id)} onChange={(e) => transferList(e)} checked/>
                            )}
                        <Typography>
                            {todo.content}
                        </Typography>
                    </>
                )}
                </span>
            </form>
            <Box sx={{ display: 'inline', m:2 }} >
                <Button id={String(todo.id)} onClick={(e) => clickUp(e)} 
                variant="contained">Up</Button>
            </Box>
            <Box sx={{ display: 'inline', m:2 }} >
                <Button id={String(todo.id)} onClick={(e) => clickDown(e)} 
                variant="contained">Down</Button>
            </Box>
            {todo.checked ? (
                <Button variant="contained" onClick={() => deleteTodo(todo.id, true)}>Delete</Button>
            ) : (
                <Button variant="contained" onClick={() => deleteTodo(todo.id, false)}>Delete</Button>
            )}
        </div>
    )
};