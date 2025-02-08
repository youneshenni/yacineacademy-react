export type dataType = number | string;

export const tableInitialState = {
  page: 0,
  rowsPerPage: 10,
  data: [] as Record<string, dataType>[],
  count: 0,
};

export enum TableActionType {
  FIRST_PAGE = "FIRST_PAGE",
  PREV_PAGE = "PREV_PAGE",
  NEXT_PAGE = "NEXT_PAGE",
  LAST_PAGE = "LAST_PAGE",
  SET_ROWS_PER_PAGE = "SET_ROWS_PER_PAGE",
  LOAD_DATA = "LOAD_DATA",
}

export const tableReducer: (count?: number) => React.Reducer<
  typeof tableInitialState,
  {
    type: TableActionType;
    payload?: number | { count: number; data: Record<string, dataType>[] };
  }
> = (count) => (state, action) => {
  console.log(count);
  const pageCount = count
    ? Math.ceil(count / state.rowsPerPage)
    : state.rowsPerPage;
  console.log(pageCount);
  switch (action.type) {
    case "FIRST_PAGE":
      return { ...state, page: 0 };
    case "PREV_PAGE":
      if (state.page > 0) return { ...state, page: state.page - 1 };
      else return state;
    case "NEXT_PAGE":
      if (state.page < pageCount - 1) return { ...state, page: state.page + 1 };
      else return state;
    case "LAST_PAGE":
      return { ...state, page: pageCount - 1 };
    case "SET_ROWS_PER_PAGE":
      return { ...state, page: 0, rowsPerPage: action.payload as number };
    case "LOAD_DATA": {
      const payload = action.payload as {
        count: number;
        data: Record<string, dataType>[];
      };
      return {
        ...state,
        data: payload.data,
        count: payload.count,
      };
    }
    default:
      return state;
  }
};
