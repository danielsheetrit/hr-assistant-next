import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";

import {
  DialogsContainer,
  DialogsLayout,
  DialogsFallback,
  DialogsActions,
} from "@/styled/dialogs.styled";
import Dialog from "./dialog";

export default function Dialogs({
  dialogs,
  dialogsToRemove,
  handleDialogs,
  handleBulkSelectToggle,
  commitDelete,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <DialogsLayout>
      <section>
        <Button label="Dialogs" onClick={() => setVisible(true)} />
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <h2>Dialogs</h2>
          <p>Last dialogs by date.</p>

          <DialogsActions>
            <span onClick={() => handleBulkSelectToggle()}>
              {dialogs.length === dialogsToRemove.length
                ? "Unselect All"
                : "Select All"}
            </span>

            <Divider layout="vertical" />

            <Button
              disabled={dialogsToRemove.length === 0}
              label="Delete"
              icon="pi pi-trash"
              onClick={() => commitDelete()}
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
        </Sidebar>
      </section>

      <div></div>
    </DialogsLayout>
  );
}
