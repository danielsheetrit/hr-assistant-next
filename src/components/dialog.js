import { useRef } from "react";
import { Checkbox } from "primereact/checkbox";
import { DialogContainer } from "@/styled/dialog.styled";
import { formatDate } from "@/utils";

export default function Dialog({
  dialog,
  dialogsToRemove,
  handleDialogs,
  setSelectedDialog,
  selectedDialog,
  setVisible,
}) {
  const checkboxRef = useRef(null);
  const isSelected = selectedDialog === dialog._id;

  const handleSelect = (ev, id) => {
    if (ev.target.className === "p-checkbox-box") {
      return;
    }

    if (checkboxRef.current.props.checked) {
      return;
    }

    if (window.innerWidth < 1280) {
      setVisible(false);
    }

    setSelectedDialog(id);
  };

  return (
    <DialogContainer
      isActive={isSelected}
      dotBgc={dialog.chat_color}
      onClick={(ev) => handleSelect(ev, dialog._id)}
    >
      <div>
        <h5>{dialog.title}</h5>
        <div>
          <p>Last Message: {formatDate(dialog.last_msg)}</p>
        </div>
      </div>
      <div>
        <Checkbox
          ref={checkboxRef}
          id={dialog._id}
          onChange={(e) => handleDialogs(e.target.id)}
          checked={dialogsToRemove.includes(dialog._id)}
          disabled={isSelected}
        />
      </div>
    </DialogContainer>
  );
}
