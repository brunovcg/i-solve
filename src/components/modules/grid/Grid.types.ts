/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

export type Alignment = 'left' | 'center' | 'right';

export type StyledGridHeadProps = {
  headerAlignment: Alignment;
};

export type StyledGridCellProps = {
  cellAlignment: Alignment;
};

export type StyledGripProps = {
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  loading?: boolean | number;
};

type Value = string | number | null | undefined | boolean | ReactNode;

export type GridCell = { id: string | number; value: Value; cellAlignment?: Alignment; isTemplate: boolean };

export type Row = { id: string | number; [key: string]: string | ReactNode | any };

export type GridRow = {
  id: string | number;
  cells: GridCell[];
};

export type GridTemplateArgs = { row: Row; value: Value; rows: Row[]; index: number };

export type GridProps = StyledGripProps & {
  loading?: boolean;
  className?: string;
  noData?: string;
  columns: {
    id: string | number;
    accessor?: string;
    component?: ReactNode | string;
    headerAlignment?: Alignment;
    cellAlignment?: Alignment;
    template?: (data: GridTemplateArgs) => ReactNode;
  }[];
  rows?: Row[];
};
