import StyledButton from './Button.styled';
import { ButtonProps } from './Button.type';
import { ForwardedRef, forwardRef, MouseEvent } from 'react';
import Icon from '../icon/Icon';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';
import { jsxHelper } from '../../../helpers';

const { conditionalClasses } = jsxHelper;

function Button(
  {
    text,
    variant,
    onClick,
    width,
    height,
    disabled = false,
    round,
    type,
    icon,
    loading,
    className,
    stopPropagation,
    preventDefault,
    small,
    ...rest
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const regularComponent = (
    <>
      {icon && <Icon icon={icon} size={small ? 'tiny' : 'small'} />}
      <span className="im-button-text">{text}</span>
    </>
  );

  const loadingComponent = <LoadingSpinner size="small" className="im-button-loading" />;

  const classes = conditionalClasses({
    ['im-button']: true,
    ['im-loading']: loading,
    [className as string]: !!className,
  });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    if (preventDefault) {
      e.preventDefault();
    }

    onClick?.(e);
  };

  return (
    <StyledButton
      className={classes}
      disabled={disabled || loading}
      onClick={handleClick}
      variant={variant}
      height={height}
      width={width}
      round={round}
      ref={ref}
      type={type ?? 'button'}
      small={small}
      {...rest}
    >
      {loading ? loadingComponent : regularComponent}
    </StyledButton>
  );
}

export default forwardRef(Button);
