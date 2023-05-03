import { environmentHelper, httpHelper, jwtHelper } from '../../helpers';
import { QueryClient } from 'react-query';
import { CONSTANTS } from '../../constants';

const { setServiceEnvironment } = environmentHelper;
const { getStoredAuthToken } = jwtHelper;

const { LIST_TICKETS } = CONSTANTS.QUERIES;

const baseURL = setServiceEnvironment({
  production: 'http://localhost:4444',
  staging: 'http://localhost:4444',
  development: 'http://localhost:4444',
});

const httpRequest = new httpHelper.HTTPRequest({ baseURL, getToken: () => getStoredAuthToken() });

const ticketServices = {
  listTickets() {
    return httpRequest.get({ url: 'ticket', auth: true });
  },

  sendAnswer(payload: { answer: string }, id: number, callBack: () => void) {
    const queryClient = new QueryClient();

    return httpRequest
      .patch({
        url: `ticket/${id}`,
        auth: true,
        payload,
      })
      .then(() => {
        callBack();
        queryClient.invalidateQueries(LIST_TICKETS);
      });
  },

  sendComplain(
    payload: { id: number; client: string; email: string; message: string; pedido: number; title: string },
    callback: () => void
  ) {
    const queryClient = new QueryClient();

    return httpRequest
      .post({
        url: 'ticket',
        auth: true,
        payload,
      })
      .then(() => {
        queryClient.invalidateQueries(LIST_TICKETS);
        callback();
      });
  },
};

export default ticketServices;
