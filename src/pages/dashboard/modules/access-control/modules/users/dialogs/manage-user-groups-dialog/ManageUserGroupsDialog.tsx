import { useRef, useState } from 'react';
import { Button, Container, Grid, Select, Title, DeleteConfirmation } from '../../../../../../../../components';
import { GridTemplateArgs } from '../../../../../../../../components/modules/grid/Grid.types';
import { CONSTANTS } from '../../../../../../../../constants';
import { useWindowDimensions } from '../../../../../../../../hooks';
import './ManageUserGroupsDialog.scss';
import { ManageUserGroupsDialogTypes } from './ManageUserGroupsDialog.types';
import { cognitoQueries } from '../../../../../../../../queries';
import { toast } from 'react-toastify';
import { MappedCognitoGroup } from '../../../../../../../../queries/cognito/types';
import { SelectRef } from '../../../../../../../../components/modules/form-group/select/Select.types';
import { jsxHelper } from '../../../../../../../../helpers';

const { GRID } = CONSTANTS.GOOGLE_ICONS;

const { conditionalClasses } = jsxHelper;

const { useListGroupsForUserQuery, useRemoveUserFromGroupMutation, useGroupsUserIsNotIn, useAddUserToManyGroups } = cognitoQueries;

export default function ManageUserGroupsDialog({ user }: ManageUserGroupsDialogTypes) {
  const { username } = user;
  const [selectedGroups, setSelectedGroups] = useState<MappedCognitoGroup[]>([] as MappedCognitoGroup[]);
  const { groupsForUser, groupsForUserIsLoading } = useListGroupsForUserQuery({ username });
  const { isMobileViewport } = useWindowDimensions();
  const selectGroupRef = useRef<SelectRef>(null);

  const { mutate: removeUserFromGroup } = useRemoveUserFromGroupMutation();

  const { groupsUserIsNotInIn, groupsUserIsNotInIsLoading } = useGroupsUserIsNotIn({ username });

  const { addUserIntoManyGroups, addUserIntoManyGroupsIsLoading } = useAddUserToManyGroups();

  const hadGroupsToAdd = !!selectedGroups.length;

  const columns = [
    {
      id: 1,
      accessor: 'name',
      component: 'Group',
      headerAlignment: 'left' as const,
      cellAlignment: 'left' as const,
    },
    {
      id: 2,
      accessor: 'created',
      component: 'Created',
    },
    {
      id: 3,
      accessor: 'modified',
      component: 'Modified',
    },
    {
      id: 4,
      component: 'Remove From Group',
      accessor: 'name',
      template: ({ value }: GridTemplateArgs) => (
        <DeleteConfirmation
          onDelete={() =>
            removeUserFromGroup({
              username,
              groupName: value as string,
              onSuccess: () => toast.info(`Usuário removido do grupo ${value}}`),
            })
          }
        />
      ),
    },
  ];

  const handleAddUserToGroups = () => {
    addUserIntoManyGroups({
      user,
      groupList: selectedGroups,
      onMutate: () => selectGroupRef.current?.resetSelectValues(),
      onSuccess: () => toast.info('Usuário adicionado ao grupo'),
    });
  };

  const membersSelectWrapperClasses = conditionalClasses({
    ['im-member-add-groups']: true,
    ['im-mobile-view']: isMobileViewport,
  });

  return (
    <div className="im-manager-user-groups-dialog">
      <Container className="im-manager-user-groups-container">
        <Title icon={GRID} text="Gerenciar Grupos" />
        <div className={membersSelectWrapperClasses}>
          <Select
            options={groupsUserIsNotInIn}
            loading={groupsUserIsNotInIsLoading}
            disabled={addUserIntoManyGroupsIsLoading}
            accessor="name"
            width="260px"
            multiple
            label="Grupos"
            onChange={(value: MappedCognitoGroup[]) => setSelectedGroups(value)}
            ref={selectGroupRef}
          />
          <Button
            text="Confirmar"
            disabled={!hadGroupsToAdd || addUserIntoManyGroupsIsLoading}
            width="100px"
            loading={addUserIntoManyGroupsIsLoading}
            onClick={handleAddUserToGroups}
          />
        </div>
      </Container>
      <Container className="im-manager-user-groups-container" height={isMobileViewport ? '290px' : '340px'}>
        <Title icon={GRID} text="Gerenciar Usuários" />
        <Grid
          columns={columns}
          rows={groupsForUser}
          loading={groupsForUserIsLoading}
          height={isMobileViewport ? '230px' : '300px'}
          noData="Sem resultados."
        />
      </Container>
    </div>
  );
}
