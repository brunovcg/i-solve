import { StyledButtonIcon, StyledButtonIconWrapper } from './ButtonIcon.styled';
import { Icon } from '../..';
import { ButtonIconProps } from './ButtonIcon.types';
import { MouseEvent } from 'react';
import { jsxHelper } from '../../../helpers';

const { conditionalClasses } = jsxHelper;

function ButtonIcon({
  icon,
  backgroundColor = 'var(--transparent)',
  hoverBackgroundColor,
  hoverColor,
  onClick,
  label,
  variant,
  color = 'var(--typeface-light)',
  size = 'medium',
  margin = '0',
  className = '',
  borderColor,
  error,
  disabled,
  hide,
}: ButtonIconProps) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
  };

  const classes = conditionalClasses({
    ['im-button-icon']: true,
    [`${className}`]: !!className,
  });

  return (
    <StyledButtonIconWrapper>
      <StyledButtonIcon
        hoverBackgroundColor={hoverBackgroundColor}
        backgroundColor={backgroundColor}
        className={classes}
        size={size}
        onClick={handleClick}
        disabled={disabled}
        hide={hide}
        borderColor={borderColor}
        variant={variant}
      >
        <Icon hoverColor={hoverColor} size={size} icon={icon} error={error} disabled={disabled} margin={margin} color={color} />
      </StyledButtonIcon>
      {label && <p className="im-button-icon-label">{label}</p>}
    </StyledButtonIconWrapper>
  );
}

export default ButtonIcon;
