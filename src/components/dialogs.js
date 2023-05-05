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
import DialogsBody from "./dialogs-body";

export default function Dialogs({
  dialogs,
  dialogsToRemove,
  handleDialogs,
  handleBulkSelectToggle,
  commitDelete,
  loadingDelete,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <DialogsLayout>
      <section>
        <Button label="Dialogs" onClick={() => setVisible(true)} />
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <h2>Dialogs</h2>
          <p>Last dialogs by date.</p>

          <DialogsBody
            dialogs={dialogs}
            dialogsToRemove={dialogsToRemove}
            handleDialogs={handleDialogs}
            handleBulkSelectToggle={handleBulkSelectToggle}
            commitDelete={commitDelete}
            loadingDelete={loadingDelete}
          />
        </Sidebar>
      </section>

      <div>
        <DialogsBody
          dialogs={dialogs}
          dialogsToRemove={dialogsToRemove}
          handleDialogs={handleDialogs}
          handleBulkSelectToggle={handleBulkSelectToggle}
          commitDelete={commitDelete}
          loadingDelete={loadingDelete}
        />
      </div>
    </DialogsLayout>
  );
}
