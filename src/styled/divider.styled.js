import styled from "styled-components";

export const DividerStyled = styled.div`
  display: block;
  border-bottom: 1px solid #abaaaa75;
  height: 1px;
  width: 100%;

  @media (min-width: 740px) {
    display: ${({ isDisappearing }) => isDisappearing && "none"};
  }
`;
