import { useContext } from 'react';
import { Todo } from '../../models/models';
import { getSortedTodos } from '../../assets/utils';
import styles from './createTodoForm.module.scss';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';

function CreateTodoPage() {
  const state = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const _title = data.get('title')?.toString();
    const _description = data.get('description')?.toString();
    const _deadLine = data.get('deadLine')?.toString();
    if (_title && _description && _deadLine) {
      const newTodo: Todo = {
        id: Date.now(),
        title: _title!,
        description: _description!,
        deadline: new Date(_deadLine!).getTime(),
        completed: false,
      };
      state?.todos?.setTodos!(
        getSortedTodos([...state?.todos?.todoList!, newTodo])
      );
      navigate('/active');
    }
    if (!_deadLine) {
      e.currentTarget.getElementsByTagName('input')[2].focus();
      e.currentTarget.getElementsByTagName('input')[2].style.borderColor =
        'red';
    } else {
      e.currentTarget.getElementsByTagName('input')[2].style.borderColor =
        '#ced4da';
    }
    if (!_description) {
      console.log(_description);
      e.currentTarget.getElementsByTagName('input')[1].focus();
      e.currentTarget.getElementsByTagName('input')[1].style.borderColor =
        'red';
    } else {
      e.currentTarget.getElementsByTagName('input')[1].style.borderColor =
        '#ced4da';
    }

    if (!_title) {
      e.currentTarget.getElementsByTagName('input')[0].focus();
      e.currentTarget.getElementsByTagName('input')[0].style.borderColor =
        'red';
    } else {
      e.currentTarget.getElementsByTagName('input')[0].style.borderColor =
        '#ced4da';
    }
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <label htmlFor="title">Create To Do</label>
        <input type="text" placeholder="My To Do" name="title" />
        <input type="text" placeholder="Description" name="description" />
        <input type="date" name="deadLine" />
        <button type="submit">Add</button>
      </form>
    </>
  );
}
export default CreateTodoPage;
