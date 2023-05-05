import { Button } from "primereact/button";
import { Divider } from "primereact/divider";

import {
  DialogsActions,
  DialogsContainer,
  DialogsFallback,
} from "@/styled/dialogs.styled";
import Dialog from "./dialog";

export default function DialogsBody({
  dialogs,
  dialogsToRemove,
  handleDialogs,
  handleBulkSelectToggle,
  loadingDelete,
  commitDelete,
}) {
  return (
    <>
      <DialogsActions>
        <button
          className="select-btn"
          type="button"
          onClick={() => handleBulkSelectToggle()}
        >
          {dialogs.length === dialogsToRemove.length
            ? "Unselect All"
            : "Select All"}
        </button>

        <Divider layout="vertical" />

        <Button
          disabled={dialogsToRemove.length === 0}
          label="Delete"
          icon="pi pi-trash"
          onClick={() => commitDelete()}
          loading={loadingDelete}
        />
      </DialogsActions>

      {dialogs.length > 0 ? (
        <DialogsContainer>
          {dialogs.map((dialog) => (
            <Dialog
              key={dialog._id}
              dialog={dialog}
              dialogsToRemove={dialogsToRemove}
              handleDialogs={handleDialogs}
            />
          ))}
        </DialogsContainer>
      ) : (
        <DialogsFallback>
          No dialogs are available at the moment, or no dialogs have been
          created yet.
        </DialogsFallback>
      )}
    </>
  );
}
