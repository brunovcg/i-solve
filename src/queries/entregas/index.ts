import { useQuery } from 'react-query';
import entregasServices from '../../services/entregas-services/entregasServices';
import { CONSTANTS } from '../../constants';
import { useMemo } from 'react';

const { listEntregas } = entregasServices;
const { LIST_ENTREGAS } = CONSTANTS.QUERIES;

const listEntregasQuery = () => {
  const { data, isLoading } = useQuery(LIST_ENTREGAS, listEntregas);

  const memoizedData = useMemo(() => data?.data ?? [], [data?.data]);

  return { entregas: memoizedData, entregasIsLoading: isLoading };
};

export default { listEntregasQuery };
