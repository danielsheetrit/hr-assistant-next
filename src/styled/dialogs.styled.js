import styled from "styled-components";

export const DialogsLayout = styled.div`
  @media (min-width: 740px) {
    > section {
      display: none;
    }
  }
`;

export const DialogsActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;

  > span {
    width: 83px;
    cursor: pointer;
    text-decoration: underline;
  }

  button {
    font-size: 14px;
    padding: 0.5rem 1rem;
  }
`;

export const DialogsContainer = styled.div`
  margin-top: 1rem;

  article:not(:first-child) {
    margin-top: 0.5rem;
  }
`;

export const DialogsFallback = styled.h3`
  font-family: "Poppins", sans-serif;
`;
