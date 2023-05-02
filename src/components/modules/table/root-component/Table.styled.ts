import styled, { css } from 'styled-components';
import { StyledTableTypes, StyledColumnHeaderTypes, StyledColumnDataTypes } from './Table.types';
import { configs } from '../../../../configs';

const { zIndexes } = configs;

export const StyledTable = styled.div<StyledTableTypes>`
  width: 100%;

  .im-table-info {
    color: var(--typeface-primary-color);
    font-size: 13px;
    padding-left: 5px;
    padding-bottom: 3px;
    min-height: 14px;
    display: flex;
    justify-content: flex-start;
  }

  .im-table-wrapper {
    width: 100%;
    height: ${(props) => props.tableHeight};
    overflow-x: auto;
    border: 1px solid var(--border-color);
    border-radius: var(--container-border-radius);
  }

  table {
    border-collapse: collapse;
    text-align: center;
    width: 100%;
    table-layout: ${(props) => (props.stickColumn || !props.manualWidth ? 'auto' : 'fixed')};
  }

  table thead {
    z-index: ${zIndexes.table.thead};
    ${(props) =>
      props.stickHeader &&
      css`
        position: sticky;
        top: 0;
      `}
  }

  table td,
  table th {
    border: 1px solid var(--border-color);
    padding: 8px;
    vertical-align: middle;
    color: var(--typeface-medium-color);
    font-size: 14px;
  }

  table tbody tr td {
    ${(props) =>
      css`
        ${props.rowStyles?.row}
      `}
  }

  table tr:nth-child(even) td {
    background: var(--table-even-color);
    ${(props) =>
      css`
        ${props.rowStyles?.even}
      `}
  }

  table tr:nth-child(odd) td {
    background: var(--table-odd-color);
    ${(props) =>
      css`
        ${props.rowStyles?.odd}
      `}
  }

  table tr:hover td {
    background: var(--table-hover-background-color);
    color: var(--table-hover-color);
    /* font-weight: bold; */
    ${(props) =>
      css`
        ${props.rowStyles?.hover}
      `}
    cursor: ${(props) => props.clickableRow && 'pointer'};
  }

  table tr td.im-table-sticky-column {
    border-right-width: 6px;
    border-right-color: var(--table-sticky-border-color);
  }

  table th {
    padding-top: 12px;
    padding-bottom: 12px;
    overflow: hidden;
    vertical-align: middle;
    background-color: var(--table-header-color);
    ${(props) =>
      css`
        ${props.headerStyles}
      `}
  }

  table tr th {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;

    ${(props) =>
      !props.manualWidth &&
      !props.stickColumn &&
      css`
        display: table-cell;
      `}
  }

  table tr th.im-table-sticky-column {
    border-right-width: 6px;
    border-right-color: var(--table-sticky-border-color);
  }

  .im-table-th {
    .im-table-th-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &.sticky {
    overflow: scroll;
    thead {
      position: sticky;
      z-index: ${zIndexes.table.thead};
      width: fit-content;
    }

    thead {
      top: 0;
      box-shadow: 0px 3px 3px #ccc;
    }

    tbody {
      position: relative;
      z-index: ${zIndexes.table.tbody};
    }

    [data-sticky-td] {
      position: sticky;
      left: 0;
    }

    [data-sticky-last-left-td] {
      box-shadow: 2px 0px 3px #ccc;
    }

    [data-sticky-first-right-td] {
      box-shadow: -2px 0px 3px #ccc;
    }
  }

  .im-table-no-data {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    border: 2px solid var(--border-color);
    font-size: 20px;
    font-weight: bold;
    color: var(--error-color);
    border-radius: var(--container-border-radius);
  }

  .im-table-loading {
    border: 2px solid var(--border-color);
    border-radius: var(--container-border-radius);
    padding: 30px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const StyledColumnHeader = styled.th<StyledColumnHeaderTypes>`
  width: ${(props) => (props.width ? `${props.width}px` : 'auto')};
  align-items: center;
  justify-content: center;

  ${(props) =>
    !props.manualWidth &&
    !props.stickColumn &&
    css`
      display: table-cell;
    `}
`;

export const StyledColumnData = styled.td<StyledColumnDataTypes>`
  width: ${(props) => (props.width ? `${props.width}px` : 'auto')};
`;
