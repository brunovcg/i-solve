import styled from 'styled-components';
import { StyledDialogProps } from './Dialog.types';
import { configs } from '../../../../../configs';

const { mobileBreakpoint } = configs.resolutions;

const StyledDialog = styled.div<StyledDialogProps>`
  background-color: var(--container-light-opacity);
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  right: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;

  .im-dialog-container {
    width: ${(props) => props.width ?? 'fit-content'};
    height: ${(props) => props.height ?? 'fit-content'};
    max-height: ${(props) => props.maxHeight ?? '90vh'};
    max-width: 92vw;
    min-width: 280px;
    min-height: 240px;
    padding: 35px 20px 20px 20px;
    background: var(--container-medium-color);
    border: 1px solid var(--primary-color);
    border-radius: var(--container-border-radius);
    box-shadow: var(--container-box-shadow);
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    overflow: hidden;

    @media (max-width: ${mobileBreakpoint}) {
      max-height: 90vh;
    }

    .im-dialog-close-icon {
      position: absolute;
      top: 0;
      right: 0;
      margin: 10px 10px 0 0;
    }

    .im-dialog-title {
      height: 20px;
      font-size: 20px;
      font-weight: bold;
      color: var(--primary-dark-color);
      margin-top: 5px;
      margin-bottom: 30px;
    }

    .im-dialog-content {
      flex: 1;
    }

    .im-dialog-buttons {
      height: 40px;
      display: flex;
      gap: 15px;
      justify-content: flex-end;
    }
  }
`;

export default StyledDialog;
