import {
  MessageBubble,
  MessageContainer,
  MessageTimestamp,
} from "@/styled/message.styled";

export default function Message({ message }) {
  const { role, content, created_at } = message;

  const formattedTimestamp = new Date(created_at?.$date).toLocaleDateString();

  if (role === "system") {
    return null;
  }

  return (
    <MessageContainer role={role}>
      <MessageBubble role={role}>{content}</MessageBubble>
      <MessageTimestamp>{formattedTimestamp}</MessageTimestamp>
    </MessageContainer>
  );
}
