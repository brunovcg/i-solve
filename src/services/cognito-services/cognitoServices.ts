import {
  CognitoChangePasswordWithCodeArgs,
  CognitoForgotPasswordArgs,
  CognitoGroup,
  CognitoSignInArgs,
  CognitoSignOut,
  CognitoUser as CognitoUserType,
} from './cognitoServices.types';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  ListUsersCommand,
  ListGroupsCommand,
  CreateGroupCommand,
  AdminEnableUserCommand,
  AdminDisableUserCommand,
  AdminCreateUserCommand,
  AdminListGroupsForUserCommand,
  ListUsersInGroupCommand,
  AdminRemoveUserFromGroupCommand,
  AdminAddUserToGroupCommand,
  AdminUpdateUserAttributesCommand,
  UpdateGroupCommand,
} from '@aws-sdk/client-cognito-identity-provider';

import { awsHelper, httpHelper } from '../../helpers';

const { s3, cognito } = awsHelper;
const { authDetails, cognitoUser, userPoolId } = cognito;
const { federatedRequest } = httpHelper;

const cognitoServices = {
  signIn({ payload, successCallback, errorCallback }: CognitoSignInArgs) {
    const { username, password } = payload;

    return cognitoUser(username).authenticateUser(authDetails(username, password), {
      onSuccess: (data) => {
        successCallback?.(data);
      },
      onFailure: (error) => {
        errorCallback?.(error);
      },
    });
  },

  getS3PreSignedUrl(contentUrl: string) {
    const [bucketName, ...objectKey] = contentUrl.replace('s3://', '').split('/');
    const key = objectKey.join('/');

    const command = new GetObjectCommand({ Key: key, Bucket: bucketName });
    return getSignedUrl(s3.client(), command, { expiresIn: 3600 });
  },

  forgotPassword(payload: CognitoForgotPasswordArgs) {
    const { username, successCallback, errorCallback } = payload;
    return cognitoUser(username).forgotPassword({
      onSuccess: (data: unknown) => successCallback(data),
      onFailure: (data: unknown) => errorCallback(data),
    });
  },

  changePasswordWithCode(payload: CognitoChangePasswordWithCodeArgs) {
    const { username, verificationCode, newPassword, successCallback, errorCallback } = payload;
    return cognitoUser(username).confirmPassword(verificationCode, newPassword, {
      onSuccess: (data: unknown) => successCallback(data),
      onFailure: (data: unknown) => errorCallback(data),
    });
  },

  signOut(payload: CognitoSignOut) {
    return cognitoUser(payload.username).signOut();
  },

  listUsers() {
    const command = new ListUsersCommand({ UserPoolId: userPoolId });
    return federatedRequest<ListUsersCommand, CognitoUserType>(command, 'Users');
  },

  enableDisabledUser(username: string, currentStatus: boolean) {
    const params = { UserPoolId: userPoolId, Username: username };
    const command = currentStatus ? new AdminDisableUserCommand(params) : new AdminEnableUserCommand(params);
    return federatedRequest<AdminDisableUserCommand | AdminEnableUserCommand, unknown>(command);
  },

  listGroups() {
    const command = new ListGroupsCommand({ UserPoolId: userPoolId });
    return federatedRequest<ListGroupsCommand, CognitoGroup>(command, 'Groups');
  },

  listUsersInGroup(groupName: string) {
    const command = new ListUsersInGroupCommand({
      UserPoolId: userPoolId,
      GroupName: groupName,
    });
    return federatedRequest<ListUsersInGroupCommand, CognitoUserType>(command, 'Users');
  },

  listGroupsForUser(username: string) {
    const command = new AdminListGroupsForUserCommand({
      UserPoolId: userPoolId,
      Username: username,
    });
    return federatedRequest<AdminListGroupsForUserCommand, CognitoGroup>(command, 'Groups');
  },

  removeUserFromGroup(groupName: string, username: string) {
    const command = new AdminRemoveUserFromGroupCommand({
      UserPoolId: userPoolId,
      GroupName: groupName,
      Username: username,
    });
    return federatedRequest<AdminRemoveUserFromGroupCommand, unknown>(command);
  },

  addUserToGroup(groupName: string, username: string) {
    const command = new AdminAddUserToGroupCommand({
      UserPoolId: userPoolId,
      GroupName: groupName,
      Username: username,
    });
    return federatedRequest<AdminAddUserToGroupCommand, unknown>(command);
  },

  createGroup(groupName: string, description: string) {
    const command = new CreateGroupCommand({
      UserPoolId: userPoolId,
      GroupName: groupName,
      Description: description,
    });
    return federatedRequest<CreateGroupCommand, CognitoGroup>(command);
  },

  createUser(username: string, email: string, name: string) {
    const command = new AdminCreateUserCommand({
      UserPoolId: userPoolId,
      Username: email,
      UserAttributes: [
        { Name: 'email_verified', Value: 'true' },
        { Name: 'name', Value: name },
        { Name: 'email', Value: email },
      ],
    });
    return federatedRequest<AdminCreateUserCommand, unknown>(command);
  },

  // TODO Implement TO UI----------------------------------------------------------------------------------------------

  updateUserAttributes(username: string, userAttributes: { Value: string; Name: string }[]) {
    const command = new AdminUpdateUserAttributesCommand({
      UserPoolId: userPoolId,
      Username: username,
      UserAttributes: userAttributes,
    });
    return federatedRequest<AdminUpdateUserAttributesCommand, unknown>(command);
  },

  updateGroup(groupName: string, description: string) {
    const command = new UpdateGroupCommand({
      UserPoolId: userPoolId,
      GroupName: groupName,
      Description: description,
    });
    return federatedRequest<UpdateGroupCommand, unknown>(command);
  },
};

export default cognitoServices;
