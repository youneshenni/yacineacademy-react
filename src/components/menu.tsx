import React from "react";

export interface MenuProps {
  items: {
    label: string;
    url: string;
    children?: MenuProps["items"];
  }[];
  depth?: number;
}

export default function Menu({ items, depth = 1 }: MenuProps) {
  return (
    <>
      <ul className="menu bg-green-50 w-fit h-screen py-2">
        {depth === 1 && (
          <h1 className="text-blue-950 text-xl pl-2 pb-4">Entreprise</h1>
        )}
        {items.map((item) => (
          <React.Fragment key={item.url}>
            <a
              href={item.url}
              key={item.url}
              className={`menu-item group pr-12 block`}
            >
              <li
                className="list-item text-blue-500 group-hover:bg-green-200 block w-fit pr-4 rounded-r-md py-1"
                style={{
                  paddingLeft: `${depth * 1}rem`,
                }}
              >
                {item.label}
              </li>
            </a>
            {item.children && <Menu items={item.children} depth={depth + 1} />}
          </React.Fragment>
        ))}
      </ul>
    </>
  );
}
