import { useEffect, useMemo, useState, useContext} from "react";
import Menu, { MenuProps } from "./components/menu";
import Table from "./components/table/table";
import KPI from "./components/kpi";
import BarChart from "./components/bar-chart";
import { UserContext } from "./user/user.context";

interface SchemaColumn {
  label: string;
  type: "string" | "number";
}

const tableSchema: Record<string, SchemaColumn> = {
  name: { label: "Name", type: "string" },
  age: { label: "Age", type: "number" },
  id: { label: "ID", type: "string" },
};

function TestComponent() {
  return <Test2 />
}

function Test2() {
  const userContext = useContext(UserContext);

  return <div>
    <p>
      Total user data: {userContext.data.length}
    </p>
    <p>
      Total user count: {userContext.count}
    </p>
    <p>
      User ranges total: {userContext.ranges.reduce((acc, {count}) => acc + count, 0)}
    </p>
  </div>
}



function App() {
  const [menuData, setMenu] = useState<MenuProps["items"]>([]);
  const [counter, setCounter] = useState(0);

  const {
    data: tableData,
    count: tableCount,
    ranges,
    onPageChange: setPage,
    onRowsPerPageChange: setRowsPerPage,
  } = useContext(UserContext);
  
  

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  

  console.log("new Render");
  const startTime = performance.now();
  const menuItems = useMemo(() => {
    console.log("Filtering menu...");
    return filterMenu(menuData).slice(0, 4);
  }, [menuData]);
  const endTime = performance.now();
  console.log("Time taken", endTime - startTime);

  return (
    <div style={{ display: "flex" }}>
      <Menu items={menuItems} />
      <div className="flex flex-col w-full align-top">
        <button
          onClick={() => setCounter((counter) => counter + 1)}
          className="w-fit m-4 bg-slate-300 rounded-md px-2 py-1 border-black border-1"
        >
          Counter {counter}
        </button>
        <div className="grid grid-cols-4 gap-4 m-4 grid-rows-[96px]">
        {ranges.map(range => <KPI key={range.label} label={range.label} count={range.count} />)}
        <div className="row-start-1 row-end-5 col-start-3 col-end-5"><BarChart data={ranges} title="Ages" description="Répartition des ages" /></div>
        <div className="col-span-2 row-start-4 row-end-8"><Table
          data={tableData}
          schema={tableSchema}
          onPageChange={(page) => setPage(page)}
          onRowsPerPageChange={(rowsPerPage) => setRowsPerPage(rowsPerPage)}
          count={tableCount}
        /></div>
        <TestComponent />
        </div>

      </div>
    </div>
  );
}

export default App;

function filterMenu(menu: MenuProps["items"]): MenuProps["items"] {
  return menu
    .filter(({ url }) => url !== "/")
    .map((item) =>
      item.children ? { ...item, children: filterMenu(item.children) } : item
    );
}
