import styled from 'styled-components';
import { configs } from '../../configs';

const { mobileBreakpoint } = configs.resolutions;

const StyledDashboard = styled.div`
  height: 100%;
  display: flex;
  width: 100%;
  @media (max-width: ${mobileBreakpoint}) {
    position: relative;
  }

  .im-dashboard-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 35px;
    display: flex;
    flex-direction: column;

    @media (max-width: ${mobileBreakpoint}) {
      padding: 20px;
      margin-left: 50px;
    }
  }
`;

export default StyledDashboard;
