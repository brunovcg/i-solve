import { LoginPayload } from '../../../pages/login/Login.types';
import { CONSTANTS } from '../../../constants';
import { CognitoChangePasswordWithCodeArgs, CognitoForgotPasswordArgs } from '../../../services/cognito-services/cognitoServices.types';

const { COGNITO } = CONSTANTS.PERMISSIONS;

export type UserPermission = (typeof COGNITO)[keyof typeof COGNITO];

export type UserPermissions = UserPermission[];

export type SignInArgs = {
  payload: LoginPayload;
  onSuccess?: () => void;
  onError?: () => void;
  onComplete: () => void;
  navigateTo?: string;
};

export type User =
  | Record<string, never>
  | {
      username: string;
      permissions: UserPermissions;
      email: string;
    };

export type UserContextTypes = {
  isUserLogged: boolean;
  isUserRegularUser: boolean;
  isUserCustomer: boolean;
  isUserAdmin: boolean;
  signIn: ({ payload, onComplete }: SignInArgs) => void;
  signOut: () => void;
  user: User;
  forgotPassword: (payload: CognitoForgotPasswordArgs) => void;
  changePasswordWithCode: (payload: CognitoChangePasswordWithCodeArgs) => void;
};
