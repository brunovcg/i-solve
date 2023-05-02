import styled from 'styled-components';
import { StyledTitleProps, TitleSize, TitleVariant } from './Title.types';

const handleVariant = (variant?: TitleVariant) => {
  const variants = {
    valid: 'var(--valid-color)',
    error: 'var(--error-color)',
    warning: 'var(--warning-color)',
    primary: 'var(--primary-color)',
    ['primary-dark']: 'var(--primary-dark-color)',
    dark: 'var(--typeface-medium-color)',
  };

  return variants[(variant as keyof typeof variants) ?? 'dark'];
};

const handleSize = (size?: TitleSize) => {
  const sizes = {
    small: { icon: '18px', font: '16px' },
    medium: { icon: '20px', font: '18px' },
    large: { icon: '24px', font: '22px' },
    huge: { icon: '28px', font: '26px' },
  };

  return sizes[(size as keyof typeof sizes) ?? 'medium'];
};

const StyledTitle = styled.div<StyledTitleProps>`
  word-break: break-word;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  margin-bottom: ${(props) => props.marginBottom ?? '20px'};
  h3 {
    color: ${(props) => handleVariant(props.variant)};
    font-size: ${(props) => handleSize(props.size).font};
  }

  .im-icon {
    color: ${(props) => handleVariant(props.variant)};
    font-size: ${(props) => handleSize(props.size).icon};
  }
`;

export default StyledTitle;
