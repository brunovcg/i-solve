import styled from 'styled-components';
import { StyledMessageContainerProps } from './MessageContainer.types';

const StyledMessageContainer = styled.div<StyledMessageContainerProps>`
  width: ${(props) => props.width};
  .im-container.im-container-info {
    padding: 10px;
    font-size: ${(props) => props.fontSize};
    font-weight: bold;
    text-align: justify;
    line-height: 1.3;

    display: flex;
    gap: 10px;

    .im-container-info-icon {
      display: flex;
      align-items: center;
    }

    .im-container-info-text {
      display: flex;
      align-items: center;
    }
  }

  .im-container.im-container-info.im-info {
    color: var(--primary-color);
  }

  .im-container.im-container-info.im-error {
    color: var(--error-color);
  }

  .im-container.im-container-info.im-valid {
    color: var(--valid-color);
  }

  .im-container.im-container-info.im-warning {
    color: var(--warning-color);
  }
`;

export default StyledMessageContainer;
