import { CognitoUserSession } from 'amazon-cognito-identity-js';

export type CognitoSignInArgs = {
  payload: { username: string; password: string };
  successCallback: (data: CognitoUserSession) => void;
  errorCallback: (error: unknown) => void;
};

export type CognitoSignOutArg = () => void;

export type CognitoForgotPasswordArgs = {
  username: string;
  successCallback: (data: unknown) => void;
  errorCallback: (data: unknown) => void;
};

export type CognitoChangePasswordWithCodeArgs = CognitoForgotPasswordArgs & {
  verificationCode: string;
  newPassword: string;
};

export type CognitoSignOut = {
  username: string;
};

export type CognitoUserCustomAttributes = 'email';

export type CognitoUser = {
  Attributes: { Name: string; Value: string }[];
  Enabled: boolean;
  MFAOptions: undefined;
  UserCreateDate: Date;
  UserLastModifiedDate: Date;
  UserStatus: string;
  Username: string;
};

export type CognitoGroup = {
  CreationDate: Date;
  Description: string;
  GroupName: string;
  LastModifiedDate: Date;
  UserPoolId: string;
};
