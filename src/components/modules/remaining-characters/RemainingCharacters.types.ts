import { SetStateAction } from 'react';

export type RemainingCharactersProps = {
  maxLength: number;
  disabled: boolean;
};

export type RemainingCharactersRef = {
  setRemainingChars: (value: SetStateAction<number>) => void;
};
