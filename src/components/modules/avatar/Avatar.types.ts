export type AvatarSize = 'small' | 'medium' | 'large';

export type StyledAvatarProps = {
  size?: AvatarSize;
};

export type AvatarProps = StyledAvatarProps & {
  username: string;
  active?: boolean;
};
