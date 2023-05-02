import styled from 'styled-components';
import { configs } from '../../../../configs';

const { zIndexes } = configs;

const StyledDrawer = styled.div`
  border-right: 1px solid var(--border-color);
  width: 230px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 2s width;
  position: relative;
  background-color: var(--container-medium-color);
  box-shadow: var(--inset-box-shadow);

  .im-drawer-title {
    margin-top: 40px;
    text-align: center;
    color: var(--typeface-medium-color);
    font-size: 11px;
    padding-bottom: 5px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--border-color);
    width: 80%;
  }

  .im-drawer-button-icon {
    border: 1px solid var(--border-color);
    background-color: var(--container-light-color);
    position: absolute;
    right: 0;
    margin-top: 55px;
    margin-right: -15px;
    opacity: 0%;
    &:hover {
      background-color: var(--primary-color);
      .im-icon {
        color: var(--typeface-white-color);
      }
    }
  }

  .im-drawer-menu {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 0 16px;

    .im-drawer-menu-option {
      width: 190px;
      display: flex;
      height: 40px;
      color: var(--typeface-medium-color);
      align-items: center;
      padding: 0 10px;
      justify-content: flex-start;
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
      transition: width 2s, padding 2s;
      border-radius: var(--container-border-radius);

      .im-drawer-menu-option-text {
        width: 100%;
        overflow: hidden;
        font-size: 12px;
        font-weight: bold;
        white-space: nowrap;
        margin-left: 10px;
        height: 100%;
        display: flex;
        align-items: center;
      }

      &:hover:not(.im-selected) {
        background-color: var(--container-hover-color);
      }

      &.im-selected {
        background-color: var(--primary-color);
        color: var(--typeface-white-color);
        transition: padding 2s, width 2s;
      }
    }
  }

  &:hover {
    .im-drawer-button-icon {
      opacity: 100%;
      transition: opacity 0.3s;
    }
  }

  &.im-collapsed {
    width: 80px;
    transition: width 2s;

    .im-drawer-menu-option {
      width: 40px;
      transition: padding 2s, width 2s;
    }
  }

  &.im-drawer-mobile {
    position: absolute;
    z-index: ${zIndexes.dashboard.mobileDrawer};

    .im-drawer-button-icon {
      opacity: 100%;
    }

    .im-drawer-menu {
      .im-drawer-menu-option {
        height: 35px;
      }
    }

    &.im-collapsed {
      width: 50px;
      .im-drawer-menu {
        .im-drawer-menu-option {
          width: 35px;
          padding-left: 8px;
        }
      }
    }
  }
`;

export default StyledDrawer;
