import { createContext, useState, useMemo, useEffect } from 'react';
import { UserContextTypes, SignInArgs, User, UserPermissions } from './UserContext.types';
import { environmentHelper, jwtHelper, storageHelper } from '../../../helpers';
import { useNavigate } from 'react-router-dom';
import { CONSTANTS } from '../../../constants';
import { cognitoServices } from '../../../services';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { routes } from '../../../router/routes';
import { CognitoChangePasswordWithCodeArgs, CognitoForgotPasswordArgs } from '../../../services/cognito-services/cognitoServices.types';
import { ProviderProps } from '../../types';

const { DEVELOPMENT } = CONSTANTS.ENVIRONMENT;
const { IM_APPLICATION_AWS_COGNITO_USER, IM_APPLICATION_AWS_COGNITO_EMAIL } = CONSTANTS.STORAGE.KEYS;
const { COGNITO, IM_APPLICATION } = CONSTANTS.STORAGE.INITIALS;
const { RENEW_SESSION } = CONSTANTS.EVENTS;
const { ADMIN } = CONSTANTS.PERMISSIONS.COGNITO;
const { environment } = environmentHelper;
const { decodeStoredCognitoAccessToken } = jwtHelper;
const {
  signOut: cognitoSignOut,
  signIn: cognitoSignIn,
  forgotPassword: cognitoForgotPassword,
  changePasswordWithCode: cognitoChangePasswordWithCode,
} = cognitoServices;
const mapUser = (username: string, permissions: UserPermissions, email: string) => ({ username, permissions, email });

const setUserInitialValue = () => {
  const decodedToken = decodeStoredCognitoAccessToken();

  if (decodedToken) {
    return mapUser(
      storageHelper.local.get(IM_APPLICATION_AWS_COGNITO_USER) ?? '',
      (decodedToken?.['cognito:groups'] ?? []) as UserPermissions,
      storageHelper.local.get(IM_APPLICATION_AWS_COGNITO_EMAIL) ?? ''
    );
  }
  return {};
};

export const UserContext = createContext<UserContextTypes>({} as UserContextTypes);

export default function UserProvider({ children }: ProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>(setUserInitialValue() as User);
  const isUserAdmin = useMemo(() => !!user?.permissions?.includes(ADMIN), [user?.permissions]);
  const isUserLogged = !!Object.keys(user).length;

  const signIn = ({ payload, onError, onComplete }: SignInArgs) => {
    const { username: cognitoUserMail } = payload;
    const successCallback = (data: CognitoUserSession) => {
      const cognitoPayload = data.getIdToken().payload;
      storageHelper.local.set(IM_APPLICATION_AWS_COGNITO_USER, cognitoPayload.name);
      storageHelper.local.set(IM_APPLICATION_AWS_COGNITO_EMAIL, cognitoUserMail);
      setUser(mapUser(cognitoPayload.name, cognitoPayload['cognito:groups'], cognitoUserMail));
      navigate(routes.dashboard.path);
      onComplete();
    };
    const errorCallback = (error: unknown) => {
      if (environment === DEVELOPMENT) {
        console.error(error);
      }
      onComplete();
      onError?.();
    };
    cognitoSignIn({ payload, successCallback, errorCallback });
  };

  const signOut = () => {
    setUser({});
    storageHelper.local.clean([COGNITO, IM_APPLICATION]);
    navigate(routes.login.path);
    cognitoSignOut({ username: user.username });
  };

  const forgotPassword = (payload: CognitoForgotPasswordArgs) => {
    cognitoForgotPassword(payload);
  };

  const changePasswordWithCode = (payload: CognitoChangePasswordWithCodeArgs) => {
    cognitoChangePasswordWithCode(payload);
  };

  useEffect(() => {
    document.addEventListener(RENEW_SESSION, signOut);

    return () => {
      document.removeEventListener(RENEW_SESSION, signOut);
    };
  }, []);

  const providerValues = useMemo(
    () => ({ isUserLogged, signIn, signOut, user, isUserAdmin, forgotPassword, changePasswordWithCode }),
    [isUserLogged, signIn, signOut, user, isUserAdmin, forgotPassword, changePasswordWithCode]
  );

  return <UserContext.Provider value={providerValues}>{children}</UserContext.Provider>;
}
