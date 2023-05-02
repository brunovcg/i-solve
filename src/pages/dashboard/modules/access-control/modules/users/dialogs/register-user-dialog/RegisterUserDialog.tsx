import { array, object, string } from 'yup';
import { Container, Form, Input, Title } from '../../../../../../../../components';
import { CONSTANTS } from '../../../../../../../../constants';
import { useWindowDimensions } from '../../../../../../../../hooks';
import './RegisterUserDialog.scss';
import { cognitoQueries } from '../../../../../../../../queries';
import { toast } from 'react-toastify';

const { FORM } = CONSTANTS.GOOGLE_ICONS;
const { useCreateUserMutation } = cognitoQueries;

export default function RegisterUserDialog({ onSubmitSuccess }: { onSubmitSuccess: () => void }) {
  const { isMobileViewport } = useWindowDimensions();

  const { mutate: registerUser } = useCreateUserMutation();

  const schema = object().shape({
    name: string().required('Campo obrigatório'),
    email: string().email('Email inválido').required('Campo obrigatório'),
    groups: array(),
  });

  const onUserRegisterSuccess = () => {
    onSubmitSuccess();
    toast.info('O usuário foi registrado');
  };

  function onSubmit(payload: { username: string; email: string; name: string }) {
    registerUser({ ...payload, onSubmitSuccess: onUserRegisterSuccess });
  }

  const inputsWidth = isMobileViewport ? '240px' : '300px';

  return (
    <Container className="im-register-user-dialog">
      <Title icon={FORM} text="Formulário de Registro" marginBottom="40px" />
      <Form schema={schema} onSubmit={onSubmit}>
        <div className="im-register-user-form">
          <Input width={inputsWidth} name="name" showHeader={false} label="Nome" />
          <Input width={inputsWidth} name="email" showHeader={false} label="Email" />
        </div>
      </Form>
    </Container>
  );
}
