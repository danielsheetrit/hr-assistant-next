import { useState, useMemo } from "react";

import LayoutContainer from "@/styled/layout-container.styled";
import { ChatContainer } from "@/styled/chat.styled";

import {
  useDeleteDialogsMutation,
  useDialogsQuery,
} from "@/redux/slices/api-service";

import Dialogs from "./dialogs";

export default function Chat() {
  // const [selectedDialog, setSelectedDialog] = useState(null);
  const [dialogsToRemove, setDialogsToRemove] = useState([]);

  const { data } = useDialogsQuery();
  const [deleteDialogs, { isLoading }] = useDeleteDialogsMutation();

  const dialogsMemoized = useMemo(() => data?.dialogs, [data]);

  const commitDelete = async () => {
    if (dialogsToRemove.length > 0) {
      deleteDialogs({ dialogs_ids: dialogsToRemove });
      setDialogsToRemove([]);
    }
  };

  const handleBulkSelectToggle = () => {
    if (!dialogsMemoized.length === 0) {
      return;
    }

    const allDialogsIds = dialogsMemoized.map((dialog) => dialog._id);
    const isBulkSelected = allDialogsIds.length === dialogsToRemove.length;

    setDialogsToRemove(isBulkSelected ? [] : allDialogsIds);
  };

  const handleDialogs = (id) => {
    const dialogsCopy = [...dialogsToRemove];
    const index = dialogsCopy.indexOf(id);

    if (index !== -1) {
      dialogsCopy.splice(index, 1);
    } else {
      dialogsCopy.push(id);
    }

    setDialogsToRemove(dialogsCopy);
  };

  return (
    <LayoutContainer>
      <ChatContainer>
        <div>
          <Dialogs
            loadingDelete={isLoading}
            commitDelete={commitDelete}
            handleBulkSelectToggle={handleBulkSelectToggle}
            dialogsToRemove={dialogsToRemove}
            handleDialogs={handleDialogs}
            dialogs={dialogsMemoized || []}
          />
        </div>
      </ChatContainer>
    </LayoutContainer>
  );
}
