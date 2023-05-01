import { MenuContainer, MenuMain } from "@/styled/navbar-menu.styled";
import { Button } from "primereact/button";
import { useState } from "react";

export default function NavbarMenu({ logoutFunc }) {
  const [visable, setViable] = useState(false);

  let items = [
    { label: "Chat", icon: "pi pi-fw pi-plus" },
    { label: "Dialogs", icon: "pi pi-comments" },
    { label: "Custome Prompts", icon: "pi pi-book" },
    { label: "About", icon: "pi pi-info-circle" },
    { separator: true },
    { label: "Logout", icon: "pi pi-sign-in", command: () => logoutFunc() },
  ];

  return (
    <MenuContainer>
      <Button onClick={() => setViable(!visable)} icon="pi pi-bars" />
      <MenuMain visable={visable} model={items} />
    </MenuContainer>
  );
}
