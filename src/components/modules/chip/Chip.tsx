import StyledChip from './Chip.styled';
import { ChipProps } from './Chip.types';
import { CONSTANTS } from '../../../constants';
import ButtonIcon from '../button-icon/ButtonIcon';
import { MouseEvent } from 'react';
import { jsxHelper } from '../../../helpers';

const { CLOSE } = CONSTANTS.GOOGLE_ICONS;

export default function Chip({ text, onClick, onCloseButton, variant, disabled, size = 'medium', width }: ChipProps) {
  const handleCloseCLick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCloseButton?.();
  };

  const conditionalClasses = jsxHelper.conditionalClasses({
    ['im-chip']: true,
    ['im-chip-close-option']: !!onCloseButton,
  });

  const closeButtonSize = () => {
    if (size !== 'large') {
      return 'small';
    }
  };

  return (
    <StyledChip className={conditionalClasses} onClick={onClick} variant={variant} size={size} disabled={disabled} width={width}>
      <div className="im-chip-content">{text}</div>
      {!!onCloseButton && <ButtonIcon icon={CLOSE} onClick={handleCloseCLick} size={closeButtonSize()} />}
    </StyledChip>
  );
}
