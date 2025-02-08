import { useEffect, useReducer } from "react";
import Table, { TableProps } from "./table";
import { DataTableActionType, dataTableInitialState, dataTableReducer } from "./data-table-reducer";
import { dataType } from "./reducer";

interface DataTableProps {
    fetchData: (page: number, rowsPerPage: number) => Promise<{data: unknown[], count: number}>;
    schema: TableProps['schema'];
}

export default function DataTable({ fetchData, schema }: DataTableProps) {

    const [{
        page, rowsPerPage, data, count
    }, dispatch] = useReducer(dataTableReducer, dataTableInitialState);

    useEffect(() => {
        fetchData(page, rowsPerPage).then((data) => {
          dispatch({
            type: DataTableActionType.LOAD_DATA,
            payload: data as  {count: number, data: Record<keyof typeof schema, dataType>[]}
          })
        });
      }, [page, rowsPerPage, fetchData]);

      return <Table schema={schema} data={data} count={count} onPageChange={(page) => dispatch({
        type: DataTableActionType.ON_PAGE_CHANGE,
        payload: page
      })} onRowsPerPageChange={
        (rowsPerPage) => dispatch({
          type: DataTableActionType.ON_ROWS_PER_PAGE_CHANGE,
          payload: rowsPerPage
        })
      } />;
}