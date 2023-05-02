import { CONSTANTS } from '../../../constants';
import { environmentHelper, jwtHelper } from '../../../helpers';
import { S3Client } from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';

const { AWS_USER_POOL_ID, AWS_USER_POOL_WEB_CLIENT_ID, AWS_REGION, AWS_IDENTITY_POOL_ID } = CONSTANTS.ENVIRONMENT.VARIABLES;
const { getStoredCognitoIdToken } = jwtHelper;
const { getEnvVariable } = environmentHelper;

const clientId = getEnvVariable(AWS_USER_POOL_WEB_CLIENT_ID);
const region = getEnvVariable(AWS_REGION);
const identityPoolId = getEnvVariable(AWS_IDENTITY_POOL_ID);
const userPoolId = getEnvVariable(AWS_USER_POOL_ID);

const useCredentials = () => {
  const token = getStoredCognitoIdToken();
  return fromCognitoIdentityPool({
    clientConfig: { region },
    identityPoolId,
    logins: {
      [`cognito-idp.${region}.amazonaws.com/${userPoolId}`]: token,
    },
  });
};

const cognitoClient = () =>
  new CognitoIdentityProviderClient({
    region,
    credentials: useCredentials(),
  });

const cognitoUserPool = new CognitoUserPool({
  UserPoolId: userPoolId,
  ClientId: clientId,
});

const cognitoUser = (username: string) =>
  new CognitoUser({
    Username: username,
    Pool: cognitoUserPool,
  });

const cognitoAuthDetails = (username: string, password: string) =>
  new AuthenticationDetails({
    Username: username,
    Password: password,
  });

const awsHelper = {
  aws: {
    region,
  },
  cognito: {
    userPoolId,
    authDetails: cognitoAuthDetails,
    cognitoUser,
    client: cognitoClient,
    clientId,
    useCredentials,
  },

  s3: {
    client: () =>
      new S3Client({
        region,
        credentials: useCredentials(),
      }),
  },
};

export default awsHelper;
