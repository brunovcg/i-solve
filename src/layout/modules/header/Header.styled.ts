import styled from 'styled-components';
import { configs } from '../../../configs';

export const StyledHeader = styled.header`
  height: 60px;
  width: 100%;
  background-color: var(--container-white-color);
  display: flex;
  align-items: center;
  padding: 0 40px 0 20px;
  justify-content: space-between;
  box-shadow: var(--container-box-shadow);
  border-bottom: 1px solid var(--border-color);

  @media (max-width: ${configs.resolutions.mobileBreakpoint}) {
    padding: 15px;
  }
`;

export const StyledMenuItem = styled.div`
  min-width: 120px;

  .im-user-mane-username {
    margin-bottom: 20px;
    color: var(--primary-color);
    font-weight: bold;
  }

  .im-header-user-menu-item {
    background: var(--transparent);
    cursor: pointer;
    border: none;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    width: 100%;
    height: 30px;
    color: var(--error-color);
    border-radius: var(--container-border-radius);
    padding-left: 10px;

    &:hover {
      background-color: var(--container-hover-color);
    }
  }
`;
