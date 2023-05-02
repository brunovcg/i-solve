import { Button, Container, Select, Title, DeleteConfirmation, Grid, Chip } from '../../../../../../../../components';
import './GroupMembersDialog.scss';
import { CONSTANTS } from '../../../../../../../../constants';
import { useRef, useState } from 'react';
import { GridTemplateArgs } from '../../../../../../../../components/modules/grid/Grid.types';
import { cognitoQueries } from '../../../../../../../../queries';
import { MappedCognitoGroup, MappedCognitoUser } from '../../../../../../../../queries/cognito/types';
import { SelectRef } from '../../../../../../../../components/modules/form-group/select/Select.types';
import { toast } from 'react-toastify';
import { jsxHelper } from '../../../../../../../../helpers';
import { useWindowDimensions } from '../../../../../../../../hooks';

const { conditionalClasses } = jsxHelper;
const { ADD, TABLE } = CONSTANTS.GOOGLE_ICONS;
const { useListUsersInGroupQuery, useRemoveUserFromGroupMutation, useUsersNotInAGroup, useAddManyUsersToGroup } = cognitoQueries;

export default function GroupMembersDialog({ group }: { group: MappedCognitoGroup }) {
  const [selectedMembers, setSelectedMembers] = useState<MappedCognitoUser[]>([] as MappedCognitoUser[]);
  const { usersInGroupIsLoading, usersInGroup } = useListUsersInGroupQuery({ groupName: group.name });
  const hadMembersSelectedToAdd = !!selectedMembers.length;
  const selectMembersRef = useRef<SelectRef>(null);

  const { isMobileViewport } = useWindowDimensions();
  const { addManyUsersToGroup, addManyUsersToGroupIsLoading } = useAddManyUsersToGroup();

  const { mutate: removeUserFromGroup } = useRemoveUserFromGroupMutation();
  const { usersNotInGroup, usersNotInGroupIsLoading } = useUsersNotInAGroup({ groupName: group.name });

  const groupMembersColumns = [
    { id: 1, component: 'Nome', accessor: 'name', cellAlignment: 'left' as const },
    { id: 2, component: 'Email', accessor: 'email', cellAlignment: 'left' as const },
    {
      id: 3,
      component: 'Status',
      accessor: 'enabled',
      template: ({ value }: GridTemplateArgs) => {
        const variant = value ? 'valid' : 'cancel';
        const text = value ? 'Ativado' : 'Disativado';
        return <Chip text={text} variant={variant} />;
      },
    },
    {
      id: 4,
      component: 'Remover do Grupo',
      accessor: 'username',
      template: ({ value }: GridTemplateArgs) => (
        <DeleteConfirmation
          onDelete={() =>
            removeUserFromGroup({
              username: value as string,
              groupName: group.name,
              onSuccess: () => toast.info('Mebmbro removido do grupo.'),
            })
          }
        />
      ),
    },
  ];

  const handleAddUsers = () => {
    addManyUsersToGroup({
      userList: selectedMembers,
      group,
      onMutate: () => selectMembersRef.current?.resetSelectValues(),
      onSuccess: () => toast.info('Membro adicionado ao grupo'),
    });
  };

  const membersSelectWrapperClasses = conditionalClasses({
    ['im-group-add-members']: true,
    ['im-mobile-view']: isMobileViewport,
  });

  return (
    <div className="im-group-members-dialog">
      <Container className="im-group-member-container">
        <Title icon={ADD} text="Adicionar memberos" variant="dark" size="medium" />
        <div className={membersSelectWrapperClasses}>
          <Select
            ref={selectMembersRef}
            options={usersNotInGroup}
            disabled={addManyUsersToGroupIsLoading}
            accessor="name"
            width="260px"
            multiple
            label="Membros"
            onChange={(value: MappedCognitoUser[]) => setSelectedMembers(value)}
            loading={usersNotInGroupIsLoading}
          />
          <Button
            text="Confirmar"
            disabled={!hadMembersSelectedToAdd}
            loading={addManyUsersToGroupIsLoading}
            onClick={handleAddUsers}
            width="100px"
          />
        </div>
      </Container>

      <Container className="im-group-member-container im-group-member-container-table" height={isMobileViewport ? '290px' : '340px'}>
        <Title icon={TABLE} text="Tabela de membros" variant="dark" size="medium" />
        <Grid
          columns={groupMembersColumns}
          rows={usersInGroup}
          loading={usersInGroupIsLoading}
          noData="Não há membros"
          height={isMobileViewport ? '230px' : '300px'}
        />
      </Container>
    </div>
  );
}
