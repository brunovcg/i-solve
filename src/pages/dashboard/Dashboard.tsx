import StyledDashboard from './Dashboard.styled';
import { Outlet } from 'react-router-dom';
import Drawer from './components/drawer/Drawer';
import { routes } from '../../router/routes';
import useDashboardDrawer from './hooks/useDashboardDrawer';
import { Title } from '../../components';
import { useRoutes } from '../../hooks';

export default function Dashboard() {
  const { dashboard, accessControl, processRunner } = routes;
  const { currentRoutePath } = useRoutes();
  const { drawerMenu } = useDashboardDrawer();

  const moduleSelection = {
    [dashboard.path]: 'Dashboard',
    [accessControl.path]: 'Controle de Acesso',
    [processRunner.path]: 'Process Runner',
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
