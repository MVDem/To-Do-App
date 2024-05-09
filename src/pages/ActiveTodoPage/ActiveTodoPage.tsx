import { useContext, useState } from 'react';
import styles from './todoList.module.scss';
import { UserContext } from '../../App';
import TodoItem from '../../components/TodoItem/TodoItem';

function ActiveTodoPage() {
  const state = useContext(UserContext);
  const [activeTodo, setActiveTodo] = useState<number>();
  const { todos } = state!;
  const activeTodos = todos?.todoList?.filter((todo) => !todo.completed);

  // const label =
  //   activeTodos?.length !== 0
  //     ? `You have  ${activeTodos?.length} ${
  //         activeTodos?.length === 1 ? 'To Do' : 'To Dos'
  //       }:`
  //     : 'You are lazy! Nothing to do!';
  return (
    <div className={styles.todoList}>
      {/* <h1>{label}</h1> */}
      <ul>
        {activeTodos?.map((todo, index) => (
          <li key={index} onClick={() => setActiveTodo(todo.id)}>
            <TodoItem
              isActive={activeTodo === todo.id}
              todo={todo}
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
