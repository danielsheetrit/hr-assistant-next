import { useState, useMemo, useEffect } from "react";

import LayoutContainer from "@/styled/layout-container.styled";
import { ChatContainer } from "@/styled/chat.styled";

import {
  useDeleteDialogsMutation,
  useDialogsQuery,
  useGetDialogQuery,
} from "@/redux/slices/api-service";

import Dialogs from "./dialogs";
import ChatBody from "./chat-body";

export default function Chat() {
  const [currentDialog, setCurrentDialog] = useState(null);
  const [selectedDialog, setSelectedDialog] = useState(null);
  const [dialogsToRemove, setDialogsToRemove] = useState([]);

  const { data } = useDialogsQuery();
  const { data: dialogData, isFetching: isFetchingSingleDialog } =
    useGetDialogQuery(
      { dialog_id: selectedDialog },
      {
        skip: !selectedDialog,
      }
    );

  const [deleteDialogs, { isLoading }] = useDeleteDialogsMutation();

  const dialogsMemoized = useMemo(() => data?.dialogs, [data]);
  const singleDialog = useMemo(
    () => dialogData?.dialog && JSON.parse(dialogData.dialog),
    [dialogData]
  );

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

    const allDialogsIds = dialogsMemoized.map(
      (dialog) => selectedDialog !== dialog._id && dialog._id
    );

    const isBulkSelected = allDialogsIds.length === dialogsToRemove.length;

    setDialogsToRemove(isBulkSelected ? [] : allDialogsIds);
  };

  const handleDialogs = (id) => {
    if (id === selectedDialog) {
      return;
    }

    const dialogsCopy = [...dialogsToRemove];
    const index = dialogsCopy.indexOf(id);

    if (index !== -1) {
      dialogsCopy.splice(index, 1);
    } else {
      dialogsCopy.push(id);
    }

    setDialogsToRemove(dialogsCopy);
  };

  useEffect(() => {
    if (singleDialog) {
      setCurrentDialog(singleDialog);
    }
  }, [singleDialog]);

  return (
    <LayoutContainer>
      <ChatContainer>
        <Dialogs
          selectedDialog={selectedDialog}
          setSelectedDialog={setSelectedDialog}
          loadingDelete={isLoading}
          commitDelete={commitDelete}
          handleBulkSelectToggle={handleBulkSelectToggle}
          dialogsToRemove={dialogsToRemove}
          handleDialogs={handleDialogs}
          dialogs={dialogsMemoized || []}
        />

        <ChatBody
          isFetching={isFetchingSingleDialog}
          currentDialog={currentDialog}
        />
      </ChatContainer>
    </LayoutContainer>
  );
}
