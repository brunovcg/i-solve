export type PasswordRetrieveProps = {
  handleForgotPassword: () => void;
};

export type VerificationCodePayload = {
  email: string;
};

export type PasswordUpdatePayload = {
  newPassword: string;
  verificationCode: string;
};
