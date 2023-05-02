import styled from 'styled-components';

const StyledRemainingCharacters = styled.div`
  font-size: 10px;
  font-weight: bold;
  color: var(--typeface-light-color);
  display: flex;
  justify-content: end;
  align-items: end;

  .im-remaining-no-characters {
    color: var(--error-color);
  }
`;

export default StyledRemainingCharacters;
