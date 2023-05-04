import { useEffect, useState } from "react";

import LayoutContainer from "@/styled/layout-container.styled";
import { ChatContainer } from "@/styled/chat.styled";

import { useAuthContext } from "@/hooks/useAuthContext";
import useFetch from "@/hooks/useFetch";
import Dialogs from "./dialogs";

export default function Chat() {
  const [dialogs, setDialogs] = useState(null);
  const [dialogsToRemove, setDialogsToRemove] = useState([]);

  const { authHeader } = useAuthContext();

  const { loading, refetch } = useFetch({
    endpoint: "/dialogs",
    authHeader,
    onSuccess: (data) => {
      if (data?.dialogs.length > 0) {
        setDialogs(data?.dialogs);
      }
    },
  });

  const { loading: loadingDelete, refetch: refetchDelete } = useFetch({
    endpoint: "/dialogs-delete",
    method: "DELETE",
    authHeader,
    payload: { dialogs_ids: dialogsToRemove },
    onSuccess: () => {
      refetch();
    },
  });

  const commitDelete = () => {
    if (dialogsToRemove.length > 0) {
      setDialogsToRemove([])
      refetchDelete();
    }
  };

  const handleBulkSelectToggle = () => {
    const allDialogsIds = dialogs.map((dialog) => dialog._id);
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

  useEffect(() => {
    if (authHeader) {
      refetch();
    }
  }, [authHeader]);

  return (
    <LayoutContainer>
      <ChatContainer>
        <div>
          <Dialogs
            commitDelete={commitDelete}
            handleBulkSelectToggle={handleBulkSelectToggle}
            dialogsToRemove={dialogsToRemove}
            handleDialogs={handleDialogs}
            loading={loading}
            dialogs={dialogs || []}
          />
        </div>
      </ChatContainer>
    </LayoutContainer>
  );
}
