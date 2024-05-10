export interface Todo {
  id: number;
  title: string;
  description: string;
  deadline: number;
  completed: boolean;
  categoryId: number;
}

export interface State {
  todos?: Todos;
  user?: User;
  categories?: Categories;
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

export interface Categories {
  categoriesList?: CategoriesList[];
  onAdd?: (category: CategoriesList) => void;
  onDelete?: (id: number) => void;
}

export interface CategoriesList {
  id: number;
  title: string;
  emoji?: string;
}
