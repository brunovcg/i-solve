/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { storageHelper } from '../..';
import { AxiosArguments, HTTPResponse, RequestArgs } from './httpHelper.types';
import { CONSTANTS } from '../../../constants';
import events from '../../../events';

const { HTTP_RESPONSE_ERRORS, STORAGE, HTTP_STATUS } = CONSTANTS;
const { UNAUTHORIZED } = HTTP_STATUS;
const { COGNITO, IM_APPLICATION } = STORAGE.INITIALS;

export class HTTPRequest {
  private getToken?: () => string;

  private client: AxiosInstance;

  private request<Payload>({ payload, url, method, auth = true, customConfigs }: { payload?: Payload } & RequestArgs) {
    function formatResponse(res: AxiosResponse): HTTPResponse {
      return {
        data: res.data ?? {},
        status: res.status,
        message: res.statusText,
      };
    }

    function formatError(error: AxiosError) {
      return {
        data: error.response?.data,
        status: error.response?.status,
        message: error.message,
      };
    }

    this.client.interceptors.response.use(
      (response) => formatResponse(response) as any,
      (error) => {
        const formattedError = formatError(error) as any;
        if (error.response.status === UNAUTHORIZED) {
          events.expiredTokenRenewSession();
        }
        if (formattedError?.data?.name === HTTP_RESPONSE_ERRORS.EXPIRED_TOKEN) {
          storageHelper.local.clean([COGNITO, IM_APPLICATION]);
          events.expiredTokenRenewSession();
        }

        return formattedError;
      }
    );

    const defaultConfigs = auth
      ? {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + (this.getToken?.() ?? ''),
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
          },
        }
      : {
          headers: {
            'Content-Type': 'application/json',
          },
        };

    const configs = { ...defaultConfigs, ...(customConfigs ?? {}) };

    switch (method) {
      case 'get':
        return this.client.get<any, HTTPResponse>(url, configs);
      case 'post':
        return this.client.post<any, HTTPResponse>(url, payload, configs);
      case 'delete':
        return this.client.delete<any, HTTPResponse>(url, configs);
      case 'patch':
        return this.client.patch<any, HTTPResponse>(url, payload, configs);
      case 'put':
        return this.client.put<any, HTTPResponse>(url, payload, configs);
      default:
        return this.client.get<any, HTTPResponse>(url, configs);
    }
  }

  constructor(options: AxiosArguments) {
    const { baseURL, getToken } = options;

    this.getToken = getToken;

    this.client = axios.create({ baseURL });
  }

  get({ url, auth, customConfigs }: RequestArgs) {
    return this.request({ url, method: 'get', auth, customConfigs });
  }

  post<Payload>({ payload, url, auth, customConfigs }: { payload?: Payload } & RequestArgs) {
    return this.request({ payload, url, method: 'post', auth, customConfigs });
  }

  delete({ url, auth, customConfigs }: RequestArgs) {
    return this.request({ url, method: 'delete', auth, customConfigs });
  }

  put<Payload>({ payload, url, auth, customConfigs }: { payload?: Payload } & RequestArgs) {
    return this.request({ payload, url, method: 'put', auth, customConfigs });
  }

  patch<Payload>({ payload, url, auth, customConfigs }: { payload?: Payload } & RequestArgs) {
    return this.request({ payload, url, method: 'patch', auth, customConfigs });
  }
}
