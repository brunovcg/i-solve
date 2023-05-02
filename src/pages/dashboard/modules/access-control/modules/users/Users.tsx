import { ButtonIcon, ControlledTable, Button, Switch } from '../../../../../../components';
import { useDialog } from '../../../../../../hooks';
import { CONSTANTS } from '../../../../../../constants';
import { ColumnCellProps } from '../../../../../../components/modules/table/root-component/Table.types';
import ManageUserGroupsDialog from './dialogs/manage-user-groups-dialog/ManageUserGroupsDialog';
import RegisterUserDialog from './dialogs/register-user-dialog/RegisterUserDialog';
import { cognitoQueries } from '../../../../../../queries';
import { MappedCognitoUser } from '../../../../../../queries/cognito/types';

const { ADD, GEAR } = CONSTANTS.GOOGLE_ICONS;
const { useListUsersQuery, useEnableDisabledUserMutation } = cognitoQueries;

export default function Users() {
  const { data, isLoading } = useListUsersQuery();
  const { mutate: updateUserStatus } = useEnableDisabledUserMutation();

  const {
    dialogRenderer: registerUserDialogRenderer,
    setDialog: setRegisterUserDialog,
    closeDialog: closeRegisterUserDialog,
  } = useDialog({
    defaultCloseButton: false,
  });
  const { dialogRenderer: manageUserGroupsDialogRenderer, setDialog: setManageUserGroupsDialogDialog } = useDialog({
    defaultCloseButton: false,
    height: '600px',
    width: '800px',
  });

  const openManageUserGroupsDialog = (user: MappedCognitoUser) =>
    setManageUserGroupsDialogDialog({
      content: <ManageUserGroupsDialog user={user} />,
      title: `Gerenciar ${user.name}`,
    });

  const openRegisterUserDialog = () =>
    setRegisterUserDialog({
      content: <RegisterUserDialog onSubmitSuccess={closeRegisterUserDialog} />,
      title: 'Cadastrar Usuário',
    });

  const groupsColumns = [
    { Header: 'Nome', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Data Criação', accessor: 'created' },
    { Header: 'Data Modificação', accessor: 'modified' },
    {
      Header: 'Ativado/Desativado',
      accessor: 'enabled',
      Cell: ({ value, row }: ColumnCellProps) => (
        <div className="im-global-centered">
          <Switch checked={value} onChange={() => updateUserStatus({ username: row?.original.id, currentStatus: value })} />
        </div>
      ),
      disableSortBy: true,
    },
    {
      Header: 'Gerenciar Grupos',
      Cell: ({ row }: ColumnCellProps) => (
        <div className="im-global-centered">
          <ButtonIcon
            icon={GEAR}
            variant="primary-dark"
            onClick={() => openManageUserGroupsDialog(row.original as unknown as MappedCognitoUser)}
          />
        </div>
      ),
      disableSortBy: true,
    },
  ];

  return (
    <div className="im-access-control-groups">
      <Button icon={ADD} text="Cadastrar Usuário" onClick={openRegisterUserDialog} />
      <ControlledTable
        columns={groupsColumns}
        data={data}
        allowExportCSV={false}
        allowExportExcel={false}
        loading={isLoading}
        paginate={[10, 20, 30]}
      />
      {registerUserDialogRenderer}
      {manageUserGroupsDialogRenderer}
    </div>
  );
}
