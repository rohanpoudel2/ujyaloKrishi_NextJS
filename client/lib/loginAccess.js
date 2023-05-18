import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';

export const loginAccess = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const { currentUser } = useContext(AuthContext);
    const [isRendering, setIsRendering] = useState(true);

    useEffect(() => {
      if (currentUser) {
        router.push('/');
      } else {
        setIsRendering(false);
      }
    }, [currentUser]);

    return isRendering ? null : <WrappedComponent {...props} />;
  };

  return Wrapper;
};
