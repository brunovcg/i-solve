import styled from 'styled-components';
import { ImLogoProps, ImLogoSizeTypes } from './ImLogo.types';

const getWidth = (size: ImLogoSizeTypes) => {
  const sizes = {
    'small': '200px',
    'medium': '300px',
    'large': '400px',
    'fit-container': '100%',
  };

  return sizes[size as keyof object];
};

const StyledImLogo = styled.figure<ImLogoProps>`
  img {
    width: ${(props) => getWidth(props.size)};
  }
`;

export default StyledImLogo;
