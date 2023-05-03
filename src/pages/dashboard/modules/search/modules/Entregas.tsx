import { ControlledTable } from '../../../../../components';

import { entregasQueries } from '../../../../../queries';

const { listEntregasQuery } = entregasQueries;

export default function Entregas() {
  const { entregas, entregasIsLoading } = listEntregasQuery();

  const columns = [
    {
      Header: 'Número do pedido',
      accessor: 'id',
    },
    {
      Header: 'Cidade',
      accessor: 'city',
    },
    {
      Header: 'Endereco',
      accessor: 'address',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
  ];

  return (
    <div>
      <ControlledTable columns={columns} data={entregas} paginate={[10, 20, 30]} loading={entregasIsLoading} />
    </div>
  );
}
