export type DecodeCognitoAccessToken = null | {
  'auth_time': number;
  'client_id': string;
  'cognito:groups': string[];
  'event_id': string;
  'exp': number;
  'iat': number;
  'iss': string;
  'jti': string;
  'origin_jti': string;
  'scope': string;
  'sub': string;
  'token_use': string;
  'username': string;
};
