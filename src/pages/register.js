import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { ToastStyled } from "@/styled/toast.styled";

import CustomHead from "@/components/head";
import Auth from "@/components/auth";
import { useAuthContext } from "@/hooks/useAuthContext";

const HOST = process.env.HOST;

function Register() {
  const [loading, setLoading] = useState(false);
  const toastRef = useRef(null);

  const router = useRouter();
  const { isAuthenticated } = useAuthContext();

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

    setLoading(true);

    const options = {
      method: "POST",
      body: JSON.stringify({
        name: nameTrimmed,
        username: usernameTrimmed,
        password: passwordTrimmed,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await fetch(`${HOST}/register`, options);
      const data = await res.json();

      if (!res.ok) {
        showToast(data.msg);
      } else {
        router.push({ pathname: "/login", query: { success: true } });
      }

      setLoading(false);
    } catch (err) {
      showToast("Somthing went wrong");
    }
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
