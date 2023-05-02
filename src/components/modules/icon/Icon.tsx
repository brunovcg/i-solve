import { IconProps } from './Icon.types';
import StyledIcon from './Icon.styled';
import { forwardRef, ForwardedRef } from 'react';
import { jsxHelper } from '../../../helpers';

const { conditionalClasses } = jsxHelper;

function Icon(
  {
    icon,
    size = 'small',
    color,
    margin = '0',
    className = '',
    hoverColor,
    disabled = false,
    error = false,
    customSize,
    ...rest
  }: IconProps,
  ref: ForwardedRef<HTMLSpanElement>
) {
  const iconClasses = conditionalClasses({
    ['im-icon icon material-symbols-outlined']: true,
    [`${className}`]: !!className,
  });

  return (
    <StyledIcon
      ref={ref}
      hoverColor={hoverColor}
      color={color}
      size={size}
      className={iconClasses}
      margin={margin}
      disabled={disabled}
      error={error}
      customSize={customSize}
      {...rest}
    >
      {icon}
    </StyledIcon>
  );
}

export default forwardRef(Icon);
