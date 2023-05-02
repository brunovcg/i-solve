import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts';
import { routes } from '../routes';

export default function ProtectedRoutes() {
  const { isUserLogged } = useContext(UserContext);

  if (isUserLogged) {
    return <Outlet />;
  }

  return <Navigate to={routes.login.path} />;
}
