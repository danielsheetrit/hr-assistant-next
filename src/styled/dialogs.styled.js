import styled from "styled-components";

export const DialogsLayout = styled.div`
  flex: 1;
  position: relative;
  height: 100%;

  > section {
    .p-button {
      margin: 1rem;
    }
  }

  > div {
    display: none;
    padding: 1rem;
    height: 100%;
    overflow: auto;
  }

  @media (min-width: 740px) {
    > section {
      display: none;
    }
    > div {
      display: block;
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

  .select-btn {
    width: 83px;
    cursor: pointer;
    text-decoration: underline;
    border: none;
    padding: 0;
    background-color: transparent;
  }

  button {
    font-size: 14px;
    padding: 0.5rem 1rem;
  }

  @media (min-width: 740px) {
    margin-top: 0px;
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
