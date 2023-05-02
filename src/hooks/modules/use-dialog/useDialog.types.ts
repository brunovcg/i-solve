import { ReactNode } from 'react';

export type UseDialogProps = {
  initOpened?: boolean;
  closeOnOutsideClick?: boolean;
  width?: string;
  height?: string;
  maxHeight?: string;
  defaultCloseButton?: boolean;
  defaultCloseIcon?: boolean;
  onClose?: () => void;
  usePortal?: boolean;
};

export type SetDialog = {
  content: string | ReactNode;
  title?: string | ReactNode;
  buttons?: ReactNode;
};
