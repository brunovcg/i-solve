import { IconType } from '../icon/Icon.types';

export type TitleSize = 'small' | 'medium' | 'large' | 'huge';

export type TitleVariant = 'primary' | 'error' | 'primary-dark' | 'valid' | 'warning' | 'dark';

export type StyledTitleProps = {
  size?: TitleSize;
  variant?: TitleVariant;
  marginBottom?: string;
};

export type TitleProps = StyledTitleProps & {
  text: string;
  icon?: IconType;
};
