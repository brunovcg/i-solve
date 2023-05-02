import { UnknownObject } from '../../types';

/* eslint-disable @typescript-eslint/no-explicit-any */
const dataHelper = {
  listUnfilteredObjFromListByKey: ({
    completeList,
    filteredList,
    key,
    conditionToStart,
  }: {
    completeList: { [key: string]: any }[];
    filteredList: { [key: string]: any }[];
    key: string;
    conditionToStart?: boolean;
  }) => {
    if (!conditionToStart) {
      return [];
    }
    const COMPLETE_LIST_LENGTH = completeList.length;
    const FILTERED_LIST_LENGTH = filteredList.length;

    const LOOP_CYCLES = Math.max(COMPLETE_LIST_LENGTH, FILTERED_LIST_LENGTH);

    const ACCUMULATED_MAP_LIST = new Map();

    for (let i = 0; i <= LOOP_CYCLES; i++) {
      const COMPLETE_LIST_ITEM = completeList[Number(i)];
      const FILTERED_LIST_ITEM = filteredList[Number(i)];

      const COMPLETE_LIST_ITEM_KEY = COMPLETE_LIST_ITEM?.[key as keyof typeof COMPLETE_LIST_ITEM];
      const FILTERED_LIST_ITEM_KEY = FILTERED_LIST_ITEM?.[key as keyof typeof FILTERED_LIST_ITEM];

      if (COMPLETE_LIST_ITEM_KEY) {
        if (!ACCUMULATED_MAP_LIST.has(COMPLETE_LIST_ITEM_KEY)) {
          ACCUMULATED_MAP_LIST.set(COMPLETE_LIST_ITEM_KEY, COMPLETE_LIST_ITEM);
        } else {
          ACCUMULATED_MAP_LIST.delete(COMPLETE_LIST_ITEM_KEY);
        }
      }
      if (FILTERED_LIST_ITEM_KEY) {
        if (!ACCUMULATED_MAP_LIST.has(FILTERED_LIST_ITEM_KEY)) {
          ACCUMULATED_MAP_LIST.set(FILTERED_LIST_ITEM_KEY, FILTERED_LIST_ITEM);
        } else {
          ACCUMULATED_MAP_LIST.delete(FILTERED_LIST_ITEM_KEY);
        }
      }
    }

    return Array.from(ACCUMULATED_MAP_LIST.values());
  },
  isEmptyObject(object: UnknownObject) {
    return JSON.stringify(object) === '{}';
  },
  updateArrayOfObject<ObjectType>({
    state,
    objectKeyFilter,
    comparisonField,
    newValues,
    callback,
  }: {
    state: ObjectType[];
    objectKeyFilter: string;
    callback?: (newState: ObjectType[]) => void;
    newValues: { [key: string]: string | number | UnknownObject | Array<any> | null | undefined };
    comparisonField: string | number;
  }) {
    const newState = [...state];
    const updatedRowIndex = state.findIndex((item) => item[String(objectKeyFilter) as keyof ObjectType] === comparisonField);
    newState.splice(updatedRowIndex, 1, { ...newState[Number(updatedRowIndex)], ...newValues });
    callback?.(newState);
    return newState;
  },
};

export default dataHelper;
