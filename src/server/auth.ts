import { type GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import type { DefaultSession, DefaultUser, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '@/env.mjs';
import { prisma } from '@/server/db';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { User as PrismaUser } from '@prisma/client';
import { z } from 'zod';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
type U = Omit<PrismaUser, keyof DefaultUser>;
declare module 'next-auth' {
  interface User extends U {
    emailVerified: Date | null; // adds email verified to the User interface
  }
  interface Session extends DefaultSession {
    accessToken: string | unknown;
    user: {
      id: string;
      // ...other properties
      // role: UserRole; // @TODO: Add Role
    } & DefaultUser;
  }
}

/**
 * Zod schema to match updated user/session definitions
 */

export const authUserSchema = z.object({
  id: z.string().nullish().optional(),
  email: z.string().nullish().optional(),
  image: z.string().nullish().optional(),
  name: z.string().nullish().optional(),
  // role: z.number().nullish().optional(),
  // profile: z.string().nullish().optional(),
});

export const authSessionSchema = z.object({
  accessToken: z.union([z.string(), z.unknown()]),
  expires: z.string(),
  user: authUserSchema,
});

export type AuthSession = z.infer<typeof authSessionSchema>;
export type AuthUser = z.infer<typeof authUserSchema>;

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
