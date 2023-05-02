import { ReactNode, MouseEvent } from 'react';
import { IconType } from '../icon/Icon.types';

export type ButtonType = 'primary' | 'cancel' | 'outlined' | 'text' | 'valid';

type ConditionalButtonProps = { round?: string; width?: never; height?: never } | { width?: string; height?: string; round?: never };

type DefaultStyledButtonProps = {
  variant?: ButtonType;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: IconType;
};

export type StyledButtonProps = DefaultStyledButtonProps & {
  width?: string;
  height?: string;
  round?: string;
  small?: boolean;
};

export type ButtonProps = DefaultStyledButtonProps &
  ConditionalButtonProps & {
    text: string | ReactNode;
    onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
    loading?: boolean;
    className?: string;
    stopPropagation?: boolean;
    preventDefault?: boolean;
    small?: boolean;
  };
