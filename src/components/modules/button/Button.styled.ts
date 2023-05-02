import styled from 'styled-components';
import { ButtonType, StyledButtonProps } from './Button.type';

const getVariant = (variant: ButtonType, disabled: boolean) => {
  const background = {
    primary: disabled ? 'var(--disabled-color)' : 'var(--primary-color)',
    valid: disabled ? 'var(--disabled-color)' : 'var(--valid-color)',
    outlined: 'var(--typeface-white-color)',
    cancel: disabled ? 'var(--disabled-color)' : 'var(--error-color)',
    text: 'var(--transparent)',
  };

  const color = {
    primary: 'var(--typeface-white-color)',
    valid: 'var(--typeface-white-color)',
    outlined: disabled ? 'var(--disabled-color)' : 'var(--primary-color)',
    cancel: 'var(--typeface-white-color)',
    text: disabled ? 'var(--disabled-color)' : 'var(--primary-color)',
  };

  const border = {
    primary: `1px solid ${disabled ? 'var(--disabled-color)' : 'var(--primary-color)'}`,
    valid: `1px solid ${disabled ? 'var(--disabled-color)' : 'var(--valid-color)'}`,
    outlined: `1px solid ${disabled ? 'var(--disabled-color)' : 'var(--primary-color)'}`,
    cancel: `1px solid ${disabled ? 'var(--disabled-color)' : 'var(--error-color)'}`,
    text: '1px solid var(--transparent)',
  };

  return {
    background: background[variant as keyof object],
    color: color[variant as keyof object],
    border: border[variant as keyof object],
  };
};

const StyledButton = styled.button<StyledButtonProps>`
  background: ${(props) => getVariant(props.variant ?? 'primary', !!props.disabled).background};
  border: ${(props) => getVariant(props.variant ?? 'primary', !!props.disabled).border};
  color: ${(props) => getVariant(props.variant ?? 'primary', !!props.disabled).color};
  font-weight: bold;
  padding: ${(props) => (props.small ? '0' : '8px 20px')};
  font-size: ${(props) => (props.small ? '12px' : '16px')};
  width: ${(props) => props.width ?? props.round ?? 'fit-content'};
  height: ${(props) => (props.small ? 'fit-content' : props.height ?? props.round ?? '40px')};
  border-radius: ${(props) => (props.round ? '50%' : 'var(--button-border-radius)')};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  gap: 5px;
  &:hover:not(.im-loading) {
    opacity: ${(props) => (!props.disabled ? '80%' : undefined)};
  }

  &.im-loading {
    background: var(--container-white-color);
    border: ${(props) => getVariant(props.variant ?? 'primary', false)};
    .im-button-loading {
      margin-top: 3px;
    }
  }
`;

export default StyledButton;
