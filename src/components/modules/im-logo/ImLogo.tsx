import LOGO from '../../../assets/images/isolve.png';
import GEAR from '../../../assets/images/logo-white.png';
import StyledImLogo from './ImLogo.styled';
import { ImLogoProps } from './ImLogo.types';

export default function ImLogo({ size, type = 'logo' }: ImLogoProps) {
  return (
    <StyledImLogo className="im-logo" size={size}>
      <img src={type === 'logo' ? LOGO : GEAR} alt="IM - Logo" />
    </StyledImLogo>
  );
}
