import { useQuery } from 'react-query';
import vendasServices from '../../services/vendas-service/vendasService';
import { CONSTANTS } from '../../constants';

const { listVendas } = vendasServices;
const { LIST_VENDAS } = CONSTANTS.QUERIES;

const listVendasQuery = () => {
  const { data, isLoading } = useQuery(LIST_VENDAS, listVendas);

  return { vendas: data?.data, vendasIsLoading: isLoading };
};

export default { listVendasQuery };
