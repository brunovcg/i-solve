/* eslint-disable @typescript-eslint/no-explicit-any */
import { AllTableSize, Columns, TableProps } from '../../root-component/Table.types';

export type UseControlledTableInstanceProps = {
  selectableRows?: boolean;
  stickFromColumn?: string;
  memoizedColumns: any[];
  memoizedData: any;
  paginate?: (number | AllTableSize)[];
};

export type ControlledTableProps = TableProps & {
  columns: Columns[];
  data?: { [key: string]: string | undefined | null | number | boolean | any }[];
  selectableRows?: boolean;
};
