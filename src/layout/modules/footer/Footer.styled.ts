import styled from 'styled-components';
import { configs } from '../../../configs';

const { mobileBreakpoint } = configs.resolutions;

const StyledFooter = styled.footer`
  height: 30px;
  width: 100%;
  background-color: var(--container-white-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 50px;
  color: var(--typeface-medium-color);
  font-size: 11px;
  border-top: 1px solid var(--border-color);

  @media (max-width: ${mobileBreakpoint}) {
    display: flex;
    flex-direction: column;
  }
`;

export default StyledFooter;
