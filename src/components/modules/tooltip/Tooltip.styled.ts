import styled from 'styled-components';
import { configs } from '../../../configs';

const { zIndexes } = configs;

export const StyledTooltip = styled.div`
  .im-tooltip-content {
    border: 1px solid var(--border-dark-color);
    background-color: var(--container-dark-color);
    border-radius: var(--container-border-radius);
    box-shadow: var(--container-box-shadow);
    padding: 8px;
    z-index: ${zIndexes.tooltip};
    color: var(--typeface-white-color);
    font-weight: bold;
    font-size: 12px;
    top: 0;
    white-space: nowrap;
  }
`;
