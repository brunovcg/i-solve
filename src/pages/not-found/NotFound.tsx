import { Button, LoadingSpinner } from '../../components';
import StyledNotFound from './NotFound.styled';
import { CONSTANTS } from '../../constants';
import { UserContext } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../router/routes';
import { useContext } from 'react';

const { UNDO } = CONSTANTS.GOOGLE_ICONS;

export default function NotFound() {
  const { isUserLogged } = useContext(UserContext);
  const navigate = useNavigate();
  const buttonMessage = isUserLogged ? 'Retornar para painel' : 'Fazer o login';
  const { dashboard, login } = routes;

  const navigateRoute = isUserLogged ? dashboard.path : login.path;

  return (
    <StyledNotFound>
      <LoadingSpinner size="large" />
      <p>Página não encontrada...</p>
      <Button text={buttonMessage} icon={UNDO} onClick={() => navigate(navigateRoute)} />
    </StyledNotFound>
  );
}
