import styled from "styled-components";
import { getContrastColor } from "@/utils";

export const DialogContainer = styled.article`
  display: flex;
  justify-content: space-between;
  padding: 0.6rem 1.5rem;
  background-color: ${({ bgc }) => bgc || "#333"};
  color: ${({ bgc }) => getContrastColor(bgc)};
  border-radius: 99px;
  cursor: pointer;

  transition: background-color 0.3s;

  &:hover {
    background-color: #cfcfcf75;
    color: #333;
  }

  & .active {
    background-color: #cfcfcf75;
  }

  > div:first-child {
    p {
      font-size: 14px;
      margin-top: 0.2rem;
      font-family: "Roboto", sans-serif;
    }
  }
`;
