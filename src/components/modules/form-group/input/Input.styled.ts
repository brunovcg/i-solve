import styled from 'styled-components';
import { StyledInputProps } from './Input.types';

const StyledInput = styled.div<StyledInputProps>`
  width: ${(props) => props.width ?? '100%'};
  max-width: ${(props) => props.maxWidth ?? '100%'};

  &.im-valid {
    .im-input-body {
      .im-input-field {
        color: var(--valid-color);
      }
    }
  }

  .im-input-header,
  .im-input-body,
  .im-input-footer {
    display: flex;
    width: 100%;
  }

  .im-input-header,
  .im-input-footer {
    padding: 0 15px;
  }

  .im-input-header {
    height: 25px;
    width: 100%;
    justify-content: end;
    margin-bottom: 5px;

    .im-input-remaining-characters {
      display: flex;
      align-items: flex-end;
    }
  }

  .im-input-body {
    align-items: center;
    height: ${(props) => props.height ?? '40px'};
    display: flex;

    .im-input-field {
      height: 100%;
      font-size: 14px;
      border: none;
      width: 100%;
      padding-left: 10px;
      background: var(--transparent);

      ::placeholder {
        color: var(--placeholder-color);
      }
    }

    .im-input-search {
      width: 35px;
    }
  }

  .im-input-footer {
    flex-direction: column;
    gap: 5px;
    margin-top: 5px;
    height: 25px;

    .im-input-info,
    .im-input-error {
      font-size: 14px;
    }

    .im-input-info {
      color: var(--typeface-light);
    }
  }

  .im-disabled {
    .im-input-remaining-characters,
    .im-input-field::placeholder,
    .im-input-info {
      color: var(--disabled-color);
    }

    .im-input-field {
      cursor: not-allowed;
    }
  }
`;

export default StyledInput;
