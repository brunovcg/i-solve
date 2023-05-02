import { Popover, Input, Icon } from '../../../';
import { ColumnFilterProps } from '../root-component/Table.types';

export default function TableColumnFilter({ column }: ColumnFilterProps) {
  const { filterValue, setFilter } = column;

  return (
    <Popover
      showBorder={false}
      title="Filtro de Coluna"
      content={<Input value={filterValue || ''} onChange={setFilter} placeholder="Digite o valor" />}
      trigger={<Icon icon="close" />}
    />
  );
}
