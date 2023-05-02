import { Icon } from '../..';
import StyledTitle from './Title.styled';
import { TitleProps } from './Title.types';

export default function Title({ text, icon, variant, size, marginBottom }: TitleProps) {
  return (
    <StyledTitle className="im-title" variant={variant} size={size} marginBottom={marginBottom}>
      {icon && <Icon icon={icon} />}
      <h3>{text}</h3>
    </StyledTitle>
  );
}
