import type { Session } from 'next-auth';
import { appRouter } from '@/server/api/root';
import { prisma } from '@/server/db';
import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';

export const generateHelper = (session: Session | null) => {
  createServerSideHelpers({
    router: appRouter,
    ctx: {
      prisma,
      session: session,
      req: null,
    },
    transformer: superjson,
  });
};
