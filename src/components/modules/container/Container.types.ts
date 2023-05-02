import { ReactNode } from 'react';

export type ContainerVariants = 'white' | 'light' | 'regular';

export type StyledContainerProps = {
  variant?: ContainerVariants;
  width?: string;
  height?: string;
  overflowX?: { maxWidth: string };
  overflowY?: { maxHeight: string };
};

export type ContainerProps = StyledContainerProps & {
  label?: string | ReactNode;
  children: ReactNode;
  className?: string;
  warning?: boolean;
  valid?: boolean;
  disabled?: boolean;
  error?: boolean;
  primary?: boolean;
  hoverable?: boolean;
  focus?: boolean;
  htmlFor?: string;
  onClick?: () => void;
  optionalLabel?: boolean;
};
