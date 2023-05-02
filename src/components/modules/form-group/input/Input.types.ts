export type StyledInputProps = {
  width?: string;
  height?: string;
  maxWidth?: string;
};

type ConditionalInputUse =
  | {
      name: string;
      debounce?: never;
      onSearch?: never;
      onChange?: never;
      onBlur?: never;
    }
  | {
      name?: never;
      debounce?: number;
      onSearch?: (inputValue: string) => void;
      onChange?: (inputValue: string) => void;
      onBlur?: (inputValue: string) => void;
    };

type ConditionalInputType =
  | { type?: 'number'; maxValue?: number; maxLength?: never; minValue?: number }
  | { type?: 'text' | 'password'; maxValue?: never; maxLength?: number; minValue?: never };

export type InputProps = StyledInputProps &
  ConditionalInputUse &
  ConditionalInputType & {
    canReset?: boolean;
    initialValue?: string;
    label?: string;
    placeholder?: string;
    errorMessage?: string;
    className?: string;
    disabled?: boolean;
    info?: string;
    showAddOns?: boolean;
    showHeader?: boolean;
    optionalLabel?: boolean;
    canClear?: boolean;
    value?: string;
    valid?: boolean | ((inputValue: string) => boolean);
  };

export type InputForwardRef = {
  resetInputValue: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  clearInputValue: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};
