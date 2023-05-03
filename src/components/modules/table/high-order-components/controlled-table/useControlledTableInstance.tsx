/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
  useColumnOrder,
  useFlexLayout,
  Hooks,
} from 'react-table';
import { useSticky } from 'react-table-sticky';
import TableColumnFilter from '../../components/TableColumnFilter';
import { CONSTANTS } from '../../../../../constants';
import { useEffect, ChangeEvent } from 'react';
import { UseControlledTableInstanceProps } from './ControlledTable.types';
import handleSelectableRows from '../../helpers/handleSelectableRows';

const { ALL_TABLE_SIZE } = CONSTANTS.COMPONENTS.TABLE;

export default function useControlledTableInstance({
  selectableRows,
  stickFromColumn,
  memoizedColumns,
  memoizedData,
  paginate,
}: UseControlledTableInstanceProps) {
  const hasManualWidthColumns = memoizedColumns.some((column: any) => column.width);
  const totalResults = memoizedData?.length;

  const tableInstanceConfigs = [
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
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
    },
    ...tableInstanceConfigs
  );

  const { state, setAllFilters, page, setPageSize, rows, gotoPage, pageCount, allColumns, ...rest } = controlledTableInstance;
  const { globalFilter, pageIndex, pageSize } = state;

  const clearAllFilters = () => setAllFilters([]);
  const renderRows = paginate ? page : rows;
  const currentPage = pageIndex + 1;
  const limit = pageSize;
  const goToFirstPage = () => {
    gotoPage(0);
  };
  const goToLastPage = () => {
    gotoPage(pageCount - 1);
  };

  const hasFilteredValues = allColumns.some((column) => column.filterValue) || globalFilter;

  const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target ?? {};
    if (value === ALL_TABLE_SIZE) {
      setPageSize(totalResults);
    }

    setPageSize(Number(value));
  };

  useEffect(() => {
    if (paginate?.length) {
      const initialPageSize = paginate[0] === ALL_TABLE_SIZE ? totalResults : paginate[0];
      setPageSize(initialPageSize);
    }
  }, []);

  return {
    tableInstance: {
      globalFilter,
      allColumns,
      pageIndex,
      clearAllFilters,
      pageCount,
      renderRows,
      currentPage,
      limit,
      goToFirstPage,
      goToLastPage,
      hasFilteredValues,
      handleLimitChange,
      hasManualWidthColumns,
      totalResults,
      ...rest,
    },
  };
}
