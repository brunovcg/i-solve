import { ControlledTable } from '../../../../../components';

import { vendasQueries } from '../../../../../queries';

const { listVendasQuery } = vendasQueries;

export default function Vendas() {
  const { vendas, vendasIsLoading } = listVendasQuery();

  const columns = [
    {
      Header: 'Client',
      accessor: 'customer',
    },
    {
      Header: 'Data de Compra',
      accessor: 'createdDate',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Departamento',
      accessor: 'departament',
    },
  ];

  return (
    <div>
      <ControlledTable columns={columns} data={vendas} paginate={[10, 20, 30]} loading={vendasIsLoading} />
    </div>
  );
}
