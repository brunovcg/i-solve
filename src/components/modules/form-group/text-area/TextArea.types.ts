export type StyledTextAreaProps = {
  width?: string;
  height?: string;
  maxWidth?: string;
};

type ConditionalTextAreaUse =
  | {
      name: string;
      debounce?: never;
      onSearch?: never;
      onChange?: never;
    }
  | {
      name?: never;
      debounce?: number;
      onChange?: (value: string) => void;
    };

export type TextAreaProps = StyledTextAreaProps &
  ConditionalTextAreaUse & {
    maxLength?: number;
    value?: string;
    label?: string;
    placeholder?: string;
    errorMessage?: string;
    className?: string;
    disabled?: boolean;
    info?: string;
    showAddOns?: boolean;
    showHeader?: boolean;
    optionalLabel?: boolean;
  };

export type TextAreaForwardRef = {
  resetTextAreaValue: () => void;
};
