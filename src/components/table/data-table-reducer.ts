export enum DataTableActionType {
  ON_PAGE_CHANGE = "ON_PAGE_CHANGE",
  ON_ROWS_PER_PAGE_CHANGE = "ON_ROWS_PER_PAGE_CHANGE",
  LOAD_DATA = "LOAD_DATA",
}

export const dataTableInitialState = {
  page: 0,
  rowsPerPage: 10,
  data: [] as Record<string, number | string>[],
  count: undefined as number | undefined,
};

export const dataTableReducer: React.Reducer<
  typeof dataTableInitialState,
  {
    type: DataTableActionType;
    payload?:
      | number
      | { count: number; data: Record<string, number | string>[] };
  }
> = (state, action) => {
  switch (action.type) {
    case DataTableActionType.ON_PAGE_CHANGE:
      return { ...state, page: action.payload as number };
    case DataTableActionType.ON_ROWS_PER_PAGE_CHANGE:
      return { ...state, page: 0, rowsPerPage: action.payload as number };
    case DataTableActionType.LOAD_DATA: {
      const payload = action.payload as {
        count: number;
        data: Record<string, number | string>[];
      };
      return {
        ...state,
        data: payload.data,
        count: payload.count,
      };
    }
  }
  throw new Error("Invalid action type");
};
