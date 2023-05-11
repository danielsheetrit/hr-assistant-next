import styled from "styled-components";

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) =>
    props.role === "user" ? "flex-end" : "flex-start"};
  margin: 10px;
`;

const MessageBubble = styled.div`
  background-color: ${(props) => (props.role === "user" ? "#0084ff" : "whitesmoke")};
  color: ${(props) => (props.role === "user" ? "#fff" : "#000")};
  border-radius: 20px;
  padding: 10px;
  font-size: 16px;
  line-height: 1.4;
  max-width: 80%;
`;

const MessageTimestamp = styled.span`
  font-size: 12px;
  margin-top: 5px;
  color: #999;
`;

export { MessageBubble, MessageContainer, MessageTimestamp };
