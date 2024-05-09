import { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { UserContext } from '../../App';

const Private = ({ children }: any) => {
  const location = useLocation();
  const state = useContext(UserContext);

  if (!state?.user?.username) {
    return <Navigate to="/signIn" state={{ from: location }} />;
  }
  return children;
};

export default Private;
