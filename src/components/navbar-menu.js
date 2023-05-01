import { MenuContainer, MenuMain } from "@/styled/navbar-menu.styled";
import { Button } from "primereact/button";
import { useState } from "react";

export default function BasicDemo() {
  const [visable, setViable] = useState(false);

  let items = [
    { label: "Chat", icon: "pi pi-fw pi-plus" },
    { label: "About", icon: "pi pi-fw pi-trash" },
    { separator: true },
    { label: "Logout", icon: "pi pi-fw pi-trash" },
  ];

  return (
    <MenuContainer>
      <Button onClick={() => setViable(!visable)} icon="pi pi-bars" />
      <MenuMain visable={visable} model={items} />
    </MenuContainer>
  );
}
