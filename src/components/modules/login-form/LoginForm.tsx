import { Form, Input } from '../..';
import { object, string } from 'yup';
import { useContext, useState } from 'react';
import { UserContext } from '../../../contexts';
import { LoginPayload } from '../../../pages/login/Login.types';
import { LoginFormTypes } from './LoginForm.types';
import './LoginForm.scss';

export default function LoginForm({ buttons, navigateTo, onSubmitSuccess }: LoginFormTypes) {
  const { signIn } = useContext(UserContext);
  const [isFormDisabled, setIsDisabledForm] = useState(false);

  const customerSchema = object().shape({
    username: string().required('Esse campo é obrigatório'),
    password: string().required('Esse campo é obrigatório'),
  });

  function onSubmit<PayloadType>(payload: PayloadType) {
    setIsDisabledForm(true);
    signIn({
      payload: payload as LoginPayload,
      onSuccess: () => onSubmitSuccess?.(),
      onComplete: () => setIsDisabledForm(false),
      navigateTo: navigateTo,
    });
  }

  return (
    <Form
      onSubmit={onSubmit}
      schema={customerSchema}
      buttonsAlignment="center"
      disabled={isFormDisabled}
      buttons={buttons}
      className="im-login-form"
      width="100%"
    >
      <div className="im-login-form-fields">
        <Input type="text" label="Usuário" name="username" placeholder="Insira o usuário" showHeader={false} />

        <Input type="password" label="Senha" name="password" placeholder="Insira a senha" showHeader={false} />
      </div>
    </Form>
  );
}
