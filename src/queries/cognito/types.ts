import { CognitoGroup, CognitoUser } from '../../services/cognito-services/cognitoServices.types';

export type MappedCognitoUser = {
  id: number;
  name: string;
  created: string;
  email: string;
  enabled: boolean;
  modified: string;
  username: string;
  rawData: CognitoUser;
};

export type MappedCognitoGroup = {
  created: string;
  modified: string;
  name: string;
  description: string;
  id: string | number;
  rawData: CognitoGroup;
};
