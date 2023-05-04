import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { ToastStyled } from "@/styled/toast.styled";

import CustomHead from "@/components/head";
import Auth from "@/components/auth";
import { useAuthContext } from "@/hooks/useAuthContext";
import useFetch from "@/hooks/useFetch";

function Register() {
  const toastRef = useRef(null);

  const router = useRouter();
  const { isAuthenticated } = useAuthContext();

  const { loading, refetch } = useFetch({
    endpoint: "/register",
    method: "POST",
    onSuccess: () => {
      router.push({ pathname: "/login", query: { success: true } });
    },
    onFailure: (errorMsg) => showToast(errorMsg),
  });

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

    refetch({
      name: nameTrimmed,
      username: usernameTrimmed,
      password: passwordTrimmed,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <>
      <CustomHead title="Register | HR Assistant" />
      <ToastStyled ref={toastRef} />
      <Auth handleSubmit={handleSubmit} loading={loading} />;
    </>
  );
}

export default Register;
