import { useMemo } from 'react';
import useControlledTableInstance from './useControlledTableInstance';
import Table from '../../root-component/Table';
import { Columns } from '../../root-component/Table.types';
import { ControlledTableProps } from './ControlledTable.types';

export default function ControlledTable(props: ControlledTableProps) {
  const { selectableRows, stickFromColumn, columns, data, paginate, loading, ...rest } = props;

  const memoizedData = useMemo((): unknown => data ?? [], [data]);
  const memoizedColumns = useMemo((): Columns[] => columns ?? [], [columns]);

  const { tableInstance } = useControlledTableInstance({
    selectableRows,
    stickFromColumn,
    memoizedColumns,
    memoizedData,
    paginate,
  });

  return <Table tableInstance={tableInstance} paginate={paginate} loading={loading ?? false} {...rest} />;
}
