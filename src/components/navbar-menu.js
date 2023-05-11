import { Button } from "primereact/button";

export default function NavbarMenu({ logoutFunc }) {
  return (
    <Button
      label="Logout"
      style={{ marginRight: "2rem" }}
      onClick={() => logoutFunc()}
      icon="pi pi-sign-in"
    />
  );
}
