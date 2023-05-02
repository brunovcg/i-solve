import styled from 'styled-components';

const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  &.im-disabled {
    label {
      color: var(--disabled-color);
    }
  }

  label {
    font-weight: bold;
    color: var(--typeface-medium-color);
    font-size: 12px;
    cursor: pointer;
  }
`;

export default StyledCheckbox;
