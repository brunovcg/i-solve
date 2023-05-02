import { useContext, useEffect } from 'react';
import { CONSTANTS } from '../../../constants';
import { toast } from 'react-toastify';
import useDialog from '../use-dialog/useDialog';
import { UserContext } from '../../../contexts';
import RenewSessionDialog from './dialogs/renew-session-dialog/RenewSessionDIalog';

const { RENEW_SESSION } = CONSTANTS.EVENTS;

export default function useRenewSession() {
  const { signOut } = useContext(UserContext);

  const {
    dialogRenderer: renewSessionDialogRenderer,
    setDialog: setRenewSessionDialog,
    closeDialog: closeRenewSessionDialog,
  } = useDialog({
    closeOnOutsideClick: false,
    defaultCloseButton: false,
    defaultCloseIcon: false,
  });

  const renewSession = () => {
    toast.warn('Sua sessão expirou.', { toastId: CONSTANTS.TOAST_IDS.RENEW_SESSION });
    setRenewSessionDialog({
      title: 'Renovar Sessão',
      content: (
        <RenewSessionDialog
          onSuccess={closeRenewSessionDialog}
          onCancel={() => {
            signOut();
            closeRenewSessionDialog();
          }}
        />
      ),
    });
  };

  useEffect(() => {
    document.addEventListener(RENEW_SESSION, renewSession);

    return () => {
      document.removeEventListener(RENEW_SESSION, renewSession);
    };
  }, []);

  return { renewSessionDialogRenderer };
}
