import { useMemo, useState } from "react";
import styled from "styled-components";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { SelectButton } from "primereact/selectbutton";

const AnswerLengthBtns = styled(SelectButton)`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  max-width: 300px;

  .p-button {
    font-size: 14px;
    padding: 10px 22px;
  }
`;

const answerLengthes = [
  { name: "Short", value: 100 },
  { name: "Medium", value: 200 },
  { name: "Long", value: 500 },
];

export default function ChatAnswerLengthes({ answerLength, setAnswerLength }) {
  const [visible, setVisible] = useState(false);

  const lengthLetter = useMemo(() => {
    const lngth = answerLengthes.find((el) => el.value === answerLength);
    return lngth.name.substring(0, 1).toUpperCase();
  }, [answerLength]);

  return (
    <>
      <Button
        onClick={() => setVisible(true)}
        icon="pi pi-chevron-down"
        label={`Answer Length: ${lengthLetter}`}
      />

      <Dialog
        header="Answer Length"
        visible={visible}
        style={{ width: "90vw", maxWidth: 500 }}
        onHide={() => setVisible(false)}
      >
        <p className="m-0">Decide what length the answer should be.</p>
        <AnswerLengthBtns
          value={answerLength}
          onChange={(e) => {
            setAnswerLength(e.value);
            setVisible(false);
          }}
          optionLabel="name"
          options={answerLengthes}
        />
      </Dialog>
    </>
  );
}
