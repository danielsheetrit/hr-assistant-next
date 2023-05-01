import Image from "next/image";
import { NavbarTheme, NavbarMain } from "@/styled/navbar.styled";
import LayoutContainer from "@/styled/layout-container.styled";
import Logo from "@/assets/imgs/logo.svg";
import NavbarMenu from "./navbar-menu";
import { useAuthContext } from "@/hooks/useAuthContext";
import TypedBanner from "./typed-banner";

export default function Navbar() {
  const { user, logout } = useAuthContext();

  return (
    <NavbarTheme>
      <LayoutContainer>
        <NavbarMain>
          <div>
            <div>
              <Image src={Logo} alt="logo" />
            </div>
            <div>
              <TypedBanner name={user?.name || "John Doe"} />
            </div>
            <NavbarMenu logoutFunc={logout} />
          </div>
        </NavbarMain>
      </LayoutContainer>
    </NavbarTheme>
  );
}
