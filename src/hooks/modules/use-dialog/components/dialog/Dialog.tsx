import StyledDialog from './Dialog.styled';
import ReactDOM from 'react-dom';
import { DialogProps } from './Dialog.types';
import { ButtonIcon, Button } from '../../../../../components';
import { CONSTANTS } from '../../../../../constants';
import { useOnClickOutside } from '../../../..';
import { useRef } from 'react';

const { CLOSE, CANCEL } = CONSTANTS.GOOGLE_ICONS;

export default function Dialog({
  content,
  title,
  buttons,
  width,
  height,
  closeDialog,
  closeOnOutsideClick,
  defaultCloseIcon,
  defaultCloseButton,
  isOpen,
  maxHeight,
  usePortal,
}: DialogProps) {
  const containerRef = useRef(null);

  useOnClickOutside(containerRef, () => closeDialog(), !!closeOnOutsideClick);

  if (!isOpen) {
    return null;
  }

  const renderer = (
    <StyledDialog className="im-dialog" width={width} height={height} maxHeight={maxHeight}>
      <div className="im-dialog-container" ref={containerRef}>
        {title && <div className="im-dialog-title">{title}</div>}
        <div className="im-dialog-content">{content}</div>
        {(buttons || defaultCloseButton) && (
          <div className="im-dialog-buttons">
            {buttons}
            {defaultCloseButton && <Button icon={CANCEL} text="Fechar" onClick={() => closeDialog()} variant="cancel" />}
          </div>
        )}
        {defaultCloseIcon && (
          <div className="im-dialog-close-icon">
            <ButtonIcon icon={CLOSE} onClick={() => closeDialog()} />
          </div>
        )}
      </div>
    </StyledDialog>
  );

  if (usePortal) {
    return ReactDOM.createPortal(renderer, document.getElementById('dialog') as HTMLElement);
  }

  return renderer;
}
