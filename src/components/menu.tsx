import React from "react";

export interface MenuProps {
  items: {
    label: string;
    url: string;
    children?: MenuProps["items"];
  }[];
  depth?: string;
}

export default function MenuRecursive({ items, depth = '' }: MenuProps) {
  const render = (
    <>
      <ul className="menu  py-2">
        {depth === '' && (
          <h1 className="text-blue-950 text-xl pl-2 pb-4">Entreprise</h1>
        )}
        {items.map((item) => (
          <React.Fragment key={item.url}>
            <a
              href={`${depth}${item.url}`}
              key={`${depth}${item.url}`}
              className={`menu-item group pr-12 block`}
            >
              <li
                className="list-item text-blue-500 group-hover:bg-green-200 block w-fit pr-4 rounded-r-md py-1"
                style={{
                  paddingLeft: `${depth.split('/').length}rem`,
                }}
              >
                {item.label}
              </li>
            </a>
            {item.children && (
              <MenuRecursive items={item.children} depth={`${depth}${item.url}`} />
            )}
          </React.Fragment>
        ))}
      </ul>
    </>
  );
  return depth === '' ? (
    <nav className="h-screen bg-green-50 w-fit">{render}</nav>
  ) : (
    render
  );
}
