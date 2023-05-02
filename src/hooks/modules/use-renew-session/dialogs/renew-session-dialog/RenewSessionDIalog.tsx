import { Container, Icon, LoginForm, Title } from '../../../../../components';
import { CONSTANTS } from '../../../../../constants';
import { RenewSessionDialogProps } from './RenewSessionDialog.types';
import './RenewSessionDialog.scss';

const { FORM, WARNING } = CONSTANTS.GOOGLE_ICONS;

export default function RenewSessionDialog({ onCancel, onSuccess }: RenewSessionDialogProps) {
  const buttons = [{ id: 1, text: 'Sair', onClick: onCancel, variant: 'cancel' as const }];

  return (
    <Container className="im-renew-session-dialog-content">
      <Title text="Renovar Sessão" icon={FORM} />
      <Container className="im-renew-session-dialog-message" warning>
        <Icon icon={WARNING} />
        Sua sessão expirou, por favor entre novamente.
      </Container>
      <LoginForm buttons={buttons} onSubmitSuccess={onSuccess} />
    </Container>
  );
}
