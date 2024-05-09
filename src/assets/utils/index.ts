import { defaultTodos } from '../../data';

const getSortedTodos = (todos = defaultTodos) => {
  return todos
    .sort((a, b) => (a.deadline! > b.deadline! ? 1 : -1))
    .sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
};

const initialDate = () => {
  const date = new Date();

  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  let year = date.getFullYear().toString();

  if (+month < 10) month = '0' + month;
  if (+day < 10) day = '0' + day;

  const today = year + '-' + month + '-' + day;
  return today;
};

export { getSortedTodos, initialDate };
