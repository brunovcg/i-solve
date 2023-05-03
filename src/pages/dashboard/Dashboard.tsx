import StyledDashboard from './Dashboard.styled';
import { Outlet } from 'react-router-dom';
import Drawer from './components/drawer/Drawer';
import { routes } from '../../router/routes';
import useDashboardDrawer from './hooks/useDashboardDrawer';
import { Title } from '../../components';
import { useRoutes } from '../../hooks';

export default function Dashboard() {
  const { dashboard, accessControl, search, complain, inbox } = routes;
  const { currentRoutePath } = useRoutes();
  const { drawerMenu } = useDashboardDrawer();

  const moduleSelection = {
    [dashboard.path]: 'Dashboard',
    [accessControl.path]: 'Controle de Acesso',
    [complain.path]: 'Reclamar',
    [search.path]: 'Consultar Sistemas',
    [inbox.path]: 'Caixa de Entrada',
  };

  const currentSelectedModule = moduleSelection[currentRoutePath as keyof typeof moduleSelection];

  return (
    <StyledDashboard className="im-dashboard">
      <Drawer title="Módulos" menu={drawerMenu} initialSelection={currentSelectedModule} titleInitials="Módulos" />
      <div className="im-dashboard-content">
        <Title text={currentSelectedModule} size="large" variant="primary-dark" marginBottom="40px" />
        <Outlet />
      </div>
    </StyledDashboard>
  );
}
