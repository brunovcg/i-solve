import styled from 'styled-components';
import { ContainerVariants, StyledContainerProps } from './Container.types';

const getBackground = (variant: ContainerVariants) => {
  const variants = {
    white: 'var(--container-white-color)',
    light: 'var(--container-light-color)',
    regular: 'var(--container-regular-color)',
  };

  return variants[variant as keyof typeof variants];
};

const StyledContainer = styled.div<StyledContainerProps>`
  background: ${(props) => getBackground(props.variant ?? 'white')};
  border-radius: var(--container-border-radius);
  position: relative;
  width: ${(props) => props.width ?? '100%'};
  height: ${(props) => props.height ?? 'fit-content'};
  max-width: ${(props) => props.overflowX?.maxWidth};
  max-height: ${(props) => props.overflowY?.maxHeight};
  border-style: solid;
  border-width: 1px;
  border-color: var(--border-color);
  overflow-y: ${(props) => (props.overflowY ? 'auto' : 'initial')};
  overflow-x: ${(props) => (props.overflowX ? 'auto' : 'initial')};

  .im-label-container-label {
    background: var(--container-white-color);
    border-radius: 8px;
    position: absolute;
    top: 0;
    left: 0;
    margin: -10px 0 0 6px;
    padding: 2px 4px;
    font-size: 12px;
  }

  &:not(.im-disabled, .im-errored, .im-focused, .im-warning, .im-primary, .im-valid) {
    border-color: var(--border-color);

    .im-label-container-label {
      color: var(--typeface-light-color);
    }
  }

  &.im-hoverable:hover:not(.im-disabled, .im-errored, .im-focused, .im-warning, .im-primary, .im-valid) {
    border-color: 1px solid var(--container-hover-color);
    .im-label-container-label {
      color: var(--typeface-dark-color);
    }
  }

  &.im-errored:not(.im-disabled, .im-focused, .im-valid) {
    border-color: var(--error-color);
    .im-label-container-label {
      color: var(--error-color);
    }
  }

  &.im-primary:not(.im-disabled, .im-focused, .im-valid) {
    border-color: var(--primary-color);
    .im-label-container-label {
      color: var(--primary-color);
    }
  }

  &.im-warning:not(.im-disabled, .im-focused) {
    border-color: var(--warning-color);
    .im-label-container-label {
      color: var(--warning-color);
    }
  }

  &.im-valid:not(.im-disabled, .im-errored, .im-focused, .im-warning, .im-primary) {
    border-color: var(--valid-color);
    .im-label-container-label {
      color: var(--valid-color);
    }
  }

  &.im-focused:not(.im-disabled) {
    border-color: var(--primary-color);
    box-shadow: var(--container-box-shadow);
    .im-label-container-label {
      color: var(--primary-color);
    }
  }

  &.im-disabled {
    border-color: var(--border-disabled-color);
    cursor: not-allowed;

    .im-label-container-label {
      color: var(--disabled-color);
    }
  }
`;

export default StyledContainer;
