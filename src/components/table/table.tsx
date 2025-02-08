import {useEffect, useReducer} from 'react';
import { dataType, TableActionType, tableInitialState, tableReducer } from './reducer';
export interface TableProps {
  schema: Record<
    string,
    {
      label: string;
      type: "string" | "number";
    }
  >;
  data: Record<string, dataType>[];
  count?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
}


export default function Table({ data, count, schema, onPageChange, onRowsPerPageChange }: TableProps) {
  const [{
    page, rowsPerPage,
  }, dispatch] = useReducer(tableReducer(count), tableInitialState);
  console.log(count)

  useEffect(() => {
    onPageChange?.(page);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [page]);

useEffect(() => {
  onRowsPerPageChange?.(rowsPerPage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsPerPage]);
  

  return (
    <table className="w-fit ml-4">
      <thead className="bg-gray-200">
        <tr>
          {Object.keys(schema).map((key) => (
            <th key={key} className='w-fit text-left px-4 py-2 border-r-2'>{schema[key].label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data
          .map((row, index) => (
            <tr key={index} className='odd:bg-gray-100'>
              {Object.keys(schema).map((key) => (
                <td key={key} className='w-fit px-4 py-2 border-r-2'>{row[key]}</td>
              ))}
            </tr>
          ))}
      </tbody>
      {count && (<tfoot className="bg-gray-200 ">
        <tr>
          <td colSpan={Object.keys(schema).length} className='text-end px-16 py-2'>
            <button
              onClick={() => dispatch({
                type: TableActionType.FIRST_PAGE
              })}
              className="mx-2 px-2 border-2 shadow-sm bg-slate-100"
            >
              &lt;&lt;
            </button>
            <button
              onClick={() => dispatch({
                type: TableActionType.PREV_PAGE
              })}
              className="mx-2 px-2 border-2 shadow-sm bg-slate-100"
            >
              &lt;
            </button>
            Page {page + 1} of {Math.ceil(count / rowsPerPage)}
            <button
              className="mx-2 px-2 border-2 shadow-sm bg-slate-100"
              onClick={() =>
                dispatch({
                  type: TableActionType.NEXT_PAGE
                })
              }
            >
              &gt;
            </button>
            <button
              className="mx-2 px-2 border-2 shadow-sm bg-slate-100"
              onClick={() =>
                dispatch({
                  type: TableActionType.LAST_PAGE
                })
              }
            >
              &gt;&gt;
            </button>
            <span >Rows per page: <select value={rowsPerPage} onChange={(e) => {
              dispatch({
                type: TableActionType.SET_ROWS_PER_PAGE,
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
      </tfoot>)}
    </table>
  );
}
