import { useNavigate } from 'react-router-dom';
import { CONSTANTS } from '../../../constants';
import { routes } from '../../../router/routes';
// import { useContext } from 'react';
// import { UserContext } from '../../../contexts';

const { DASHBOARD, LOCK, GEAR, SUPPORT_AGENT } = CONSTANTS.GOOGLE_ICONS;

export default function useDashboardDrawer() {
  const navigate = useNavigate();

  const { accessControl, welcome, processRunner, complain } = routes;
  // const { isUserAdmin } = useContext(UserContext);

  const handleMenuOptionClick = (navigationPath: string) => {
    navigate(navigationPath);
  };

  const drawerMenu = [
    {
      id: 1,
      permit: true,
      icon: DASHBOARD,
      text: 'Dashboard',
      onClick: () => handleMenuOptionClick(welcome.path),
    },
    {
      id: 2,
      permit: true,
      icon: GEAR,
      text: 'Consulta',
      onClick: () => handleMenuOptionClick(processRunner.path),
    },
    {
      id: 3,
      permit: true,
      icon: LOCK,
      text: 'Controle de Acesso',
      onClick: () => handleMenuOptionClick(accessControl.path),
    },
    {
      id: 4,
      permit: true,
      icon: SUPPORT_AGENT,
      text: 'Reclamar',
      onClick: () => handleMenuOptionClick(complain.path),
    },
  ];
  return { drawerMenu };
}
