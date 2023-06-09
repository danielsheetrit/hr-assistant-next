import styled from "styled-components";

export const NavbarTheme = styled.div`
  width: 100%;
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
    /* flex: 0; */
    margin-left: 2rem;
    width: 100px;
    height: 100px;
  }

  @media (min-width: 740px) {
    > div > div:first-child {
      flex: 1;
      width: 100px;
      height: 100px;
      margin-left: 0rem;
    }
  }

  > div > div:nth-child(2) {
    flex: 3;
    display: none;

    @media (min-width: 740px) {
      display: block;
    }
  }
`;
