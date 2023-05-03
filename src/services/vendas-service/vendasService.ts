import { environmentHelper, httpHelper, jwtHelper } from '../../helpers';

const { setServiceEnvironment } = environmentHelper;
const { getStoredAuthToken } = jwtHelper;

const baseURL = setServiceEnvironment({
  production: 'http://localhost:4444',
  staging: 'http://localhost:4444',
  development: 'http://localhost:4444',
});

const httpRequest = new httpHelper.HTTPRequest({ baseURL, getToken: () => getStoredAuthToken() });

const vendasServices = {
  listVendas() {
    return httpRequest.get({ url: 'vendas', auth: true });
  },
};

export default vendasServices;
