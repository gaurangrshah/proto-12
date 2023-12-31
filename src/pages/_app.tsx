import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { api } from '@/utils/api';
import '@/styles/globals.css';
import type { NextComponentTypeWithAuth } from '@/types';

import { AuthGate } from '@/components/auth/auth-gate';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { auth } = Component as NextComponentTypeWithAuth;
  return (
    <SessionProvider session={session}>
      {auth ? (
        <AuthGate>
          <Component {...pageProps} />
        </AuthGate>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
