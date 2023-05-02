import StyledAvatar from './Avatar.styled';
import { AvatarProps } from './Avatar.types';
import { jsxHelper } from '../../../helpers';

const { conditionalClasses } = jsxHelper;

export default function Avatar({ username, size = 'large', active }: AvatarProps) {
  const getInitials = () => {
    const fullName = username?.split(' ');
    if (fullName) {
      const firstNameInitial = fullName[0][0];
      const lastNameInitial = fullName.length > 1 ? fullName.at(-1)?.[0] : null;
      return lastNameInitial ? firstNameInitial + lastNameInitial : firstNameInitial;
    }
    return '';
  };

  const avatarClasses = conditionalClasses({
    ['im-avatar']: true,
    ['im-active']: active,
  });

  return (
    <StyledAvatar className={avatarClasses} size={size}>
      {getInitials()?.toUpperCase()}
    </StyledAvatar>
  );
}
