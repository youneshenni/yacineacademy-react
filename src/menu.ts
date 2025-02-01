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
