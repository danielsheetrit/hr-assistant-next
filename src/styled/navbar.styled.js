import styled from "styled-components";

export const NavbarTheme = styled.div`
  width: 100%;
  height: 140px;
  border-bottom: 1px solid #abaaaa75;
`;

export const NavbarMain = styled.nav`
  position: relative;
  border-left: 1px solid #abaaaa75;
  border-right: 1px solid #abaaaa75;
  width: 100%;
  height: 140px;

  > div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  > div > div:first-child {
    flex: 1;
    width: 75px;
    height: 75px;
  }

  > div > div:nth-child(2) {
    flex: 3;
    display: none;

    @media (min-width: 740px) {
      display: block;
    }
  }

  > div > div:nth-child(3) {
    flex: 1;
  }
`;
