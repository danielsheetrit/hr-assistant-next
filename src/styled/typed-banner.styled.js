import styled from "styled-components";

export const TypedContaienr = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  @media (min-width: 740px) {
    align-items: start;
  }

  span {
    font-size: 20px;
  }
`;
