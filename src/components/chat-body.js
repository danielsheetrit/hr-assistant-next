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

export default function ChatBody({ currentDialog, isFetching }) {
  const [text, setText] = useState("");
  const [answerLength, setAnswerLength] = useState(100);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.addEventListener("keyup", (ev) => {
        textareaRef.current.style.height = "55px";
        const scHeight = ev.target.scrollHeight;
        textareaRef.current.style.height = `${scHeight < 55 ? 55 : scHeight}px`;

        if (ev.key === "Enter" && window.innerWidth > 1000) {
          // make submit
        }
      });
    }
  }, [textareaRef]);
  console.log(currentDialog);
  return (
    <ChatBodyContainer>
      {isFetching && <Loader />}

      {currentDialog && (
        <>
          <ChatInfo>
            <ChatBodyChip label={currentDialog?.title} />
            <ChatBodyChip label={currentDialog?.chat_color} />
            <ChatBodyChip
              label={`Created: ${new Date(
                currentDialog?.created_at?.$date
              ).toLocaleDateString()}`}
            />
            <ChatAnswerLengthes
              answerLength={answerLength}
              setAnswerLength={setAnswerLength}
            />
          </ChatInfo>

          <Divider style={{ margin: "0.5rem 0" }} />
        </>
      )}

      <ChatMessages>
        {currentDialog &&
          currentDialog.chat.map((message) => (
            <Message key={message.content} message={message} />
          ))}
      </ChatMessages>

      <ChatBodyActions>
        <TextArea
          onChange={(ev) => setText(ev.target.value)}
          value={text}
          rows={1}
          ref={textareaRef}
          required
        />
        <Button icon="pi pi-send" />
      </ChatBodyActions>
    </ChatBodyContainer>
  );
}
