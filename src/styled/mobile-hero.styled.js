import styled from "styled-components";

export const MobileHeroContainer = styled.div`
  border-left: 1px solid #abaaaa75;
  border-right: 1px solid #abaaaa75;

  width: 100%;
  height: 45vh;

  i {
    margin-top: 4rem;
    font-size: 22px;
  }

  @media (min-width: 740px) {
    display: none;
  }
`;
