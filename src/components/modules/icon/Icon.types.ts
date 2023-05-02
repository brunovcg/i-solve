import { CONSTANTS } from '../../../constants';

const { GOOGLE_ICONS } = CONSTANTS;

export type IconSize = 'tiny' | 'small' | 'medium' | 'large' | undefined;

export type IconType = (typeof GOOGLE_ICONS)[keyof typeof GOOGLE_ICONS];

type ConditionalStyledIconProps = { size?: IconSize; customSize?: never } | { size?: never; customSize?: string };

type DefaultStyledIconProps = {
  margin?: string;
  hoverColor?: string;
  disabled?: boolean;
  error?: boolean;
};

export type StyledIconProps = DefaultStyledIconProps & {
  size?: IconSize;
  customSize?: string;
};

export type IconProps = ConditionalStyledIconProps &
  DefaultStyledIconProps & {
    icon: IconType;
    color?: string;
    className?: string;
    notifications?: number;
  };
