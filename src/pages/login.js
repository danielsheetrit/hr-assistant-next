import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastStyled } from "@/styled/toast.styled";
import Auth from "@/components/auth";

import { useAuthContext } from "@/hooks/useAuthContext";
import CustomHead from "@/components/head";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const toastRef = useRef(null);

  const router = useRouter();
  const isSuccess = router?.query?.success;

  const { login, isAuthenticated } = useAuthContext();

  const showToast = (msg, severity = "error", life = 3000) => {
    toastRef.current.show({
      severity: severity,
      summary: "Failed to login",
      detail: msg,
      life: life,
    });
  };

  const handleSubmit = async (username, password, _name) => {
    const usernameTrimmed = username.trim();
    const passwordTrimmed = password.trim();

    if (!usernameTrimmed || !passwordTrimmed) {
      showToast("Please fill all the fields");
      return;
    }

    if (passwordTrimmed.length < 6) {
      showToast("Password has to be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await login(usernameTrimmed, passwordTrimmed);

      if (!res.ok) {
        showToast(data.msg);
      } else {
        router.push({ pathname: "/", query: { success: true } });
      }

      setLoading(false);
    } catch (err) {
      showToast("Something went wrong");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (isSuccess === "true" && toastRef && toastRef.current) {
      showToast("Registered successfully, Please login now", "success", 5000);
    }
  }, [isSuccess, toastRef]);

  return (
    <>
      <CustomHead title="Login | HR Assistant" />
      <ToastStyled ref={toastRef} />
      <Auth handleSubmit={handleSubmit} loading={loading} />
    </>
  );
}
