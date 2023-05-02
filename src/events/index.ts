import { CONSTANTS } from '../constants';

const { RENEW_SESSION } = CONSTANTS.EVENTS;

const events = {
  expiredTokenRenewSession() {
    const event = new Event(RENEW_SESSION);
    document.dispatchEvent(event);
  },
};

export default events;
