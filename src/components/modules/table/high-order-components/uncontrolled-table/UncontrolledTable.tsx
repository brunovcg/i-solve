import useUncontrolledTableInstance from './useUncontrolledTableInstance';
import Table from '../../root-component/Table';
import { useMemo, useImperativeHandle, ForwardedRef, forwardRef } from 'react';
import { Columns } from '../../root-component/Table.types';
import { UncontrolledTableProps, UncontrolledTableRef } from './UncontrolledTable.types';
import { SortingRule } from 'react-table';

function UncontrolledTable(props: UncontrolledTableProps, ref: ForwardedRef<UncontrolledTableRef>) {
  const { selectableRows, stickFromColumn, columns, data, defaultColumnConfigs, paginate, controller, customFilters, ...rest } = props;

  const memoizedData = useMemo((): unknown => data, [data]);
  const memoizedColumns = useMemo((): Columns[] => columns, [columns]);

  const { tableInstance } = useUncontrolledTableInstance({
    selectableRows,
    stickFromColumn,
    memoizedColumns,
    memoizedData,
    paginate,
    controller,
  });

  const resetSortBy = () => {
    tableInstance.setSortBy(controller?.initialSorting as SortingRule<object>[]);
  };

  useImperativeHandle(ref, () => ({ resetSortBy }));

  return (
    <Table
      tableInstance={tableInstance}
      paginate={paginate}
      showGlobalFilter={false}
      showColumnFilter={false}
      customFilters={customFilters}
      {...rest}
    />
  );
}

export default forwardRef(UncontrolledTable);
