import Dashboard from '../pages/dashboard/Dashboard';
import Login from '../pages/login/Login';
import NotFound from '../pages/not-found/NotFound';
import { Route, Routes } from 'react-router-dom';
import OpenedRoutes from './components/OpenRoutes';
import ProtectedRoutes from './components/ProtectedRoutes';
import { routes } from './routes';
import Welcome from '../pages/dashboard/modules/welcome/Welcome';
import AccessControl from '../pages/dashboard/modules/access-control/AccessControl';
import ProcessRunner from '../pages/dashboard/modules/process-runner/ProcessRunner';
import Complain from '../pages/complain/Complain';

const { login, notFound, dashboard, welcome, accessControl, processRunner, complain } = routes;

function Router() {
  return (
    <Routes>
      <Route element={<OpenedRoutes />}>
        <Route path={login.path} element={<Login />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path={dashboard.path} element={<Dashboard />}>
          <Route index path={welcome.path} element={<Welcome />} />
          <Route path={accessControl.path} element={<AccessControl />} />
          <Route path={processRunner.path} element={<ProcessRunner />} />
          <Route path={complain.path} element={<Complain />} />
        </Route>
      </Route>
      <Route path={notFound.path} element={<NotFound />} />
    </Routes>
  );
}

export default Router;
