import { ButtonIcon, ControlledTable, Button } from '../../../../../../components';
import { useDialog } from '../../../../../../hooks';
import GroupMembersDialog from './dialogs/group-members-dialog/GroupMembersDialog';
import GroupPermissionsDialog from './dialogs/group-permissions-dialog/GroupPermissionsDialog';
import { CONSTANTS } from '../../../../../../constants';
import { ColumnCellProps } from '../../../../../../components/modules/table/root-component/Table.types';
import { IconType } from '../../../../../../components/modules/icon/Icon.types';
import CreateGroupDialog from './dialogs/create-group-dialog/CreateGroupDialog';
import { cognitoQueries } from '../../../../../../queries';
import { MappedCognitoGroup } from '../../../../../../queries/cognito/types';

const { GROUP, SECURITY, ADD } = CONSTANTS.GOOGLE_ICONS;

const { useListGroupsQuery } = cognitoQueries;

const HOCButtonIcon = ({ icon, onClick }: { icon: IconType; onClick: () => void }) => (
  <div className="im-global-centered">
    <ButtonIcon icon={icon} onClick={onClick} variant="primary-dark" />
  </div>
);

export default function Groups() {
  const { groupsData, isLoadingGroups } = useListGroupsQuery();

  const { dialogRenderer: permissionDialogRenderer, setDialog: setPermissionDialog } = useDialog({
    defaultCloseButton: false,
  });
  const { dialogRenderer: membersDialogRenderer, setDialog: setMembersDialog } = useDialog({
    defaultCloseButton: false,
    width: '800px',
    height: '600px',
  });
  const {
    dialogRenderer: createGroupDialogRenderer,
    setDialog: setCreateGroupDialog,
    closeDialog: closeCreateGroupModal,
  } = useDialog({
    width: '500px',
    defaultCloseButton: false,
  });

  const openGroupPermissionDialog = (groupName: string) => {
    setPermissionDialog({
      content: <GroupPermissionsDialog />,
      title: `Permissões do grupo ${groupName}`,
    });
  };

  const openGroupMembersDialog = (group: MappedCognitoGroup) => {
    setMembersDialog({
      content: <GroupMembersDialog group={group} />,
      title: `Gerir grupo ${group.name}`,
    });
  };

  const openCreateGroupDialog = () => {
    setCreateGroupDialog({
      content: <CreateGroupDialog onSubmitSuccess={closeCreateGroupModal} />,
      title: 'Criar Grupo',
    });
  };

  const groupsColumns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Descrição', accessor: 'description' },
    { Header: 'Criação', accessor: 'created' },
    { Header: 'Modificado', accessor: 'modified' },
    {
      Header: 'Members',
      Cell: ({ row }: ColumnCellProps) => (
        <HOCButtonIcon icon={GROUP} onClick={() => openGroupMembersDialog(row.original as unknown as MappedCognitoGroup)} />
      ),
      disableSortBy: true,
    },
    {
      Header: 'Permissions',
      Cell: ({ row }: ColumnCellProps) => <HOCButtonIcon icon={SECURITY} onClick={() => openGroupPermissionDialog(row.original.name)} />,
      disableSortBy: true,
    },
  ];

  return (
    <div className="im-access-control-groups">
      <Button icon={ADD} text="Criar" onClick={openCreateGroupDialog} />
      <ControlledTable
        columns={groupsColumns}
        data={groupsData}
        allowExportCSV={false}
        allowExportExcel={false}
        loading={isLoadingGroups}
        paginate={[10, 20, 30]}
      />
      {permissionDialogRenderer}
      {membersDialogRenderer}
      {createGroupDialogRenderer}
    </div>
  );
}
