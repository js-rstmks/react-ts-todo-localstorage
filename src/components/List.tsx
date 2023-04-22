import { Item } from "./Item";
import { Todo } from "./Todo";

type ListProps = {
  todos: Todo[]
  deleteTodo: Function
  updateTodo: Function
  moveTodo: Function
};

const List: React.FC<ListProps> = ({ todos, deleteTodo, updateTodo, moveTodo }) => {
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
            moveTodo={moveTodo}
          />
        );
      })}
    </div>
  )
}

export default List