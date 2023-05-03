import { Item } from "./Item";
import { Todo } from "./Todo";


type ListProps = {
  todos: Todo[]
  deleteTodo: Function
  updateTodo: Function
  moveTodo: Function
  transferToCheckedList: Function
};

const List: React.FC<ListProps> = ({ todos, deleteTodo, updateTodo, moveTodo, transferToCheckedList }) => {
  const complete = (id: number) => {
    deleteTodo(id, todos)
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
                transferToCheckedList={transferToCheckedList}
                />
        );
      })}
    </div>
  )
}

export default List