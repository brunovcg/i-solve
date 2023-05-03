import { environmentHelper, httpHelper, jwtHelper } from '../../helpers';

const { setServiceEnvironment } = environmentHelper;
const { getStoredAuthToken } = jwtHelper;

const baseURL = setServiceEnvironment({
  production: 'http://localhost:4444/',
  staging: 'http://localhost:4444/',
  development: 'http://localhost:4444/',
});

const httpRequest = new httpHelper.HTTPRequest({ baseURL, getToken: () => getStoredAuthToken() });

const entregasServices = {
  listEntregas() {
    return httpRequest.get({ url: 'entregas', auth: true });
  },
};

export default entregasServices;
