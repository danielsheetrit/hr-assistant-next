import styled from "styled-components";
import { Chip } from "primereact/chip";

export const ChatBodyContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  width: 100%;
  padding: 0.5rem;

  @media (min-width: 740px) {
    padding: 1rem;
    padding-top: 0.5rem;
  }
`;

export const ChatInfo = styled.div`
  display: flex;
  flex-wrap: wrap;

  > * {
    margin-right: 4px;
    margin-top: 4px;
  }

  button {
    position: relative;
    font-size: 12px;
    padding: 0 12px;
    height: 30px;
  }
`;

export const ChatBodyChip = styled(Chip)`
  span {
    font-family: "Roboto", sans-serif !important;
    font-size: 12px !important;
  }
`;

export const ChatMessages = styled.div`
  overflow: auto;
  height: 600px;
  /* max-height: 100; */

  @media (min-width: 770px) {
    max-height: 500px;
  }
`;

export const ChatBodyActions = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  > button {
    width: 55px !important;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  margin-right: 0.5rem;
  max-height: 150px !important;
  font-size: 16px;
  padding: 16px;
  border-radius: 26px;
  font-family: "Roboto", sans-serif;
  outline: none;
  resize: none;
  border-color: #4e4e4e;
  border-width: 2px;

  &:is(:focus, :valid) {
    border-color: #6366f1;
  }
`;
