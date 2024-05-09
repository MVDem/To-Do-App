import { useContext, useState } from 'react';
import styles from './CompletedTodoPage.module.scss';
import { UserContext } from '../../App';
import TodoItem from '../../components/TodoItem/TodoItem';

function ActiveTodoPage() {
  const state = useContext(UserContext);
  const [activeTodo, setActiveTodo] = useState<number>();
  const { todos } = state || {};
  const completedTodos = todos?.todoList?.filter((todo) => todo.completed);

  // const label =
  //   completedTodos?.length !== 0
  //     ? `You have  ${completedTodos?.length} ${
  //         completedTodos?.length === 1 ? 'To Do' : 'To Dos'
  //       }:`
  //     : 'You are lazy! Nothing completed!';
  return (
    <div className={styles.todoList}>
      {/* <h1>{label}</h1> */}
      <ul>
        {completedTodos?.map((todo, index) => (
          <li key={index} onClick={() => setActiveTodo(todo.id)}>
            <TodoItem
              key={index}
              todo={todo}
              isActive={activeTodo === todo.id}
              onToggle={todos?.onToggle!}
              onRemove={todos?.onRemove!}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActiveTodoPage;
