import { useState, useRef } from "react";
import { ToastStyled } from "@/styled/toast.styled";
import Auth from "@/components/auth";

const HOST = process.env.HOST;

function Register() {
  const [loading, setLoading] = useState(false);
  const toastRef = useRef(null);

  const showToast = (msg) => {
    toastRef.current.show({
      severity: "error",
      summary: "Failed to register",
      detail: msg,
      life: 2000,
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
      await fetch(`${HOST}/register`, options);
    } catch (err) {
      console.log(err);
      showToast("Something went wrong");
    }
  };

  return (
    <>
      <ToastStyled ref={toastRef} />
      <Auth handleSubmit={handleSubmit} loading={loading} />;
    </>
  );
}

export default Register;
