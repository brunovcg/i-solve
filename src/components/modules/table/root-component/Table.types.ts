/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSObject } from 'styled-components';
import { ColumnInstance, Row } from 'react-table';
import { CONSTANTS } from '../../../../constants';
import { ChangeEvent, ReactNode } from 'react';

export type RowStyles = { odd: CSSObject; even: CSSObject; hover: CSSObject; row: CSSObject };

export type StyledTableTypes = {
  tableHeight: string;
  manualWidth: boolean;
  stickHeader: boolean;
  stickColumn: boolean;
  rowStyles?: RowStyles;
  headerStyles?: CSSObject;
  clickableRow: boolean;
};

export type StyledColumnHeaderTypes = {
  width?: string | number;
  stickColumn: string;
  manualWidth: boolean;
};

export type StyledColumnDataTypes = {
  width?: string | number;
};

export type ColumnCellProps = { value: any; row: Row<{ id: string; type: string; [key: string]: string | any }> };

type ColumnCustom =
  | { Cell: (cell: ColumnCellProps) => string | ReactNode; accessor?: string }
  | { Cell?: (cell: ColumnCellProps) => string | ReactNode; accessor: string };

export type Columns = ColumnCustom & {
  Header: string;
  Footer?: string;
  Filter?: boolean;
  sort?: boolean;
  width?: number;
  disableSortBy?: boolean;
};

export type AllTableSize = typeof CONSTANTS.COMPONENTS.TABLE.ALL_TABLE_SIZE;

export type TableProps = {
  loading?: boolean;
  sortable?: boolean;
  showGlobalFilter?: boolean;
  showColumnFilter?: boolean;
  paginate?: (number | AllTableSize)[];
  columnOrder?: string[];
  noData?: string;
  stickFromColumn?: string;
  stickHeader?: boolean;
  headerStyles?: CSSObject;
  rowStyles?: RowStyles;
  onRowClick?: (rowData: any) => void;
  tableHeight?: string;
  allowExportExcel?: boolean;
  allowExportCSV?: boolean;
  label?: string;
  filename?: string;
  tableInstance?: any;
  customFilters?: ReactNode;
  info?: string | ReactNode;
  onResetFilters?: () => void;
};

export type ColumnFilterProps = {
  column: ColumnInstance;
};

export type TableCheckboxProps = {
  indeterminate?: unknown;
  label?: string;
};

export type RowProp = {
  row: Row;
};

export type GetToggleAllRowsSelectedProps = {
  getToggleAllRowsSelectedProps: () => any;
};

export type CustomColumnType = ColumnInstance & {
  sticky: string;
};

export type ExportToExcelColumnType = {
  totalHeaderCount: number;
  Header: string;
};

export type ExportToExcelHeaderRowType = {
  value: string;
  type: string;
};

export type TablePaginationProps = {
  currentPage: number;
  pageCount: number;
  limit: number | AllTableSize;
  handleLimitChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  canPreviousPage: boolean;
  previousPage: () => void;
  canNextPage: boolean;
  nextPage: () => void;
  paginate?: (number | AllTableSize)[];
  totalResults: number;
  isUncontrolled: boolean;
};

export type TableMenuProps = {
  allColumns: ColumnInstance[];
  allowExportExcel: boolean;
  allowExportCSV: boolean;
  renderRows: any;
  headerGroups: any;
  getToggleHideAllColumnsProps: any;
  showGlobalFilter: boolean;
  globalFilter: any;
  setGlobalFilter: any;
  label?: string;
  filename?: string;
  hasFilteredValues: boolean;
  clearAllFilters: () => void;
  customFilters?: ReactNode;
  onResetFilters?: () => void;
};
