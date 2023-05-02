import { ReactNode } from 'react';

export type ChipVariant = 'valid' | 'primary' | 'cancel' | 'default' | 'warning' | { custom: string };
export type ChipSize = 'small' | 'medium' | 'large';

export type StyledChipProps = {
  variant?: ChipVariant;
  width?: string;
  onClick?: () => void;
  disabled?: boolean;
  size?: ChipSize;
};

export type ChipProps = StyledChipProps & {
  text: string | ReactNode;
  onCloseButton?: () => void;
};
