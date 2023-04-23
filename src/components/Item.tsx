import React, { useState } from "react";
import { Todo } from "./Todo";
import { Button, TextField, Box, Typography } from '@mui/material';


// 受け取るPropsの型を定義する
type ItemProps = {
  todo: Todo;
  complete: Function
  updateTodo: Function
  moveTodo: Function
};

export const Item: React.FC<ItemProps> = ({ todo, complete, updateTodo, moveTodo }) => {
// テキストのState管理
  const [editingContent, setEditingContent] = useState(todo.content);

    const editMode = () => {
        const newTodo = {
        ...todo,
        editing: !todo.editing,
        };
        updateTodo(newTodo)
    };

    // const clickUp = (fromIndex: number) => {
    // const clickUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const clickUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
        moveTodo(e.currentTarget.id)
    }

    const confirmContent = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTodo = {
            ...todo,
            content: editingContent,
            editing: !todo.editing,
        };
        updateTodo(newTodo);
    }

    return (
        <div key={todo.id}>
            <Button>DOWN</Button>
            <form onSubmit={confirmContent} style={{ display: "inline" }}>
                <span onDoubleClick={editMode}>
                {todo.editing ? (
                    // <input
                    // type="text"
                    // placeholder="enter updated content"
                    // value={editingContent}
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    //     setEditingContent(e.target.value)
                    // }
                    // />
                    <TextField id="outlined-basic" 
                        type="text"
                        placeholder="enter updated content"
                        color="success"
                        label="enter updated content" variant="outlined" />
                ) : (
                    <Typography>
                        todo.content
                    </Typography>
                )}
                </span>
            </form>
            <Box sx={{ display: 'inline', m:2 }} >
                <Button id={String(todo.id)} onClick={(e) => clickUp(e, todo.id)} variant="contained">Up</Button>
            </Box>
            <Button variant="contained" onClick={() => complete(todo.id)}>Delete</Button>
        </div>
    )
};