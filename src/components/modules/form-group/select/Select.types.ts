/* eslint-disable @typescript-eslint/no-explicit-any */
import { MouseEvent } from 'react';
export type SelectRef = {
  resetSelectValues: (e?: MouseEvent<HTMLButtonElement>) => void;
  clearSelectValues: () => void;
};

export type StyledSelectProps = {
  width?: string;
  listWidth?: number | string;
  height?: string;
  listMaxHeight?: string;
  canClear?: boolean;
  canReset?: boolean;
  maxWidth?: string;
};

export type ConditionalProps =
  | {
      maxSelections?: number;
      multiple?: boolean;
    }
  | {
      maxSelections?: never;
      multiple?: never;
    };

export type SelectProps = StyledSelectProps &
  ConditionalProps & {
    placeholder?: string;
    label?: string;
    accessor: string;
    options: { [key: string]: string | number | undefined | null | boolean }[];
    disabled?: boolean;
    errorMessage?: string;
    initialValue?: { [key: string]: string | number | undefined | null | boolean }[];
    className?: string;
    name?: string;
    loading?: boolean;
    canSearch?: boolean;
    onChange?: (outputValues: any[]) => void;
    chipColor?: string | { [key: string]: string };
    optionalLabel?: boolean;
  };
