import Menu, { MenuProps } from "./components/menu";

function App() {
  const items: MenuProps["items"] = [
    {
      label: "Home",
      url: "/",
    },
    {
      label: "About",
      url: "/about",
    },
    {
      label: "Services",
      url: "/services",
      children: [
        {
          label: "For entrepreneurs",
          url: "/for-entrepreneurs",
        },
        {
          label: "For students",
          url: "/for-students",
          children: [
            {
              label: "For high school students",
              url: "/for-high-school-students",
            },
            {
              label: "For university students",
              url: "/for-university-students",
            },
            {
              label: "For coding bootcamp students",
              url: "/for-coding-bootcamp-students",
            },
          ],
        },
        {
          label: "For hobbyists",
          url: "/for-hobbyists",
        },
      ],
    },
    {
      label: "Contact",
      url: "/contact",
    },
  ];
  return (
    <>
      <Menu items={items} />
    </>
  );
}

export default App;
