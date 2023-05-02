import { ReactNode, useCallback, useMemo, useState } from 'react';
import Dialog from './components/dialog/Dialog';
import { SetDialog, UseDialogProps } from './useDialog.types';

export default function useDialog({
  initOpened = false,
  closeOnOutsideClick = true,
  width,
  height,
  maxHeight,
  onClose,
  defaultCloseIcon = true,
  defaultCloseButton = true,
  usePortal = true,
}: UseDialogProps = {}) {
  const [isOpen, setIsOpen] = useState(initOpened);
  const [initValue, setInitValue] = useState<SetDialog>({} as SetDialog);
  const [dialogData, setDialogData] = useState<SetDialog>({} as SetDialog);

  const setDialog = useCallback((payload: SetDialog) => {
    setIsOpen(true);
    setDialogData(payload);
    setInitValue(payload);
  }, []);

  const resetDialog = () => {
    setDialogData(initValue);
  };

  const setButtons = (buttons: ReactNode) => {
    setDialogData((state) => ({ ...state, buttons }));
  };

  const closeDialog = useCallback(() => {
    resetDialog();
    setIsOpen(false);
    onClose?.();
  }, []);

  const dialog = (
    <Dialog
      isOpen={isOpen}
      content={dialogData.content}
      title={dialogData.title}
      closeDialog={closeDialog}
      buttons={dialogData.buttons}
      closeOnOutsideClick={closeOnOutsideClick}
      width={width}
      height={height}
      maxHeight={maxHeight}
      defaultCloseIcon={defaultCloseIcon}
      defaultCloseButton={defaultCloseButton}
      usePortal={usePortal}
    />
  );

  const dialogRenderer = isOpen ? dialog : null;

  return useMemo(
    () => ({ dialogRenderer, setDialog, closeDialog, setButtons, setDialogData }),
    [{ dialogRenderer, setDialog, closeDialog, setButtons, setDialogData }]
  );
}
