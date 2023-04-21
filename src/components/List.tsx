import { Item } from "./Item";
import { Todo } from "./Todo";

// 受け取るPropsの型を定義する
type ListProps = {
  todos: Todo[];
  deleteTodo: Function;
  updateTodo: Function;
};

const List: React.FC<ListProps> = ({ todos, deleteTodo, updateTodo }) => {
  const complete = (id: number) => {
    deleteTodo(id)
  }
  return (
    <div>
      {todos?.map((todo) => {
        return (
          <Item
            key={todo.id}
            todo={todo}
            complete={complete}
            updateTodo={updateTodo}
          />
        );
      })}
    </div>
  )
}

export default List