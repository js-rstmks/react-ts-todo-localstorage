import React from 'react';
import logo from './logo.svg';
import './App.css';
import Todo from "./components/Todo";


function App() {
  return (
    <div className="App">
        <Todo />
    </div>
  );
}

export default App;

// import React, { useState, useEffect } from 'react';
// // import TodoForm from './component2/TodoForm'

// // ToDoの型
// export type Todo = {
//   id: number;
//   content: string;
//   completed: boolean;
// };

// // ToDoのリストの型
// export type TodoList = Todo[];

// // ToDo入力フォームのコンポーネント
// // const TodoForm = ({ addTodo }: { addTodo: (content: string) => void }) => {
// //   const [value, setValue] = useState('');

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!value) return;
// //     addTodo(value);
// //     setValue('');
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <input
// //         type="text"
// //         placeholder="Add ToDo..."
// //         value={value}
// //         onChange={(e) => setValue(e.target.value)}
// //       />
// //       <button type="submit">Add</button>
// //     </form>
// //   );
// // };

// // ToDoのリストのコンポーネント
// const TodoList = ({ todos, toggleTodo }: { todos: TodoList; toggleTodo: (id: number) => void }) => {
//   return (
//     <ul>
//       {todos.map((todo) => (
//         <li
//           key={todo.id}
//           onClick={() => toggleTodo(todo.id)}
//           style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
//         >
//           {todo.content}
//         </li>
//       ))}
//     </ul>
//   );
// };

// // ToDoアプリのコンポーネント
// const App = () => {
//   const [todos, setTodos] = useState<TodoList>([]);

//   // 初期化時にローカルストレージからToDoリストを取得する
//   useEffect(() => {
//     const storedTodos = localStorage.getItem('todos');
//     if (storedTodos) {
//       const parsedTodos: TodoList = JSON.parse(storedTodos);
//       setTodos(parsedTodos);
//     }
//   }, []);

//   // ToDoを追加する
//   const addTodo = (content: string) => {
//     const newTodo: Todo = { id: Date.now(), content: content, completed: false };
//     setTodos([...todos, newTodo]);
//     localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
//   };

//   // ToDoの完了状態を切り替える
//   const toggleTodo = (id: number) => {
//     const updatedTodos: TodoList = todos.map((todo) => {
//       if (todo.id === id) {
//         return { ...todo, completed: !todo.completed };
//       }
//       return todo;
//     });
//     setTodos(updatedTodos);
//     localStorage.setItem('todos', JSON.stringify(updatedTodos));
//   };

//   return (
//     <div>
//       <h1>ToDo List</h1>
//       <TodoForm addTodo={addTodo} />
//       <TodoList todos={todos} toggleTodo={toggleTodo} />
//     </div>
//   );
// };

// export default App;
