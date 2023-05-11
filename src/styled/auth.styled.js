import styled from "styled-components";
import { CARD_BG } from "./constants.styled";

export const AuthContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  > div {
    max-width: 475px;
    width: 100%;
    background-color: ${CARD_BG};
    border-radius: 20px;
    border: 1px solid #333;
    padding: 0.5rem 0.5rem;
    text-align: center;
  }

  .image-container {
    margin: 0 auto;
    width: 100px;
    height: 100px;
    object-fit: contain;
    margin-top: 1rem;
  }

  h1 {
    font-size: 42px;
    margin-bottom: 3rem;
  }

  input {
    width: 100%;
    max-width: 475px;
    border-radius: 99px;
    margin-top: 1rem;
    font-family: "Roboto", sans-serif;
  }

  .p-password {
    width: 100%;
    max-width: 500px;
  }

  button {
    width: 100%;
    margin-top: 1.5rem;
  }

  p {
    margin-top: 2rem;
  }

  a {
    text-decoration: underline;
  }
`;

export const AuthTheme = styled.div`
  width: 100%;
  height: 100vh;
`;
