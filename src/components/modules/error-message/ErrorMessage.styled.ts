import styled from 'styled-components';
import { StyledErrorMessageProps } from './ErrorMessage.types';

const StyledErrorMessage = styled.div<StyledErrorMessageProps>`
  width: ${(props) => props.width ?? '100%'};
  color: red;
  font-size: 14px;
  height: 15px;
  margin: ${(props) => props.margin};
`;

export default StyledErrorMessage;
