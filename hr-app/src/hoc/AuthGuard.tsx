import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { ComponentType, JSX, useEffect, useState } from 'react';

function AuthGuard<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: ComponentType<P>,
  allowedRoles: string[]
) {
  const withAuthGuardComponent = (props: P) => {
    const { role } = useAuthStore();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        if (role && !allowedRoles.includes(role)) {
          router?.replace('/');
        } else {
          setLoading(false);
        }
      }, 2000);
    }, [role]);

    if (loading) return <h1>Loading...</h1>;

    return <WrappedComponent {...props} />;
  };

  return withAuthGuardComponent;
}

export default AuthGuard;
