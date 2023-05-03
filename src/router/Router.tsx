import Dashboard from '../pages/dashboard/Dashboard';
import Login from '../pages/login/Login';
import NotFound from '../pages/not-found/NotFound';
import { Route, Routes } from 'react-router-dom';
import OpenedRoutes from './components/OpenRoutes';
import ProtectedRoutes from './components/ProtectedRoutes';
import { routes } from './routes';
import Welcome from '../pages/dashboard/modules/welcome/Welcome';
import AccessControl from '../pages/dashboard/modules/access-control/AccessControl';
import Search from '../pages/dashboard/modules/search/Search';
import Complain from '../pages/dashboard/modules/complain/Complain';
import Inbox from '../pages/dashboard/modules/inbox/Inbox';

const { login, notFound, dashboard, welcome, accessControl, search, complain, inbox } = routes;

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
          <Route path={search.path} element={<Search />} />
          <Route path={complain.path} element={<Complain />} />
          <Route path={inbox.path} element={<Inbox />} />
        </Route>
      </Route>
      <Route path={notFound.path} element={<NotFound />} />
    </Routes>
  );
}

export default Router;
