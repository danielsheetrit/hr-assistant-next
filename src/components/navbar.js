import Image from "next/image";
import { Button } from "primereact/button";
import ReactTyped from "react-typed";
import { NavbarTheme, NavbarMain } from "@/styled/navbar.styled";
import LayoutContainer from "@/styled/layout-container.styled";
import Logo from "@/assets/imgs/logo.svg";
import TemplateDemo from "./navbar-menu";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function Navbar() {
  const context = useAuthContext();

  return (
    <NavbarTheme>
      <LayoutContainer>
        <NavbarMain>
          <div>
            <div>
              <Image src={Logo} alt="logo" />
            </div>
            <div>
              <h3>Hi {context?.user?.name}, </h3>
              <ReactTyped
                loop
                strings={[
                  "You can, Engage Canadid",
                  "You can, Refactor CVs",
                  "You can, Compose Job Descriptions",
                  "You can, Description Safe Scan",
                  "You can Do You, just better :)"
                ]}
                typeSpeed={80}
                backSpeed={50}
                backDelay={50}
                startDelay={1}
                smartBackspace
                loopCount={3}
              />
            </div>
            <TemplateDemo />
          </div>
        </NavbarMain>
      </LayoutContainer>
    </NavbarTheme>
  );
}
