import React, { useState } from "react";
import { Todo } from "./Todo";
import { Button, TextField, Box, Typography, Checkbox } from '@mui/material';

// 受け取るPropsの型を定義する
type ItemProps = {
  todo: Todo;
  complete: Function
  updateTodo: Function
  moveTodo: Function
  transferToCheckedList: Function
};

export const Item: React.FC<ItemProps> = ({ todo, complete, updateTodo, moveTodo, transferToCheckedList }) => {
// テキストのState管理
  const [editingContent, setEditingContent] = useState(todo.content);

    const editMode = () => {
        const newTodo = {
        ...todo,
        editing: !todo.editing,
        };
        updateTodo(newTodo)
    };

    // const clickUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const clickUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
        // updateTodo(newTodo)
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
                        <Checkbox onChange={(e) => transferList(e)}/>
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
            <Button variant="contained" onClick={() => complete(todo.id)}>Delete</Button>
        </div>
    )
};