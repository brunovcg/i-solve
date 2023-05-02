import styled from 'styled-components';
import { IconSize } from '../icon/Icon.types';
import { ButtonIconVariant, StyledButtonIconProps } from './ButtonIcon.types';

const getDimension = (size: IconSize) => {
  const sizes = {
    small: '15px',
    medium: '28px',
    large: '40px;',
  };

  return sizes[(size as keyof object) ?? 'medium'];
};

const getFontSize = (size: IconSize) => {
  const sizes = {
    small: '12px',
    medium: '17.8px',
    large: '23px;',
  };

  return sizes[(size as keyof object) ?? 'medium'];
};

const handleVariant = (variant: ButtonIconVariant) => {
  const variants = {
    valid: 'var(--valid-color)',
    error: 'var(--error-color)',
    warning: 'var(--warning-color)',
    primary: 'var(--primary-color)',
    ['primary-dark']: 'var(--primary-dark-color)',
  };

  const selected = variants[variant as keyof typeof variants];

  return { background: 'var(--container-white-color)', borderColor: selected, color: selected };
};

const handleBorder = (props: { variant?: ButtonIconVariant; borderColor?: string }) => {
  if (props.variant) {
    return `1px solid ${handleVariant(props.variant).borderColor}`;
  } else if (props.borderColor) {
    return `1px solid ${props.borderColor}}`;
  }
  return 'none';
};

export const StyledButtonIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .im-button-icon-label {
    font-size: 13px;
    font-weight: bold;
  }
`;

export const StyledButtonIcon = styled.button<StyledButtonIconProps>`
  display: flex;
  visibility: ${(props) => (props.hide ? 'hidden' : 'visible')};
  justify-content: center;
  align-items: center;
  border: ${(props) => handleBorder(props)};
  border-radius: 50%;
  background-color: ${(props) => (props.variant ? handleVariant(props.variant).background : props.backgroundColor)};
  width: ${(props) => getDimension(props.size)};
  height: ${(props) => getDimension(props.size)};
  position: relative;
  margin: 0 3px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  .im-icon {
    color: ${(props) => (props.variant ? handleVariant(props.variant).color : props.color)};
    font-size: ${(props) => getFontSize(props.size)};
    opacity: 84%;
  }

  &:hover:not(span) {
    background-color: ${(props) => !props.disabled && 'var(--button-icon-hover-color)'};
    opacity: ${(props) => !props.disabled && '54%'};
  }
`;
