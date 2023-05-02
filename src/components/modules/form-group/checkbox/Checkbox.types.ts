import { ChangeEvent } from 'react';

export type CheckboxProps = {
  label?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  disabled?: boolean;
};
