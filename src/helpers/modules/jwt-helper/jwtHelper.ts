/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt_decode from 'jwt-decode';
import { environmentHelper, storageHelper } from '../../';
import { CONSTANTS } from '../../../constants';
import { DecodeCognitoAccessToken } from './jwtHelper.types';

const { getEnvVariable } = environmentHelper;
const { IM_APPLICATION_JWT } = CONSTANTS.STORAGE.KEYS;
const { AWS_USER_POOL_WEB_CLIENT_ID } = CONSTANTS.ENVIRONMENT.VARIABLES;

const clientId = getEnvVariable(AWS_USER_POOL_WEB_CLIENT_ID);
const getLastUserAuth = () => storageHelper.local.get(`CognitoIdentityServiceProvider.${clientId}.LastAuthUser`);
const getStoredCognitoAccessToken = () =>
  storageHelper.local.get(`CognitoIdentityServiceProvider.${clientId}.${getLastUserAuth()}.accessToken`);
const getStoredCognitoIdToken = () => storageHelper.local.get(`CognitoIdentityServiceProvider.${clientId}.${getLastUserAuth()}.idToken`);
const getStoredAuthToken = () => storageHelper.local.get(IM_APPLICATION_JWT);
const decodeToken = <DecodedData = any>(token: string) => {
  if (token) {
    const decode: DecodedData = jwt_decode(token);
    return decode;
  }
  return null;
};

const jwtHelper = {
  getStoredCognitoAccessToken,
  getStoredCognitoIdToken,
  getStoredAuthToken,
  decodeStoredCognitoAccessToken() {
    return decodeToken<DecodeCognitoAccessToken>(getStoredCognitoAccessToken());
  },
  decodeStoredAuthToken() {
    return decodeToken(getStoredAuthToken());
  },
};

export default jwtHelper;
