import styled from 'styled-components';
import { StyledDateRangePickerProps } from './DateRangePicker.types';

export const StyledDateRangePicker = styled.div<StyledDateRangePickerProps>`
  position: relative;
  width: ${(props) => props.width ?? '100%'};

  &:not(.im-disabled) {
    .p-inputtext {
      cursor: pointer;
    }
  }

  .im-disabled {
    .p-inputtext {
      cursor: not-allowed;
      color: var(--typeface-disabled-color);
    }
  }

  .im-date-range-picker-wrapper {
    height: ${(props) => props.height ?? '40px'};
    width: 100%;
    display: flex;
    align-items: center;

    .p-calendar {
      height: 100%;
      width: 100%;

      .p-inputtext {
        height: 100%;
        border: none;
        border-radius: var(--container-border-radius);
        padding-left: 15px;
        font-size: 14px;
        background: var(--container-light-color);

        &::placeholder {
          color: var(--placeholder-color);
        }
      }

      .im-date-range-picker-calendar {
        width: 100%;

        .p-datepicker,
        .p-component {
        }
      }
    }
  }
`;
