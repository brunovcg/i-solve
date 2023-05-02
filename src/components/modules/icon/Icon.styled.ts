import styled from 'styled-components';
import { StyledIconProps, IconSize } from './Icon.types';

const getSize = (size: IconSize) => {
  const sized = {
    tiny: '14px',
    small: '20px',
    medium: '25px',
    large: '30px',
  };

  return sized[(size as keyof object) ?? 'small'];
};

const getColor = (disabled: boolean | undefined, error: boolean | undefined, color: string | undefined) => {
  if (disabled) {
    return 'var(--disabled-color)';
  }
  if (error) {
    return 'var(--error-color)';
  }
  return color;
};

const StyledIcon = styled.span<StyledIconProps>`
  font-size: ${(props) => props.customSize ?? getSize(props.size)};
  color: ${(props) => getColor(props.disabled, props.error, props.color)};
  font-weight: bold;
  margin: ${(props) => props.margin};

  &:hover {
    color: ${(props) => getColor(props.disabled, props.error, props.hoverColor)};
  }
`;

export default StyledIcon;
