import { useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { useAuthContext } from "@/hooks/useAuthContext";
import { ToastStyled } from "@/styled/toast.styled";

export default function Home() {
  const toastRef = useRef(null);
  const { isAuthenticated, isInitialized, user } = useAuthContext();
  const router = useRouter();
  console.log(user);
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
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastStyled ref={toastRef} />

      <main>lala</main>
    </>
  );
}
