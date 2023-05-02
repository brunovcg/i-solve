import { awsHelper } from '../../../helpers';
import { CognitoCommand, ParamsRegisterObject } from './httpHelper.types';
import { CONSTANTS } from '../../../constants';
import events from '../../../events';
import { HTTPRequest } from './httpHelper.model';

const { HTTP_RESPONSE_ERRORS } = CONSTANTS;
const { cognito } = awsHelper;

const httpHelper = {
  HTTPRequest,
  setParamsString(paramsObject: ParamsRegisterObject) {
    const validParams = Object.entries(paramsObject);
    return validParams
      .reduce((acc, current) => {
        if (current[1]) {
          acc.push(`${current[0]}=${current[1]}`);
        }
        return acc;
      }, [] as string[])
      .join('&');
  },

  federatedRequest: async <UserCommand, Output>(cognitoCommand: UserCommand, accessor?: string): Promise<Output[]> => {
    try {
      const response = await cognito.client().send(cognitoCommand as CognitoCommand);
      return (accessor ? response[accessor as keyof typeof response] : response) as Output[];
    } catch (e) {
      const error = e as { message: string; __type: string };
      if (error.__type === HTTP_RESPONSE_ERRORS.COGNITO_NOT_AUTHORIZED) {
        events.expiredTokenRenewSession();
      }
      return [];
    }
  },
};

export default httpHelper;
