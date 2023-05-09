import styled from "styled-components";

export const DialogContainer = styled.article`
  display: flex;
  justify-content: space-between;
  width: 275px;
  padding: 0.6rem 1.2rem;
  background-color: ${({ isActive }) => (isActive ? "#cfcfcf75" : "#333")};
  color: ${({ isActive }) => (isActive ? "#333" : "whitesmoke")};
  border-radius: 99px;
  cursor: pointer;

  transition: background-color 0.3s;

  &:hover {
    background-color: #cfcfcf75;
    color: #333;
  }

  > div:first-child {
    margin-right: 8px;

    > div {
      display: flex;
      align-items: center;
      margin-top: 0.2rem;

      span {
        display: block;
        width: 13px;
        height: 13px;
        border-radius: 99px;
        margin-right: 4px;
        background-color: ${({ dotBgc }) => dotBgc};
      }

      p {
        font-size: 12.5px;
        font-family: "Roboto", sans-serif;
      }
    }
  }
`;
