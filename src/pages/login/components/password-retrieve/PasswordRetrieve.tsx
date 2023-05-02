import { useContext, useState } from 'react';
import { UserContext } from '../../../../contexts';
import { Button, Input, Form, MessageContainer } from '../../../../components';
import './PasswordRetrieve.scss';
import { toast } from 'react-toastify';
import { PasswordRetrieveProps, PasswordUpdatePayload, VerificationCodePayload } from './PasswordRetrieve.types';
import { string, object } from 'yup';
import { CONSTANTS } from '../../../../constants';

const { UNDO } = CONSTANTS.GOOGLE_ICONS;
const { MIN_ONE_NUMBER, MIN_ONE_UPPERCASE, MIN_ONE_SYMBOL_COGNITO_SUPPORT, MIN_ONE_LOWERCASE, MIN_SIX_MAX_NINE_CHARACTERS } =
  CONSTANTS.REGEX;

export default function PasswordRetrieve({ handleForgotPassword }: PasswordRetrieveProps) {
  const { forgotPassword, changePasswordWithCode } = useContext(UserContext);

  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [email, setEmail] = useState('');

  function sendVerificationCode(payload: VerificationCodePayload) {
    setEmail(payload.email);
    forgotPassword({
      username: payload.email,
      successCallback: () => {
        toast.info('Código verificação enviado');
        setVerificationCodeSent(true);
      },
      errorCallback: () => {
        toast.error('Email não encontrado');
      },
    });
  }

  function sendPasswordUpdate(payload: PasswordUpdatePayload) {
    changePasswordWithCode({
      verificationCode: payload.verificationCode,
      newPassword: payload.newPassword,
      username: email,
      successCallback: () => {
        toast.info('Senha alterada');
        handleForgotPassword();
      },
      errorCallback: () => toast.error('Código de verificação inválido'),
    });
  }

  const sendPasswordUpdateSchema = object().shape({
    newPassword: string()
      .required('Esse campo é obrigatório')
      .matches(MIN_ONE_NUMBER, 'Pelo menos um número necessário')
      .matches(MIN_ONE_UPPERCASE, 'Mínimo de uma letra maiúscula')
      .matches(MIN_ONE_SYMBOL_COGNITO_SUPPORT, 'Necessário um simbolo')
      .matches(MIN_SIX_MAX_NINE_CHARACTERS, 'Mínimo de 6 e máximo de 9 caracteres')
      .matches(MIN_ONE_LOWERCASE, 'Pelo menos uma letra minúscula'),
    verificationCode: string().required('Esse campo é obrigatório'),
  });

  const sendVerificationCodeSchema = object().shape({
    email: string().email('Email  inválido').required('Campo obrigatório'),
  });

  const renderer = () => {
    if (verificationCodeSent) {
      return (
        <>
          <Form
            onSubmit={sendPasswordUpdate}
            schema={sendPasswordUpdateSchema}
            buttonsAlignment="center"
            className="im-password-retrieve-form"
          >
            <Input showHeader={false} label="Nova senha" name="newPassword" type="password" placeholder="Insira nova senha" />

            <Input showHeader={false} label="Codigo de verificação." name="verificationCode" placeholder="Insira o código de verificação" />
          </Form>
          <MessageContainer
            text={
              <span>
                Nova senha deve conter: no mínimo 6 caracteres e no máximo 9, 1 letra maiúscula, 1 minúscula, 1 número and 1 símbolo:{' '}
                <span className="im-password-pattern-symbol">{'^ $ * . [ ] { } ( ) ? " ! @ # % & / \\ , > < \' : ; | _ ~ ` = + -'}</span>
              </span>
            }
            className="im-password-pattern"
            variant="warning"
          />
          <MessageContainer className="im-verification-code-pattern" text="Email enviado" variant="warning" />
        </>
      );
    }

    return (
      <Form
        onSubmit={sendVerificationCode}
        schema={sendVerificationCodeSchema}
        buttonsAlignment="center"
        className="im-password-retrieve-form"
      >
        <Input name="email" label="Enviar código de verifição" placeholder="Inserir " showHeader={false} width="100%" />
      </Form>
    );
  };

  return (
    <div className="im-password-retrieve">
      {renderer()}
      <Button onClick={handleForgotPassword} text="Retornar ao Login" variant="text" icon={UNDO} />
    </div>
  );
}
