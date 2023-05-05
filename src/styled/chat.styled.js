import styled from "styled-components";

export const ChatContainer = styled.section`
  width: 100%;
  height: 90vh;
  border-left: 1px solid #abaaaa75;
  border-right: 1px solid #abaaaa75;

  display: flex;
  flex-direction: column;

  @media (min-width: 740px) {
    flex-direction: row;
  }
`;
