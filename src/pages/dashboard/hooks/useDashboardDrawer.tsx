import { useNavigate } from 'react-router-dom';
import { CONSTANTS } from '../../../constants';
import { routes } from '../../../router/routes';
import { useContext } from 'react';
import { UserContext } from '../../../contexts';

const { DASHBOARD, LOCK, SEARCH, SUPPORT_AGENT, MAIL } = CONSTANTS.GOOGLE_ICONS;

export default function useDashboardDrawer() {
  const navigate = useNavigate();

  const { accessControl, welcome, search, complain, inbox } = routes;
  const { isUserCustomer, isUserRegularUser, isUserAdmin } = useContext(UserContext);

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
      permit: isUserRegularUser || isUserAdmin,
      icon: SEARCH,
      text: 'Consultar Sistemas',
      onClick: () => handleMenuOptionClick(search.path),
    },
    {
      id: 3,
      permit: isUserAdmin,
      icon: LOCK,
      text: 'Controle de Acesso',
      onClick: () => handleMenuOptionClick(accessControl.path),
    },
    {
      id: 4,
      permit: isUserCustomer,
      icon: SUPPORT_AGENT,
      text: 'Reclamar',
      onClick: () => handleMenuOptionClick(complain.path),
    },
    {
      id: 5,
      permit: isUserRegularUser,
      icon: MAIL,
      text: 'Caixa de Entrada',
      onClick: () => handleMenuOptionClick(inbox.path),
    },
  ];
  return { drawerMenu };
}
