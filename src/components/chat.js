import { useState, useMemo, useEffect } from "react";

import LayoutContainer from "@/styled/layout-container.styled";
import { ChatContainer } from "@/styled/chat.styled";

import {
  useCreateDialogMutation,
  useDeleteDialogsMutation,
  useDialogsQuery,
  useGetDialogQuery,
  useUpdateDialogMutation,
} from "@/redux/slices/api-service";

import Dialogs from "./dialogs";
import ChatBody from "./chat-body";

const initialDialogState = {
  chat: [{ role: "assistant", content: "How can I help you today?" }],
};

export default function Chat() {
  const [currentDialog, setCurrentDialog] = useState(initialDialogState);
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

  const [
    createDialog,
    { data: createdDialog, isLoading: createLoading, isSuccessCreate },
  ] = useCreateDialogMutation();

  const [
    updateDialog,
    { data: updatedDialog, isLoading: updateLoading, isSuccessUpdate },
  ] = useUpdateDialogMutation();

  const dialogsMemoized = useMemo(() => data?.dialogs, [data]);
  const singleDialog = useMemo(
    () => dialogData?.dialog && JSON.parse(dialogData.dialog),
    [dialogData]
  );

  const updateUserText = (text) => {
    if (!currentDialog.chat.length) return;

    const chatCopy = [...currentDialog.chat];
    chatCopy.push({ role: "user", content: text });
    setCurrentDialog({ chat: chatCopy });
  };

  const updateNewMessage = (text, answerLength) => {
    updateDialog({
      question: text,
      dialog: currentDialog,
      answer_length: answerLength,
    });

    // been called after request has sent
    updateUserText(text, answerLength);
  };

  const createNewDialog = (text, answerLength) => {
    if (currentDialog._id) return;
    if (!text.trim()) return;
    if (text.length > 4000) return;
    updateUserText(text);
    createDialog({ question: text, answer_length: answerLength });
  };

  const initializeNewDialog = () => {
    setCurrentDialog({
      chat: [{ role: "assistant", content: "How can I help you today?" }],
    });
    setSelectedDialog(null);
  };

  const commitDelete = () => {
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

  const updateDialogResponse = (resDialog) => {
    const dialog = JSON.parse(resDialog);
    setCurrentDialog(dialog);
    setSelectedDialog(dialog._id.$oid);
  };

  useEffect(() => {
    if (updatedDialog?.dialog) {
      updateDialogResponse(updatedDialog?.dialog);
    }
  }, [updatedDialog]);

  useEffect(() => {
    if (createdDialog?.dialog) {
      updateDialogResponse(createdDialog?.dialog);
    }
  }, [createdDialog]);

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
          finishMutateSuccess={isSuccessCreate || isSuccessUpdate}
          updateLoading={updateLoading}
          updateNewMessage={updateNewMessage}
          createLoading={createLoading}
          createNewDialog={createNewDialog}
          initializeNewDialog={initializeNewDialog}
          isFetching={isFetchingSingleDialog}
          currentDialog={currentDialog}
        />
      </ChatContainer>
    </LayoutContainer>
  );
}
