import styled, { css } from 'styled-components';
import { StyledPopoverContentProps, StyledPopoverTriggerProps, StyledPopoverProps } from './Popover.types';

export const StyledPopover = styled.div<StyledPopoverProps>`
  width: ${(props) => props.width};
`;

export const StyledPopoverContent = styled.div<StyledPopoverContentProps>`
  background-color: var(--typeface-white-color);
  min-height: 80px;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid var(--border-color);
  box-shadow: var(--container-box-shadow);
  border-radius: var(--container-border-radius);
  padding-top: 30px;

  .im-popover-close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    position: absolute;
    right: 0;
    top: 0;
    margin: 5px 5px 0 0;

    .im-popover-close-icon {
      font-size: 16px;
    }

    &:hover {
      background-color: var(--button-icon-hover-color);
    }
  }

  .im-popover-title {
    padding: 0px 15px 10px 15px;
    font-size: 14px;
    font-weight: bold;
    color: var(--typeface-medium-color);
  }

  .im-popover-content {
    padding: 5px 15px 15px 15px;

    ${(props) =>
      css`
        ${props.contentStyle}
      `}
  }
`;

export const StyledPopoverTrigger = styled.div<StyledPopoverTriggerProps>`
  border: none;
  background-color: var(--transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
