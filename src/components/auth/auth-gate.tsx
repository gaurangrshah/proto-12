import React from 'react';
import { useSession } from 'next-auth/react';

import { Spinner } from '../_scaffold/ui';

type AuthGateProps = {
  // session: Session| null;
  children: React.ReactNode;
};

export function AuthGate({ children }: AuthGateProps) {
  const { status } = useSession({ required: true });

  if (status === 'loading') {
    return <Spinner />;
  }

  return <>{children}</>;
}
