import {useReducer} from 'react';
export interface TableProps {
  schema: Record<
    string,
    {
      label: string;
      type: "string" | "number";
    }
  >;
  data: Record<string, string | number>[];
}

const initialState = {
  page: 0,
  rowsPerPage: 10
}

enum ActionType {
  FIRST_PAGE = 'FIRST_PAGE',
  PREV_PAGE = 'PREV_PAGE',
  NEXT_PAGE = 'NEXT_PAGE',
  LAST_PAGE = 'LAST_PAGE',
  SET_ROWS_PER_PAGE = 'SET_ROWS_PER_PAGE'
}



export default function Table({ data, schema }: TableProps) {
  const reducer : React.Reducer<typeof initialState, {
    type: ActionType;
    payload?: number;
  }> = (state, action ) => {
    const pageCount = Math.ceil(data.length / state.rowsPerPage);
    switch (action.type) {
      case 'FIRST_PAGE':
        return {...state, page: 0}
      case 'PREV_PAGE':
        if (state.page > 0) 
          return {...state, page: state.page - 1}
        else return state;
      case 'NEXT_PAGE':
        if (state.page < pageCount - 1)
          return {...state, page: state.page + 1}
        else return state;
      case 'LAST_PAGE':
        return {...state, page: pageCount - 1}
      case 'SET_ROWS_PER_PAGE':
        return {page: 0, rowsPerPage: action.payload!}
      default:
        return state;
    }
  }
  const [{
    page, rowsPerPage
  }, dispatch] = useReducer(reducer, initialState);
  if (page > data.length / rowsPerPage) {
    throw new Error("Invalid page number");
  }

  return (
    <table className="table-auto w-full">
      <thead className="bg-gray-200">
        <tr>
          {Object.keys(schema).map((key) => (
            <th key={key}>{schema[key].label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data
          .slice(rowsPerPage * page, rowsPerPage * (page + 1))
          .map((row, index) => (
            <tr key={index}>
              {Object.keys(schema).map((key) => (
                <td key={key}>{row[key]}</td>
              ))}
            </tr>
          ))}
      </tbody>
      <tfoot className="bg-gray-200">
        <tr>
          <td colSpan={Object.keys(schema).length - 1}></td>
          <td>
            <button
              onClick={() => dispatch({
                type: ActionType.FIRST_PAGE
              })}
              className="mx-2 px-2 border-2  border-black"
            >
              &lt;&lt;
            </button>
            <button
              onClick={() => dispatch({
                type: ActionType.PREV_PAGE
              })}
              className="mx-2 px-2 border-2  border-black"
            >
              &lt;
            </button>
            Page {page + 1} of {Math.ceil(data.length / rowsPerPage)}
            <button
              className="mx-2 px-2 border-2  border-black"
              onClick={() =>
                dispatch({
                  type: ActionType.NEXT_PAGE
                })
              }
            >
              &gt;
            </button>
            <button
              className="mx-2 px-2 border-2  border-black"
              onClick={() =>
                dispatch({
                  type: ActionType.LAST_PAGE
                })
              }
            >
              &gt;&gt;
            </button>
            <span >Rows per page: <select value={rowsPerPage} onChange={(e) => {
              dispatch({
                type: ActionType.SET_ROWS_PER_PAGE,
                payload: Number(e.target.value)
              })
              }}> 
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            </span>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
