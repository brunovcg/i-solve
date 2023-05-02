import { IconType } from '../../../../components/modules/icon/Icon.types';

export type DrawerMenu = {
  id: number;
  permit: boolean;
  icon?: IconType;
  text: string;
  onClick: () => void;
};

export type DrawerProps = {
  title?: string;
  titleInitials?: string;
  menu: DrawerMenu[];
  initialSelection?: number | string;
};

export type OptionClickCallback = () => void;
