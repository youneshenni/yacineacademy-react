import { useEffect, useMemo, useState } from "react";
import Menu, { MenuProps } from "./components/menu";
import Table, { TableProps } from "./components/table";

const sections = [
  "Products",
  "Services",
  "Solutions",
  "Resources",
  "Support",
  "Enterprise",
  "Platform",
  "Tools",
  "Learning",
  "Community",
  "Development",
  "Analytics",
  "Security",
  "Cloud",
  "Mobile",
];

const generateSlug = (label: string): string => {
  return label.toLowerCase().replace(/\s+/g, "-");
};

interface MenuItem {
  label: string;
  url: string;
  children?: MenuItem[];
}

const generateMenuLevel = (
  depth: number,
  maxDepth: number,
  itemsPerLevel: number,
  parentPath: string = ""
): MenuItem[] => {
  if (depth >= maxDepth) return [];

  return Array.from({ length: itemsPerLevel }, (_, index) => {
    const label = `${sections[index % sections.length]} ${depth + 1}.${
      index + 1
    }`;
    const slug = generateSlug(label);
    const url = `${parentPath}/${slug}`;

    const item: MenuItem = {
      label,
      url,
    };

    const children = generateMenuLevel(depth + 1, maxDepth, itemsPerLevel, url);

    if (children.length > 0) {
      item.children = children;
    }

    return item;
  });
};

export const generateMenu = (
  maxDepth: number = 3,
  itemsPerLevel: number = 4,
  baseUrl: string = ""
): MenuItem[] => {
  return [
    {
      label: "Home",
      url: "/",
    },
    ...generateMenuLevel(0, maxDepth, itemsPerLevel, baseUrl),
  ];
};

const tableData = Array.from({ length: 1000 }, (_, index) => ({
  id: index,
  name: `Name ${index}`,
  age: Math.floor(Math.random() * 100),
}));

const tableSchema: TableProps['schema'] = {
  id: {
    label: "ID",
    type: "number",
  },
  name: {
    label: "Name",
    type: "string",
  },
  age: {
    label: "Age",
    type: "number",
  },
};


// In your component:
const menuData = generateMenu(2, 4); // 3 levels deep, 4 items per level

function App() {
  const [data, setData] = useState<MenuProps["items"]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("fetching data", counter);
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [counter]);

  console.log("new Render");
  const startTime = performance.now();
  const menuItems = useMemo(() => {
    console.log("Filtering menu...");
    return filterMenu(menuData).slice(0, 4)}, [menuData]);
  const endTime = performance.now();
  console.log("Time taken", endTime - startTime);

  return (
    <div style={{ display: "flex" }}>
      <Menu items={menuItems} />
      <div className="flex flex-col w-full align-top">

      <button onClick={() => setCounter((counter) => counter + 1)} className="w-fit m-4 bg-slate-300 rounded-md px-2 py-1 border-black border-1">
        Counter {counter}
      </button>
      <Table data={tableData} schema={tableSchema}/>
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
