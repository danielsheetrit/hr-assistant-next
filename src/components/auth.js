import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

import { AuthContainer, AuthTheme } from "@/styled/auth.styled";
import LayoutContainer from "@/styled/layout-container.styled";
import Logo from "@/assets/imgs/logo.svg";

function Auth({ handleSubmit, loading }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();
  const isLoginPage = router.pathname === "/login";

  return (
    <AuthTheme>
      <LayoutContainer>
        <AuthContainer>
          <div>
            <div className="image-container">
              <Image src={Logo} alt="logo" />
            </div>
            <h1>{isLoginPage ? "Login" : "Register"}</h1>
            {!isLoginPage && (
              <InputText
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <InputText
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
              toggleMask
              placeholder="Password"
              required
            />
            <div>
              <p>
                {isLoginPage
                  ? "Dont have an account yet?"
                  : "Already Have an account?"}
              </p>
              <Link href={`${isLoginPage ? "/register" : "/login"}`}>
                {isLoginPage ? "Register" : "Login"}
              </Link>
            </div>
            <Button
              onClick={() => handleSubmit(username, password, name)}
              label="Submit"
              rounded
              loading={loading}
            />
          </div>
        </AuthContainer>
      </LayoutContainer>
    </AuthTheme>
  );
}

export default Auth;
