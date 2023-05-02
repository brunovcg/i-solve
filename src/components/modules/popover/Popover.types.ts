import { ReactNode } from 'react';
import { CSSObject } from 'styled-components';

export type StyledPopoverContentProps = {
  contentStyle?: CSSObject;
};

export type StyledPopoverTriggerProps = {
  showBorder?: boolean;
};

export type PopoverProps = StyledPopoverContentProps &
  StyledPopoverTriggerProps & {
    trigger: ReactNode;
    content: string | ReactNode;
    side?: 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
    title?: string;
    width?: string;
  };

export type StyledPopoverProps = {
  width?: string;
};
