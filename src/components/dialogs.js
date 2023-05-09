import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

import { DialogsLayout } from "@/styled/dialogs.styled";
import DialogsBody from "./dialogs-body";

export default function Dialogs({
  dialogs,
  dialogsToRemove,
  handleDialogs,
  handleBulkSelectToggle,
  commitDelete,
  loadingDelete,
  setSelectedDialog,
  selectedDialog,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <DialogsLayout>
      <section>
        <Button
          icon="pi pi-comments"
          label="Dialogs"
          onClick={() => setVisible(true)}
        />
        <Button
          icon="pi pi-fw pi-plus"
          label="New Dialog"
          // onClick={() => setVisible(true)}
        />

        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <h2>Dialogs</h2>
          <p>Last dialogs by date.</p>

          <DialogsBody
            setVisible={setVisible}
            selectedDialog={selectedDialog}
            dialogs={dialogs}
            dialogsToRemove={dialogsToRemove}
            handleDialogs={handleDialogs}
            handleBulkSelectToggle={handleBulkSelectToggle}
            commitDelete={commitDelete}
            loadingDelete={loadingDelete}
            setSelectedDialog={setSelectedDialog}
          />
        </Sidebar>
      </section>

      <div>
        <DialogsBody
          selectedDialog={selectedDialog}
          dialogs={dialogs}
          dialogsToRemove={dialogsToRemove}
          handleDialogs={handleDialogs}
          handleBulkSelectToggle={handleBulkSelectToggle}
          commitDelete={commitDelete}
          loadingDelete={loadingDelete}
          setSelectedDialog={setSelectedDialog}
        />
      </div>
    </DialogsLayout>
  );
}
