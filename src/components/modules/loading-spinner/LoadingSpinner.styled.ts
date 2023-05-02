import styled from 'styled-components';

const StyledLoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .im-loading-spinner-message {
    font-size: 20px;
    color: var(--typeface-medium-color);
  }
`;

export default StyledLoadingSpinner;
