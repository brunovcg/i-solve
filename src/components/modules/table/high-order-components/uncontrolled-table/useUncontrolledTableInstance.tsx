/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTable, useSortBy, useGlobalFilter, useRowSelect, useColumnOrder, useFlexLayout, Hooks } from 'react-table';
import { useSticky } from 'react-table-sticky';
import TableColumnFilter from '../../components/TableColumnFilter';
import { Controller, SortBy, UseUncontrolledTableInstance } from './UncontrolledTable.types';
import { useEffect } from 'react';
import handleSelectableRows from '../../helpers/handleSelectableRows';

export default function useUncontrolledTableInstance({
  selectableRows,
  stickFromColumn,
  memoizedColumns,
  memoizedData,
  controller,
}: UseUncontrolledTableInstance) {
  const hasManualWidthColumns = memoizedColumns.some((column: any) => column.width);
  const totalResults = memoizedData.length;

  const {
    hasFilteredValues,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    handleLimitChange,
    clearAllFilters,
    currentPage,
    goToFirstPage,
    goToLastPage,
    limit,
    handleSorting,
    manualSortBy,
  } = controller ?? ({} as Controller);

  const tableInstanceConfigs = [
    useGlobalFilter,
    useSortBy,
    useRowSelect,
    useColumnOrder,
    (hooks: Hooks) => {
      hooks.visibleColumns.push((rawColumns: any[]) => {
        let sticky = false;
        const mappedColumns = rawColumns.reduceRight((acc, current) => {
          const column = { ...current };
          if (stickFromColumn === current.id || sticky) {
            column.sticky = 'left';
            if (!sticky) {
              sticky = true;
            }
          }
          column.Filter = column.Filter && TableColumnFilter;
          column.width = 200;

          acc.unshift(column);
          return acc;
        }, []);

        const renderedColumns = [...mappedColumns];

        handleSelectableRows({ selectableRows, renderedColumns, stickFromColumn });

        return renderedColumns;
      });
    },
  ];

  if (stickFromColumn || hasManualWidthColumns) {
    tableInstanceConfigs.push(useSticky, useFlexLayout);
  }

  const controlledTableInstance = useTable(
    {
      columns: memoizedColumns,
      data: memoizedData,
      initialState: { sortBy: manualSortBy },
    },
    ...tableInstanceConfigs
  );

  const {
    state,
    rows,
    allColumns,
    getTableProps,
    getTableBodyProps,
    setGlobalFilter,
    headerGroups,
    prepareRow,
    getToggleHideAllColumnsProps,
    setSortBy,
  } = controlledTableInstance;
  const { globalFilter, pageIndex, sortBy } = state;
  const renderRows = rows;
  const isUncontrolled = true;

  useEffect(() => {
    handleSorting(sortBy as SortBy);
  }, [sortBy]);

  return {
    tableInstance: {
      globalFilter,
      allColumns,
      pageIndex,
      clearAllFilters,
      setSortBy,
      nextPage,
      previousPage,
      canNextPage,
      canPreviousPage,
      pageCount,
      renderRows,
      currentPage,
      limit,
      goToFirstPage,
      goToLastPage,
      hasFilteredValues,
      handleLimitChange,
      getTableProps,
      getTableBodyProps,
      setGlobalFilter,
      headerGroups,
      prepareRow,
      getToggleHideAllColumnsProps,
      hasManualWidthColumns,
      totalResults,
      isUncontrolled,
    },
  };
}
