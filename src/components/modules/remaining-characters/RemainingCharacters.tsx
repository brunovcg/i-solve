import { RemainingCharactersProps, RemainingCharactersRef } from './RemainingCharacters.types';
import { useState, forwardRef, ForwardedRef, useImperativeHandle, SetStateAction } from 'react';
import StyledRemainingCharacters from './RemainingCharacters.styled';

function RemainingCharacters({ maxLength, disabled }: RemainingCharactersProps, ref: ForwardedRef<RemainingCharactersRef>) {
  const [remainingChars, setRemainingChars] = useState(maxLength);

  const formattedQuantity = disabled ? 0 : remainingChars ?? 0;

  useImperativeHandle(ref, () => ({
    setRemainingChars: (value: SetStateAction<number>) => {
      setRemainingChars(value);
    },
  }));

  return (
    <StyledRemainingCharacters>
      <span>Restantes</span>
      &nbsp;
      <span className={formattedQuantity === 0 ? 'im-remaining-no-characters' : ''}>{formattedQuantity}</span>
    </StyledRemainingCharacters>
  );
}

export default forwardRef(RemainingCharacters);
