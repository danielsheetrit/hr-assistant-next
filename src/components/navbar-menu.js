import { MenuContainer, MenuMain } from "@/styled/navbar-menu.styled";
import { Button } from "primereact/button";
import { useState } from "react";

export default function NavbarMenu({ logoutFunc }) {
  const [status, setStatus] = useState("close");

  const handleMenu = () => {
    if (status === "close") {
      setStatus("open");
      return;
    }

    setStatus("close");
  };

  const items = [
    { label: "Chat", icon: "pi pi-fw pi-plus" },
    { label: "Custome Prompts", icon: "pi pi-book" },
    { label: "About", icon: "pi pi-info-circle" },
    { separator: true },
    { label: "Logout", icon: "pi pi-sign-in", command: () => logoutFunc() },
  ];

  return (
    <MenuContainer>
      <Button onClick={() => handleMenu()} icon="pi pi-bars" />
      <MenuMain status={status} model={items} />
    </MenuContainer>
  );
}
