import { HeaderProps } from './Header.types';
import { StyledHeader, StyledMenuItem } from './Header.styled';
import { ImLogo, Avatar, Popover, Icon, Tooltip } from '../../../components';
import { CONSTANTS } from '../../../constants';
import { UserContext } from '../../../contexts';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../router/routes';
import { useContext } from 'react';

const { LOGOUT } = CONSTANTS.GOOGLE_ICONS;

export default function Header({ menu }: HeaderProps) {
  const { isUserLogged, signOut, user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate(routes.login.path);
  };

  const menuItems = [{ id: 1, text: 'Sair', icon: LOGOUT, click: handleLogout }];

  const userMenuContent = (
    <StyledMenuItem className="im-header-user-menu">
      <div className="im-user-mane-username">{user?.username}</div>
      {menuItems.map((item) => (
        <button className="im-header-user-menu-item" key={item.id} onClick={item.click}>
          <Icon icon={item.icon} />
          {item.text}
        </button>
      ))}
    </StyledMenuItem>
  );

  return (
    <StyledHeader className="im-header">
      <ImLogo size="small" />
      <nav>
        {menu?.map((item: { components: string; id: string }) => (
          <div key={item.id}>{item.components}</div>
        ))}
      </nav>
      {isUserLogged && (
        <Popover
          trigger={<Tooltip content={user.username} trigger={<Avatar username={user?.username} />} side="bottom" />}
          content={userMenuContent}
        />
      )}
    </StyledHeader>
  );
}
