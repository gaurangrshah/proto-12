import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/server/db';
import type { User } from '@prisma/client';
import { compare } from 'bcryptjs';
import { z } from 'zod';

export const credentialsSchema = z.object({
  email: z.string().trim().min(1, { message: 'Username or email is required' }),
  password: z.string().trim().min(1, { message: 'Password is required' }),
});

const providers: NextAuthOptions['providers'] = [
  CredentialsProvider({
    name: 'Sign in',
    credentials: {
      email: {
        label: 'Email',
        type: 'email',
        placeholder: 'example@example.com',
      },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      const validCredentials = credentialsSchema.safeParse(credentials);
      if (!validCredentials.success) return null;

      const user = await prisma.user.findUnique({
        where: {
          email: validCredentials.data.email,
        },
      });

      if (
        !user ||
        !(await compare(
          validCredentials.data.password,
          user.password as string
        ))
      ) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: user.emailVerified,
        password: '', // @FIXME: Don't send back the password
      } as User;
    },
  }),
];

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers,
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
};
