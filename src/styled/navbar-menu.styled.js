import styled from "styled-components";
import { Menu } from "primereact/menu";

export const MenuContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: end;

  > button {
    margin: 0 auto;
    width: 50px !important;
    height: 50px;
    border-radius: 999px !important;
  }
`;

export const MenuMain = styled(Menu)`
  display: ${(props) => (props.visable ? "block" : "none")};
  position: absolute;
  top: 65px;
  right: 25px;
`;
