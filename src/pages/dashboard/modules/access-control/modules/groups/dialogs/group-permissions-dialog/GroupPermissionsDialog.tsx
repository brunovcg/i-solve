import { Container, Grid, Select, Title } from '../../../../../../../../components';
import { Alignment } from '../../../../../../../../components/modules/grid/Grid.types';
import './GroupPermissionsDialog.scss';
import { CONSTANTS } from '../../../../../../../../constants';

const { GRID } = CONSTANTS.GOOGLE_ICONS;

export default function GroupMembersDialog() {
  const permissionRows = ['Access Control', 'Dashboard', 'Consultar Sistemas'].map((module, index) => ({
    id: index,
    ApplicationModule: module,
    permissions: (
      <Select
        onChange={(e) => console.log(e)}
        canClear={false}
        options={[
          { id: 1, name: 'None' },
          { id: 2, name: 'Read' },
          { id: 3, name: 'Read-Write' },
        ]}
        accessor="name"
        canSearch={false}
        width="150px"
        initialValue={[{ id: 1, name: 'Read' }]}
        chipColor={{ None: 'var(--valid-color)', Read: 'var(--primary-color)', ['Read-Write']: 'var(--secondary-color)' }}
      />
    ),
  }));

  const permissionColumns = [
    {
      id: 1,
      accessor: 'ApplicationModule',
      component: 'Application Module',
      headerAlignment: 'left' as Alignment,
      cellAlignment: 'left' as Alignment,
    },
    {
      id: 2,
      accessor: 'permissions',
      component: 'Permissions',
    },
  ];

  return (
    <Container className="im-group-permissions-dialog">
      <Title icon={GRID} text="Tabela de módulos" />
      <Grid columns={permissionColumns} rows={permissionRows} />
    </Container>
  );
}
