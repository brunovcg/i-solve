import { ChangeEvent } from 'react';
import { AllTableSize, Columns, TableProps } from '../../root-component/Table.types';
import { UseControlledTableInstanceProps } from '../controlled-table/ControlledTable.types';

export type SortBy = { id: string; desc: boolean }[];

export type Controller = {
  hasFilteredValues: boolean;
  nextPage: () => void;
  previousPage: () => void;
  canNextPage: boolean;
  canPreviousPage: boolean;
  pageCount: number;
  handleLimitChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  clearAllFilters: (callback: () => void) => void;
  currentPage: number;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  limit: number | string | AllTableSize;
  handleSorting: (sortBy: SortBy) => void;
  handleParams: (filterName: string, newValue: string | string[]) => void;
  manualSortBy: { id: string; desc: boolean }[];
  initialSorting: { id: string; desc: boolean }[];
};
export type UseUncontrolledTableInstance = UseControlledTableInstanceProps & {
  controller: Controller | undefined;
};

export type UncontrolledTableProps = TableProps & {
  columns: Columns[];
  data: unknown[];
  defaultColumnConfigs?: unknown;
  selectableRows?: boolean;
  controller: Controller | undefined;
};

export type UncontrolledTableRef = { resetSortBy: () => void };
