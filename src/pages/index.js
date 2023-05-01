import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

import { useAuthContext } from "@/hooks/useAuthContext";
import { ToastStyled } from "@/styled/toast.styled";

import CustomHead from "@/components/head";
import Navbar from "@/components/navbar";
import Chat from "@/components/chat";
import { DividerStyled } from "@/styled/divider.styled";

export default function Home() {
  const toastRef = useRef(null);
  const { isAuthenticated, isInitialized } = useAuthContext();
  const router = useRouter();

  const isSuccess = router?.query?.success;
  const showToast = (msg, severity = "error", life = 3000) => {
    toastRef.current.show({
      severity: severity,
      summary: "Failed to login",
      detail: msg,
      life: life,
    });
  };

  useEffect(() => {
    if (!isAuthenticated && isInitialized) {
      router.push("/login");
    }
  }, [isAuthenticated, isInitialized, router]);

  useEffect(() => {
    if (isSuccess && toastRef && toastRef.current) {
      showToast("Logged In successfully!", "success", 3000);
    }
  }, [isSuccess, toastRef]);

  return (
    <>
      <CustomHead title="Home | HR Assistant" />
      <ToastStyled ref={toastRef} />
      <Navbar />

      <Chat />

      <DividerStyled />
      <main style={{ height: '50vh' }}>lala</main>
    </>
  );
}
