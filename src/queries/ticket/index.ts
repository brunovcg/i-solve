import { useQuery } from 'react-query';
import { CONSTANTS } from '../../constants';
import { ticketServices } from '../../services';

const { listTickets } = ticketServices;
const { LIST_TICKETS } = CONSTANTS.QUERIES;

const listTicketsQuery = () => {
  const { data, isLoading } = useQuery(LIST_TICKETS, listTickets);

  return { tickets: data?.data, ticketsIsLoading: isLoading };
};

export default { listTicketsQuery };
