import { ReactNode } from 'react';

export type StyledDialogProps = {
  width?: string;
  height?: string;
  maxHeight?: string;
};

export type DialogProps = StyledDialogProps & {
  isOpen: boolean;
  content: string | ReactNode;
  title?: string | ReactNode;
  buttons?: ReactNode;
  closeDialog: () => void;
  closeOnOutsideClick?: boolean;
  defaultCloseButton?: boolean;
  defaultCloseIcon?: boolean;
  usePortal?: boolean;
};
