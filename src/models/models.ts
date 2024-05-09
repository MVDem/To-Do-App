export interface Todo {
  id: number;
  title: string;
  description: string;
  deadline: number;
  completed: boolean;
}

export interface State {
  todos?: Todos;
  user?: User;
}
export interface User {
  username?: string;
  loginHandler?: (username: string) => void;
}
export interface Todos {
  todoList?: Todo[];
  setTodos?: (todos: Todo[]) => void;
  onToggle?: (id: number) => void;
  onRemove?: (id: number) => void;
}
