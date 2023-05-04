import { Checkbox } from "primereact/checkbox";
import { DialogContainer } from "@/styled/dialog.styled";
import { formatDate } from "@/utils";

export default function Dialog({ dialog, dialogsToRemove, handleDialogs }) {
  return (
    <DialogContainer bgc={dialog.chat_color}>
      <div>
        <h5>{dialog.title}</h5>
        <p>Last Activity: {formatDate(dialog.last_msg)}</p>
      </div>
      <div>
        <Checkbox
          id={dialog._id}
          onChange={(e) => handleDialogs(e.target.id)}
          checked={dialogsToRemove.includes(dialog._id)}
        />
      </div>
    </DialogContainer>
  );
}
