import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "@/hooks/useAuthContext";

import Loader from "@/components/loader";

const withAuth = (WrappedComponent) => {
  const RequiresAuthentication = (props) => {
    const router = useRouter();

    const { isAuthenticated, isInitialized } = useAuthContext();

    useEffect(() => {
      if (isInitialized && !isAuthenticated) {
        router.push("/login");
      }
    }, [isInitialized, isAuthenticated, router]);

    // if user data is still loading or user is authenticated,
    // render the wrapped component
    if (!isInitialized || isAuthenticated) {
      return <WrappedComponent {...props} />;
    }

    // otherwise, redirect to login
    return <Loader styles={{ width: "100%", height: "100vh" }} />;
  };

  if (WrappedComponent.getInitialProps) {
    RequiresAuthentication.getInitialProps = WrappedComponent.getInitialProps;
  }

  return RequiresAuthentication;
};

export default withAuth;
