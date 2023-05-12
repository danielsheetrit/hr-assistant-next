import { useEffect } from 'react';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useRouter } from 'next/router';

const withPublic = WrappedComponent => {
  const PublicOnly = props => {
    const router = useRouter();
    const { isAuthenticated, isInitialized } = useAuthContext();

    useEffect(() => {
      if (isInitialized && isAuthenticated) {
        router.push('/'); // or wherever you want to redirect to
      }
    }, [isInitialized, isAuthenticated, router]);

    if (!isInitialized || !isAuthenticated) {
      return <WrappedComponent {...props} />;
    }

    return null;
  }

  if (WrappedComponent.getInitialProps) {
    PublicOnly.getInitialProps = WrappedComponent.getInitialProps;
  }

  return PublicOnly;
}

export default withPublic;
