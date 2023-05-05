import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { ToastStyled } from "@/styled/toast.styled";

import CustomHead from "@/components/head";
import Auth from "@/components/auth";
import { useAuthContext } from "@/hooks/useAuthContext";

import { useRegisterMutation } from "@/redux/slices/api-service";

function Register() {
  const toastRef = useRef(null);

  const router = useRouter();
  const { isAuthenticated } = useAuthContext();

  const [registerClient, { isLoading, isSuccess, isError, error }] =
    useRegisterMutation();

  const showToast = (msg) => {
    toastRef.current.show({
      severity: "error",
      summary: "Failed to register",
      detail: msg,
      life: 3000,
    });
  };

  const handleSubmit = async (username, password, name) => {
    const usernameTrimmed = username.trim();
    const passwordTrimmed = password.trim();
    const nameTrimmed = name.trim();

    if (!usernameTrimmed || !passwordTrimmed || !nameTrimmed) {
      showToast("Please fill all the fields");
      return;
    }

    if (passwordTrimmed.length < 6) {
      showToast("Password has to be at least 6 characters");
      return;
    }

    registerClient({
      name: nameTrimmed,
      username: usernameTrimmed,
      password: passwordTrimmed,
    });
  };

  const resultActions = useCallback(() => {
    if (isSuccess) {
      router.push({ pathname: "/login", query: { success: true } });
    }

    if (isError) {
      showToast(error.error, "error", 3000);
    }
  }, [isSuccess, isError, router, error]);

  useEffect(() => {
    resultActions();
  }, [isSuccess, isError, error, resultActions]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <>
      <CustomHead title="Register | HR Assistant" />
      <ToastStyled ref={toastRef} />
      <Auth handleSubmit={handleSubmit} loading={isLoading} />;
    </>
  );
}

export default Register;
