import styled from "styled-components";

export const ChatContainer = styled.section`
  width: 100%;
  height: 100%;
  border-left: 1px solid #abaaaa75;
  border-right: 1px solid #abaaaa75;

  display: flex;
  flex-direction: column;

  @media (min-width: 1280px) {
    flex-direction: row;
  }
`;
