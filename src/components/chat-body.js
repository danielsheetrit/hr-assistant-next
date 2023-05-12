import { useRef, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";

import {
  ChatBodyActions,
  ChatBodyContainer,
  ChatBodyChip,
  ChatInfo,
  ChatMessages,
  TextArea,
} from "@/styled/chat-body.styled";

import Loader from "./loader";
import ChatAnswerLengthes from "./chat-answer-lengthes";
import Message from "./message";

export default function ChatBody({
  currentDialog,
  isFetching,
  initializeNewDialog,
  createNewDialog,
  createLoading,
  updateLoading,
  updateNewMessage,
  finishMutateSuccess,
}) {
  const [text, setText] = useState("");
  const [answerLength, setAnswerLength] = useState(100);

  const textareaRef = useRef(null);
  const endOfChatRef = useRef(null);
  const actionsRef = useRef(null);

  const handleMutation = () => {
    if (!currentDialog._id) {
      createNewDialog(text, answerLength);
    } else {
      updateNewMessage(text, answerLength);
    }

    setText("");
  };

  useEffect(() => {
    if (finishMutateSuccess && endOfChatRef?.current && actionsRef?.current) {
      endOfChatRef.current.scrollIntoView(false);
      actionsRef.current.scrollIntoView(false);
    }
  }, [finishMutateSuccess, actionsRef, endOfChatRef]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.addEventListener("keyup", (ev) => {
        textareaRef.current.style.height = "55px";
        const scHeight = ev.target.scrollHeight;
        textareaRef.current.style.height = `${scHeight < 55 ? 55 : scHeight}px`;
      });
    }
  }, [textareaRef]);

  return (
    <ChatBodyContainer>
      {isFetching && (
        <Loader
          styles={{
            width: "50px",
            height: "50px",
            position: "absolute",
            top: "35%",
            left: "45%",
          }}
        />
      )}

      <ChatInfo>
        {currentDialog?.title && <ChatBodyChip label={currentDialog?.title} />}
        {currentDialog?.created_at && (
          <ChatBodyChip
            label={`Created: ${new Date(
              currentDialog?.created_at?.$date
            ).toLocaleDateString()}`}
          />
        )}
        <ChatBodyChip label={`${text.length}/4000`} />
        <ChatAnswerLengthes
          answerLength={answerLength}
          setAnswerLength={setAnswerLength}
        />
        <Button
          icon="pi pi-fw pi-plus"
          label="New Dialog"
          onClick={() => initializeNewDialog()}
        />
      </ChatInfo>

      <Divider style={{ margin: "0.5rem 0" }} />

      <ChatMessages>
        {currentDialog?.chat?.length > 0 &&
          currentDialog.chat.map((message) => (
            <Message key={message.content} message={message} />
          ))}
        <div ref={endOfChatRef} />
      </ChatMessages>

      <ChatBodyActions ref={actionsRef}>
        <TextArea
          onChange={(ev) => setText(ev.target.value)}
          onKeyDown={(ev) => {
            if (ev.key === "Enter" && ev.shiftKey) {
              // dont do nothing
            } else if (ev.key === "Enter") {
              ev.preventDefault();
              handleMutation();
            }
          }}
          value={text}
          rows={1}
          ref={textareaRef}
          required
          maxLength={4000}
        />
        <Button
          onClick={() => handleMutation()}
          icon="pi pi-send"
          disabled={!text.trim()}
          loading={createLoading || updateLoading}
          rounded
        />
      </ChatBodyActions>
    </ChatBodyContainer>
  );
}
