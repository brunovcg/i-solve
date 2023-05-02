import { UserContext } from '../../contexts';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { routes } from '../routes';

export default function OpenedRoutes() {
  const { isUserLogged } = useContext(UserContext);

  if (isUserLogged) {
    return <Navigate to={routes.dashboard.path} />;
  }

  return <Outlet />;
}
