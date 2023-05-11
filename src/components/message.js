import {
  MessageBubble,
  MessageContainer,
  MessageTimestamp,
} from "@/styled/message.styled";

export default function Message({ message }) {
  const { role, content, created_at } = message;

  const formattedTimestamp = new Date(
    created_at?.$date || Date.now()
  ).toLocaleDateString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  if (role === "system") {
    return null;
  }

  return (
    <MessageContainer role={role}>
      <MessageBubble role={role}>
        <h5>{role === "assistant" ? "HR Assistant" : "You"}</h5>
        {content}
      </MessageBubble>
      <MessageTimestamp>{formattedTimestamp}</MessageTimestamp>
    </MessageContainer>
  );
}
