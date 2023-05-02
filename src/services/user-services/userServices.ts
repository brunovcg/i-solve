import { environmentHelper, httpHelper, jwtHelper } from '../../helpers';
import { SignInArgs } from './userServices.types';

const { setServiceEnvironment } = environmentHelper;
const { getStoredAuthToken } = jwtHelper;

const baseURL = setServiceEnvironment({
  production: 'https://investor-machine-back.herokuapp.com',
  staging: 'https://investor-machine-back-staging.herokuapp.com',
  development: 'https://investor-machine-back-staging.herokuapp.com',
});

const httpRequest = new httpHelper.HTTPRequest({ baseURL, getToken: () => getStoredAuthToken() });

const userServices = {
  signIn(payload: SignInArgs) {
    return httpRequest.post({ payload, url: 'login', auth: false });
  },

  getUserDataByToken() {
    return httpRequest.get({ url: '/user-data', auth: true });
  },
};

export default userServices;
