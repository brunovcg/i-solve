import { useQuery, useMutation, useQueryClient, QueryKey } from 'react-query';
import { cognitoServices } from './../../services';
import { CONSTANTS } from '../../constants';
import { useMemo, useState } from 'react';
import { CognitoGroup, CognitoUser } from '../../services/cognito-services/cognitoServices.types';
import { dataHelper } from '../../helpers';
import { MappedCognitoGroup, MappedCognitoUser } from './types';

const { listUnfilteredObjFromListByKey } = dataHelper;
const { COGNITO_LIST_USERS, COGNITO_LIST_GROUPS, COGNITO_USERS_IN_GROUP, COGNITO_LIST_GROUPS_FOR_USER } = CONSTANTS.QUERIES;
const {
  createGroup,
  listUsers,
  enableDisabledUser,
  listGroups,
  listUsersInGroup,
  listGroupsForUser,
  removeUserFromGroup,
  addUserToGroup,
  createUser,
} = cognitoServices;

const useListUsersQuery = () => {
  const { data, isLoading } = useQuery(COGNITO_LIST_USERS, listUsers, {
    refetchOnWindowFocus: false,
  });

  const mappedData = useMemo(
    () =>
      data?.map((user) => ({
        created: user.UserCreateDate?.toDateString(),
        modified: user.UserLastModifiedDate?.toDateString(),
        enabled: user.Enabled,
        name: user.Attributes?.find((attr) => attr.Name === 'name')?.Value,
        email: user.Attributes?.find((attr) => attr.Name === 'email')?.Value,
        username: user.Username,
        id: user.Username,
        rawData: user,
      })) ?? [],
    [data]
  );
  return { data: mappedData, isLoading };
};

const useListGroupsQuery = () => {
  const { data, isLoading } = useQuery(COGNITO_LIST_GROUPS, listGroups, {
    refetchOnWindowFocus: false,
  });

  const mappedData = useMemo(
    () =>
      data?.map((group) => ({
        created: group.CreationDate?.toDateString(),
        modified: group.LastModifiedDate?.toDateString(),
        name: group.GroupName,
        description: group.Description,
        rawData: group,
      })) ?? [],
    [data]
  );

  return { groupsData: mappedData ?? [], isLoadingGroups: isLoading };
};

const useListUsersInGroupQuery = (payload: { groupName: string }) => {
  const { data, isLoading } = useQuery(`${COGNITO_USERS_IN_GROUP}-${payload.groupName}`, () => listUsersInGroup(payload.groupName));
  const mappedData = useMemo(
    () =>
      data?.map((user) => ({
        created: user.UserCreateDate?.toDateString(),
        modified: user.UserLastModifiedDate?.toDateString(),
        enabled: user.Enabled,
        name: user.Attributes?.find((attr) => attr.Name === 'name')?.Value,
        email: user.Attributes?.find((attr) => attr.Name === 'email')?.Value,
        username: user.Username,
        id: user.Username,
      })) ?? [],
    [data]
  );

  return { usersInGroup: mappedData, usersInGroupIsLoading: isLoading };
};

const useListGroupsForUserQuery = (payload: { username: string }) => {
  const { data, isLoading } = useQuery(`${COGNITO_LIST_GROUPS_FOR_USER}-${payload.username}`, () => listGroupsForUser(payload.username));
  const mappedData = useMemo(
    () =>
      data?.map((group) => ({
        created: group?.CreationDate?.toDateString(),
        modified: group?.LastModifiedDate?.toDateString(),
        name: group?.GroupName,
        description: group?.Description,
        id: group?.GroupName,
        rawData: data,
      })) ?? [],
    [data]
  );

  return { groupsForUser: mappedData, groupsForUserIsLoading: isLoading };
};

