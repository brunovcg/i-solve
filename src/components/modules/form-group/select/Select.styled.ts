import styled from 'styled-components';
import { StyledSelectProps } from './Select.types';
import { configs } from '../../../../configs';

const { zIndexes } = configs;

const getIconsWrapperWidth = (canClear: boolean, canReset: boolean) => {
  let width = 30;

  if (canClear) {
    width += 35;
  }
  if (canReset) {
    width += 35;
  }

  return `${width}px`;
};

const StyledSelect = styled.div<StyledSelectProps>`
  width: ${(props) => props.width ?? '100%'};
  max-width: ${(props) => props.maxWidth ?? '100%'};
  height: ${(props) => props.height ?? '40px'};
  position: relative;

  &.im-open:not(.im-disabled) {
    .im-select-option-list-wrapper {
      box-shadow: var(--container-box-shadow);
    }
  }

  &.im-loading {
    .im-select-display {
      cursor: wait;
    }
  }

  &.im-disabled {
    .im-select-display {
      cursor: not-allowed;
    }
  }

  .im-select-display {
    display: flex;
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    cursor: pointer;

    &.im-select-display-placeholder {
      color: var(--placeholder-color);
      font-size: 14px;
    }

    .im-select-display-values {
      flex: 1;
      display: flex;
      justify-content: start;
      gap: 5px;
      overflow: hidden;
      height: 100%;
      align-items: center;

      .im-select-rest-options {
        display: flex;
        align-items: center;
        color: var(--typeface-medium-color);
        font-size: 15px;
      }
    }

    .im-select-display-icons {
      display: flex;
      align-items: center;
      width: ${(props) => getIconsWrapperWidth(!!props.canClear, !!props.canReset)};
      color: var(--placeholder-color);
    }
  }

  .im-multiselect {
    font-size: 11px;
  }

  .im-selection-checkbox-wrapper {
    margin-bottom: 10px;
  }

  .im-select-option-list-wrapper {
    width: ${(props) => `${props.listWidth}px`};
    background: var(--container-medium-color);
    z-index: ${zIndexes.select};
    border: 1px solid var(--border-color);
    border-radius: var(--container-border-radius);
    max-height: ${(props) => props.listMaxHeight ?? '220px'};
    overflow: hidden;
    padding: 10px;
    display: flex;
    flex-direction: column;

    .im-select-search-wrapper {
      display: flex;
      margin-bottom: 10px;
      height: 40px;
      align-items: center;
      border-radius: var(--container-border-radius);
    }

    .im-selection-option-list {
      max-height: inherit;
      border: 1px solid var(--border-color);
      overflow-y: auto;
      flex: 1;
      border-radius: var(--container-border-radius);
      background-color: var(--container-light-color);

      .im-select-option {
        cursor: pointer;
        height: 30px;
        display: flex;
        align-items: center;
        padding: 0 5px;
        font-size: 14px;
        color: var(--typeface-medium-color);

        &:hover {
          background-color: var(--container-hover-color);
        }

        &.im-select-option-selected {
          color: var(--primary-color);
        }
      }

      .im-select-no-matches {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: var(--error-color);
        font-size: 14px;
      }
    }
  }
`;

export default StyledSelect;
