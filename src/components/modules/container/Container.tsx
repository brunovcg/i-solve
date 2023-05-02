import { forwardRef, ForwardedRef } from 'react';
import StyledContainer from './Container.styled';
import { ContainerProps } from './Container.types';
import { jsxHelper } from '../../../helpers';

const { conditionalClasses } = jsxHelper;

function Container(
  {
    label,
    variant,
    disabled = false,
    error = false,
    warning = false,
    primary = false,
    valid = false,
    hoverable,
    focus,
    className,
    children,
    htmlFor,
    onClick,
    width,
    height,
    overflowX,
    overflowY,
    optionalLabel,
    ...rest
  }: ContainerProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const classesContainer = conditionalClasses({
    ['im-container']: true,
    ['im-disabled']: disabled,
    ['im-errored']: error,
    ['im-warning']: warning,
    ['im-hoverable']: hoverable,
    ['im-focused']: focus,
    ['im-valid']: valid,
    ['im-primary']: primary,
    [`${className}`]: !!className,
  });

  const labelRenderer = () => {
    if (htmlFor || optionalLabel) {
      return (
        <label htmlFor={htmlFor} className="im-label-container-label">
          {label}
          {label && optionalLabel && <>&nbsp;</>}
          {optionalLabel && 'Opcional'}
        </label>
      );
    }

    return <span className="im-label-container-label">{label}</span>;
  };

  return (
    <StyledContainer
      {...rest}
      variant={variant}
      className={classesContainer}
      ref={ref}
      onClick={onClick}
      width={width}
      height={height}
      overflowX={overflowX}
      overflowY={overflowY}
    >
      {children}
      {(label || optionalLabel) && labelRenderer()}
    </StyledContainer>
  );
}

export default forwardRef(Container);
