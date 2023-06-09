import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

import withPublic from "@/hocs/with-public";
import { useAuthContext } from "@/hooks/useAuthContext";

import { ToastStyled } from "@/styled/toast.styled";
import Auth from "@/components/auth";
import CustomHead from "@/components/head";

function Login() {
  const [loading, setLoading] = useState(false);
  const toastRef = useRef(null);

  const router = useRouter();
  const isSuccess = router?.query?.success;

  const { login } = useAuthContext();

  const showToast = (msg, severity = "error", life = 3000) => {
    toastRef.current.show({
      severity,
      summary: "Failed to login",
      detail: msg,
      life,
    });
  };

  const handleSubmit = async (username, password) => {
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

      if (res.message) {
        showToast(res.message);
      } else {
        router.push({ pathname: "/" });
      }

      setLoading(false);
    } catch (err) {
      showToast("Something went wrong");
    }
  };

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

export default withPublic(Login);
