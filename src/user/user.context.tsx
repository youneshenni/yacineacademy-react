import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<{
  data: { id: number; name: string; age: number }[];
  ranges: { label: string; count: number }[];
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}>({
  data: [],
  ranges: [],
  count: 0,
  page: 0,
  rowsPerPage: 0,
  onPageChange: () => {},
  onRowsPerPageChange: () => {},
});

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState({
    data: [],
    count: 0,
    ranges: [] as {
      count: number;
      label: string;
    }[],
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchData(page, rowsPerPage).then((data) => {
      setUserData(data);
    });
  });

  function fetchData(page: number, rowsPerPage: number) {
    return fetch(`/api/data?page=${page}&rowsPerPage=${rowsPerPage}`).then(
      (res) => res.json()
    );
  }

  return (
    <UserContext.Provider
      value={{
        data: userData.data,
        ranges: userData.ranges,
        count: userData.count,
        page: page,
        rowsPerPage: rowsPerPage,
        onPageChange: setPage,
        onRowsPerPageChange: setRowsPerPage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
