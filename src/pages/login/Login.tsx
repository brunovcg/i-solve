import { Button, LoginForm } from '../../components';
import StyledLogin from './Login.styled';
import PasswordRetrieve from './components/password-retrieve/PasswordRetrieve';
import { useState } from 'react';
import { routes } from '../../router/routes';

export default function Login() {
  const [forgotPassword, setForgotPassword] = useState(false);
  const handleForgotPassword = () => setForgotPassword((state) => !state);

  return (
    <StyledLogin className="im-login">
      <div className="im-login-title">
        <p>iSolve</p>
        <h2>App.</h2>
      </div>
      <div className="im-login-form-wrapper">
        <div className="im-login-form-header">
          <h3> Login </h3>
        </div>
        {!forgotPassword && (
          <>
            <LoginForm navigateTo={routes.dashboard.path} />
            <div className="im-login-option-buttons">
              <Button text="Forgot Password?" onClick={handleForgotPassword} variant="text" />
            </div>
          </>
        )}
        {forgotPassword && <PasswordRetrieve handleForgotPassword={handleForgotPassword} />}
      </div>
    </StyledLogin>
  );
}
