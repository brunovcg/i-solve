/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from 'axios';
import { ListGroupsCommand, ListUsersCommand } from '@aws-sdk/client-cognito-identity-provider';

export type HTTPMethod = 'delete' | 'post' | 'get' | 'put' | 'patch';

export type AxiosArguments = {
  baseURL: string;
  url?: string;
  method?: HTTPMethod;
  payload?: unknown;
  auth?: boolean;
  getToken?: () => string;
  customConfigs?: AxiosRequestConfig;
};

export type ParamsRegisterObject = {
  [string: string]: string;
};

export type HTTPResponse = {
  data: any;
  message: string;
  status: number;
};

export type RequestArgs = { url: string; method?: HTTPMethod; auth?: boolean; customConfigs?: AxiosRequestConfig<any> };

export type CognitoCommand = ListUsersCommand | ListGroupsCommand;
