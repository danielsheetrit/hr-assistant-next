import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuthContext } from "@/hooks/useAuthContext";
import { DividerStyled } from "@/styled/divider.styled";

import CustomHead from "@/components/head";
import Navbar from "@/components/navbar";
import MobileHero from "@/components/mobile-hero";
import Chat from "@/components/chat";

export default function Home() {
  const { isAuthenticated, isInitialized, user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && isInitialized) {
      router.push("/login");
    }
  }, [isAuthenticated, isInitialized, router]);

  return (
    <>
      <CustomHead title="Home | HR Assistant" />
      <Navbar />

      <MobileHero name={user?.name || ""} />

      <DividerStyled isDisappearing />

      <Chat />
    </>
  );
}