const useEnableDisabledUserMutation = () => {
  const queryClient = useQueryClient();
  const previousData = queryClient.getQueryData(COGNITO_LIST_USERS);

  return useMutation({
    mutationFn: (payload: { username: string; currentStatus: boolean }) => enableDisabledUser(payload.username, payload.currentStatus),
    onMutate: async (payload: { username: string; currentStatus: boolean }) => {
      await queryClient.cancelQueries(COGNITO_LIST_USERS);
      queryClient.setQueryData(COGNITO_LIST_USERS, (oldData: CognitoUser[] | undefined) => {
        const updatedUserIndex = oldData?.findIndex((item: CognitoUser) => item.Username === payload.username);
        if (updatedUserIndex === -1) {
          return oldData;
        }
        const updatedUsers = structuredClone(oldData);
        const updatedUser = { ...updatedUsers[updatedUserIndex as keyof typeof updatedUsers], Enabled: !payload.currentStatus };
        updatedUsers.splice(updatedUserIndex, 1, updatedUser);
        return updatedUsers;
      });
      return { previousData };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(COGNITO_LIST_USERS, context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(COGNITO_LIST_USERS);
    },
  });
};

const useRemoveUserFromGroupMutation = () => {
  const queryClient = useQueryClient();
  let previousUserGroupsQuery = '';
  let previousGroupUsersQuery = '';

  return useMutation({
    mutationFn: (payload: { username: string; groupName: string; onSuccess: () => void }) => {
      previousUserGroupsQuery = queryClient.getQueryData(`${COGNITO_LIST_GROUPS_FOR_USER}-${payload.username}`) as string;
      previousGroupUsersQuery = queryClient.getQueryData(`${COGNITO_USERS_IN_GROUP}-${payload.groupName}`) as string;
      return removeUserFromGroup(payload.groupName, payload.username);
    },
    onMutate: async (payload: { username: string; groupName: string; onSuccess: () => void }) => {
      const userGroupsQueryKey = `${COGNITO_LIST_GROUPS_FOR_USER}-${payload.username}`;
      const groupUsersQueryKey = `${COGNITO_USERS_IN_GROUP}-${payload.groupName}`;

      await queryClient.cancelQueries([userGroupsQueryKey, groupUsersQueryKey]);
      queryClient.setQueryData(
        userGroupsQueryKey,
        (oldData: CognitoGroup[] | undefined) => oldData?.filter((group) => group?.GroupName !== payload.groupName) ?? []
      );
      queryClient.setQueryData(
        groupUsersQueryKey,
        (oldData: CognitoUser[] | undefined) => oldData?.filter((group) => group?.Username !== payload.username) ?? []
      );
      return { previousUserGroupsQuery, previousGroupUsersQuery };
    },
    onError: (_error, variables, context) => {
      queryClient.setQueryData(`${COGNITO_LIST_GROUPS_FOR_USER}-${variables.username}`, context?.previousUserGroupsQuery);
      queryClient.setQueryData(`${COGNITO_USERS_IN_GROUP}-${variables.groupName}`, context?.previousGroupUsersQuery);
    },

    onSettled: (_data, _error, variables) => {
      variables.onSuccess?.();
      queryClient.invalidateQueries([
        `${COGNITO_LIST_GROUPS_FOR_USER}-${variables.username}`,
        `${COGNITO_USERS_IN_GROUP}-${variables.groupName}`,
      ]);
    },
  });
};

const useAddUserToGroupMutation = () => {
  const queryClient = useQueryClient();
  let previousUserGroupsQuery = '';
  let previousGroupUsersQuery = '';

  const groupsForUsersQueryKey = (username: string) => `${COGNITO_LIST_GROUPS_FOR_USER}-${username}`;
  const usersInGroupQueryKey = (groupName: string) => `${COGNITO_USERS_IN_GROUP}-${groupName}`;

  return useMutation({
    mutationFn: (payload: {
      user: MappedCognitoUser;
      group: MappedCognitoGroup;
      onMutate?: () => void;
      onSuccess?: () => void;
      onError?: () => void;
    }) => {
      previousUserGroupsQuery = queryClient.getQueryData(groupsForUsersQueryKey(payload.user.username)) as string;
      previousGroupUsersQuery = queryClient.getQueryData(usersInGroupQueryKey(payload.group.name)) as string;
      payload.onMutate?.();
      return addUserToGroup(payload.group.name, payload.user.username);
    },
    onMutate: async (payload: {
      user: MappedCognitoUser;
      group: MappedCognitoGroup;
      onMutate?: () => void;
      onSuccess?: () => void;
      onError?: () => void;
    }) => {
      const userGroupsQueryKey = groupsForUsersQueryKey(payload.user.username);
      const groupUsersQueryKey = usersInGroupQueryKey(payload.group.name);
      await queryClient.cancelQueries([userGroupsQueryKey, groupUsersQueryKey]);
      queryClient.setQueryData(userGroupsQueryKey, (oldData: CognitoGroup[] | undefined) => [...(oldData ?? []), payload.group.rawData]);
      queryClient.setQueryData(groupUsersQueryKey, (oldData: CognitoUser[] | undefined) => [...(oldData ?? []), payload.user.rawData]);
      return { previousUserGroupsQuery, previousGroupUsersQuery, userGroupsQueryKey, groupUsersQueryKey };
    },
    onError: (_error, variables, context) => {
      queryClient.setQueryData(context?.userGroupsQueryKey as QueryKey, context?.previousUserGroupsQuery);
      queryClient.setQueryData(context?.groupUsersQueryKey as QueryKey, context?.previousGroupUsersQuery);
      variables.onError?.();
    },
    onSettled: (_data, _error, variables) => {
      variables.onSuccess?.();
      queryClient.invalidateQueries([
        `${COGNITO_LIST_GROUPS_FOR_USER}-${variables.user.username}`,
        `${COGNITO_USERS_IN_GROUP}-${variables.group.name}`,
      ]);
    },
  });
};

const useUsersNotInAGroup = ({ groupName }: { groupName: string }) => {
  const { data: usersList, isLoading: userListIsLoading } = useListUsersQuery();
  const { usersInGroup, usersInGroupIsLoading } = useListUsersInGroupQuery({ groupName });

  const usersNotInGroupIsLoading = userListIsLoading || usersInGroupIsLoading;

  const usersNotInGroup = useMemo(
    () =>
      listUnfilteredObjFromListByKey({
        completeList: usersList,
        filteredList: usersInGroup,
        key: 'name',
        conditionToStart: !usersNotInGroupIsLoading,
      }),
    [usersList, usersInGroup]
  );

  return { usersNotInGroup, usersNotInGroupIsLoading };
};

const useGroupsUserIsNotIn = ({ username }: { username: string }) => {
  const { groupsData, isLoadingGroups } = useListGroupsQuery();
  const { groupsForUser, groupsForUserIsLoading } = useListGroupsForUserQuery({ username });
  const groupsUserIsNotInIsLoading = isLoadingGroups || groupsForUserIsLoading;
  const groupsUserIsNotInIn = useMemo(
    () =>
      listUnfilteredObjFromListByKey({
        completeList: groupsData,
        filteredList: groupsForUser,
        key: 'name',
        conditionToStart: !groupsUserIsNotInIsLoading,
      }),
    [groupsData, groupsForUser]
  );

  return { groupsUserIsNotInIn, groupsUserIsNotInIsLoading };
};

const useCreateGroupMutation = () => {
  const queryClient = useQueryClient();
  const previousGroupsData = queryClient.getQueryData(COGNITO_LIST_GROUPS);

  return useMutation({
    mutationFn: (payload: { groupName: string; description: string; onSubmitSuccess: () => void }) =>
      createGroup(payload.groupName, payload.description),
    onSuccess: (_data, variables) => {
      variables.onSubmitSuccess();
    },
    onError: () => {
      queryClient.setQueryData(COGNITO_LIST_GROUPS, previousGroupsData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(COGNITO_LIST_GROUPS);
    },
  });
};

const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  const previousUsersData = queryClient.getQueryData(COGNITO_LIST_USERS);
  return useMutation({
    mutationFn: (payload: { username: string; email: string; name: string; onSubmitSuccess: () => void }) =>
      createUser(payload.username, payload.email, payload.name),
    onSuccess: (_data, variables) => {
      variables.onSubmitSuccess();
    },
    onError: () => {
      queryClient.setQueryData(COGNITO_LIST_USERS, previousUsersData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(COGNITO_LIST_USERS);
    },
  });
};

const useAddManyUsersToGroup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useAddUserToGroupMutation();
  const addManyUsersToGroup = ({
    userList,
    group,
    onSuccess,
    onMutate,
    onError: onErrorCallback,
  }: {
    userList: MappedCognitoUser[];
    group: MappedCognitoGroup;
    onSuccess?: () => void;
    onMutate?: () => void;
    onError?: (userName: string) => void;
  }) => {
    setIsLoading(true);
    onMutate?.();
    const promises = userList.map((user) => mutate({ user, group, onError: () => onErrorCallback?.(user.name) }));
    Promise.all(promises)
      .then(() => onSuccess?.())
      .finally(() => setIsLoading(false));
  };

  return { addManyUsersToGroup, addManyUsersToGroupIsLoading: isLoading };
};

const useAddUserToManyGroups = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useAddUserToGroupMutation();
  const addUserIntoManyGroups = ({
    user,
    groupList,
    onSuccess,
    onMutate,
    onError: onErrorCallback,
  }: {
    user: MappedCognitoUser;
    groupList: MappedCognitoGroup[];
    onSuccess?: () => void;
    onMutate?: () => void;
    onError?: (groupName: string) => void;
  }) => {
    setIsLoading(true);
    onMutate?.();
    const promises = groupList.map((group) => mutate({ user, group: group, onError: () => onErrorCallback?.(group.name) }));
    Promise.all(promises)
      .then(() => onSuccess?.())
      .finally(() => setIsLoading(false));
  };

  return { addUserIntoManyGroups, addUserIntoManyGroupsIsLoading: isLoading };
};
export default {
  useListUsersQuery,
  useEnableDisabledUserMutation,
  useListGroupsQuery,
  useListUsersInGroupQuery,
  useListGroupsForUserQuery,
  useRemoveUserFromGroupMutation,
  useAddUserToGroupMutation,
  useUsersNotInAGroup,
  useGroupsUserIsNotIn,
  useCreateGroupMutation,
  useCreateUserMutation,
  useAddManyUsersToGroup,
  useAddUserToManyGroups,
};
