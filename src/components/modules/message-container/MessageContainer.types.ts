import { ReactNode } from 'react';

export type MessageContainerVariants = 'info' | 'warning' | 'error' | 'valid';

export type StyledMessageContainerProps = { width?: string; fontSize?: string };

export type MessageContainerProps = StyledMessageContainerProps & {
  text: string | ReactNode;
  variant?: MessageContainerVariants;
  className?: string;
  fontSize?: number | 'small' | 'medium' | 'large';
};
