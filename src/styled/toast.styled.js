import styled from "styled-components";
import { Toast } from "primereact/toast";

export const ToastStyled = styled(Toast)`
  position: absolute;
  top: 50;
  left: 50%;
  transform: translateX(-50%);
  font-family: "Roboto", sans-serif;

  .p-toast-message {
    background-color: white !important;
    border-radius: 18px !important;
    border: none !important;
  }

  .p-toast-message-content {
    padding: 12px !important;
  }

  .p-toast-summary {
    display: none;
  }

  .p-toast-detail {
    font-size: 14px;
  }
`;
