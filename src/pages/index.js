import withAuth from "@/hocs/with-auth";
import { useAuthContext } from "@/hooks/useAuthContext";
import { DividerStyled } from "@/styled/divider.styled";

import CustomHead from "@/components/head";
import Navbar from "@/components/navbar";
import MobileHero from "@/components/mobile-hero";
import Chat from "@/components/chat";

function Home() {
  const { user } = useAuthContext();

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

export default withAuth(Home);
