import styled from "styled-components";

export const DialogsLayout = styled.div`
  position: relative;
  max-width: 100%;

  > section {
    border-bottom: 1px solid #abaaaa75;
    display: flex;
    justify-content: space-between;
    padding: 0 .5rem;

    .p-button {
      margin: 1rem 0;
      font-size: 14px;
    }
  }

  > div {
    display: none;
    padding: 1rem;
    height: 100%;
    overflow: auto;
    border-right: 1px solid #abaaaa75;
  }

  @media (min-width: 1280px) {
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

  @media (min-width: 1280px) {
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
