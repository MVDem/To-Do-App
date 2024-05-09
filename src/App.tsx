import { Suspense, createContext, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import Private from './assets/hocs/PrivateRoutes';
import { State } from './models/models';
import { defaultTodos } from './data';
import SignPage from './pages/SignPage/SignPage';
import ActiveTodoPage from './pages/ActiveTodoPage/ActiveTodoPage';
import CreateTodoPage from './pages/CreateTodoPage/CreateTodoPage';
import CompletedTodoPage from './pages/CompletedTodoPage/CompletedTodoPage';

export const UserContext = createContext<State | null>(null);

function App() {
  const [state, setState] = useState<State | null>(null);

  useEffect(() => {
    setState({
      user: {
        username: '',
        loginHandler: (username: string) => {
          setState((prev) => ({
            ...prev,
            user: { ...prev?.user, username },
          }));
        },
      },
      todos: {
        todoList: [...defaultTodos],
        setTodos: (todos) => {
          setState((prev) => ({
            ...prev,
            todos: { ...prev?.todos, todoList: todos },
          }));
        },
        onToggle: (id: number) => {
          setState((prev) => {
            const todos = prev?.todos?.todoList?.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            );
            return {
              ...prev,
              todos: { ...prev?.todos, todoList: todos || [] },
            };
          });
        },
        onRemove: (id: number) => {
          setState((prev) => {
            const todos = prev?.todos?.todoList?.filter(
              (todo) => todo.id !== id
            );
            console.log('todos', todos, id);
            return {
              ...prev,
              todos: { ...prev?.todos, todoList: todos || [] },
            };
          });
        },
      },
    });
  }, []);

  // const SignPage = lazy(() => import('./pages/SignPage/SignPage'));
  // const ActiveTodoPage = lazy(
  //   () => import('./pages/ActiveTodoPage/ActiveTodoPage')
  // );
  // const CreateTodoPage = lazy(
  //   () => import('./pages/CreateTodoPage/CreateTodoPage')
  // );

  // const CompletedTodoPage = lazy(
  //   () => import('./pages/CompletedTodoPage/CompletedTodoPage')
  // );

  return (
    <>
      <UserContext.Provider value={state}>
        <BrowserRouter basename="/To-Do-App">
          <Suspense fallback="Loading...">
            <Routes>
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<SignPage />} />
                <Route
                  path="/active"
                  index
                  element={
                    <Private>
                      <ActiveTodoPage />
                    </Private>
                  }
                />
                <Route
                  path="/create"
                  index
                  element={
                    <Private>
                      <CreateTodoPage />
                    </Private>
                  }
                />
                <Route
                  path="/completed"
                  index
                  element={
                    <Private>
                      <CompletedTodoPage />
                    </Private>
                  }
                />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
