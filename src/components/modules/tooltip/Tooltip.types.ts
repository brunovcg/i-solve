import { ReactElement, ReactNode } from 'react';
import { PopperSide } from '../../../hooks/modules/use-popper/usePopper.types';

export type TooltipProps = {
  content: string | ReactNode;
  trigger: ReactElement | ReactNode;
  delay?: number;
  side?: PopperSide;
};
