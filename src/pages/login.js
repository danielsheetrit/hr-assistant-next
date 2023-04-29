import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastStyled } from "@/styled/toast.styled";
import Auth from "@/components/auth";

const HOST = process.env.HOST;

function Register() {
  const [loading, setLoading] = useState(false);
  const toastRef = useRef(null);

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

    const options = {
      method: "POST",
      body: JSON.stringify({
        username: usernameTrimmed,
        password: passwordTrimmed,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await fetch(`${HOST}/login`, options);
      const data = await res.json();

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
    if (isSuccess === "true" && toastRef && toastRef.current) {
      showToast("Registered successfully, Please login now", "success", 5000);
    }
  }, [isSuccess, toastRef]);

  return (
    <>
      <ToastStyled ref={toastRef} />
      <Auth handleSubmit={handleSubmit} loading={loading} />;
    </>
  );
}

export default Register;
