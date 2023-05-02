import { IconSize, IconType } from '../icon/Icon.types';

export type ButtonIconVariant = 'valid' | 'primary' | 'error' | 'warning' | 'primary-dark';

export type StyledButtonIconProps = {
  variant?: ButtonIconVariant;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  size?: IconSize;
  hide?: boolean;
  disabled?: boolean;
  borderColor?: string;
};

export type CustomVariantAndColor =
  | { variant?: never; color?: string; borderColor?: string; backgroundColor?: string; hoverBackgroundColor?: string; hoverColor?: string }
  | {
      variant?: ButtonIconVariant;
      color?: never;
      borderColor?: never;
      backgroundColor?: never;
      hoverBackgroundColor?: never;
      hoverColor?: never;
    };

export type ButtonIconProps = CustomVariantAndColor & {
  icon: IconType;
  label?: string;
  margin?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  error?: boolean;
  size?: IconSize;
  hide?: boolean;
  disabled?: boolean;
};
