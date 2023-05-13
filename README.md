# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.



----

## Prerequisites

> - nodejs: > 16.14.0

```shell
nvm i 16.14.0

nvm use default 16
```

```shell
node -v > .nvmrc
```



## Sample Env



```shell
#.env.example

# Prisma
# https://www.prisma.io/docs/reference/database-reference/connection-urls#env
DATABASE_URL="file:./db.sqlite"

# Next Auth
# You can generate a new secret on the command line with:
# openssl rand -base64 32
# https://next-auth.js.org/configuration/options#secret
# NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"

# Next Auth Discord Provider
DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""

NEXT_PUBLIC_MIXPANEL_TOKEN=""

# Next Auth Discord Provider
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

ADMIN_EMAIL="
SMTP_USER=""
SMTP_PASSWORD="
SMTP_HOST=""
SMTP_PORT=""
EMAIL_FROM=""
```



## Run databse:

```shell
npx prisma db push
```



## Make eslint less strict:

```tsx
// .eslintrc.cjs

const config = {
	overrides: [
    {
      extends: [
        // "plugin:@typescript-eslint/recommended-requiring-type-checking", // remove
      ],
    }
  ]
}
```



## Prettier

```shell
yarn add prettier
```



### vscode workspace settings

````json
// .vscode/settings.json

{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": false,
  "prettier.useEditorConfig": false,
  "prettier.useTabs": false,
  "prettier.configPath": ".prettierrc"
}
````



### [Prettier Sort Imports](https://github.com/IanVS/prettier-plugin-sort-imports)

```shell
yarn add -D @ianvs/prettier-plugin-sort-imports
```

```json
// .prettierrc

{
  "importOrder": [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "^(next-auth/(.*)$)|^(next-auth$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "",
    "^@/lib/(.*)$",
    "",
    "^@/components/(.*)$",
    "",
    "^@/hooks/(.*)$",
    "",
    "^@/utils/(.*)$",
    "^@/styles/(.*)$",
    "^[./]"
  ],
  "importOrderSeparation": false,
  "importOrderSortSpecifiers": true,
  "importOrderBuiltinModulesToTop": true,
  "importOrderParserPlugins": ["typescript", "jsx", "decorators-legacy"],
  "importOrderMergeDuplicateImports": true,
  "importOrderCombineTypeAndValueImports": false,
  "plugins": [
    "@ianvs/prettier-plugin-sort-imports"
  ],
}
```



### [Prettier-Plugin-Tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

```
yarn add -D prettier-plugin-tailwindcss
```

```ts
// prettier.config.ts
module.exports = {
  plugins: [
    require('prettier-plugin-tailwindcss') // must be the last item in the array.
 ], 
  "pluginSearchDirs": false // disable auto-loading of plugins becaues of priority loading of plugins.
}
```



## Tailwind

```shell
yarn add -D @tailwindcss/typography
```



```tsx
// tailwind.config.ts

import { type Config } from 'tailwindcss';

export default {
  mode: 'jit', // just-in-time compliation + faster builds + smaller file sizes
  content: [ 
    // classes used here will be included in final build
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss/typography')],
} satisfies Config;

```

```jsx
// src/pages/_app.tsx

import "@/styles/globals.css";
```

```json
{
  "scripts": {
		"tw:build": "npx tailwindcss -i ./src/styles/globals.css -o ./dist/output.css --watch"
  }
}
```

```shell
#.gitignore

# ignore tailwind-css output
/dist
```

### Editor Setup (Intellisense)

```json
// .vscode/settings.json

{
  "files.associations": {
    "*.css": "tailwindcss" // treats all css files as tailwind files
  },
  "editor.quickSuggestions": {
    "strings": true // shows suggestions with strings as well
  }
}
```

### 

### Default Styles

```css
/* custom-base.css */

* {
  border: 'none';
  margin: 0;
  padding: 0;
  box-sizing: 'border-box';
  font-feature-settings: 'optimizeLegibility';
  -webkit-font-smoothing: 'antialiased';
  -moz-osx-font-smoothing: 'grayscale';
  /* -webkit-tap-highlight-color: transparent; */
  -mox-osx-tap-highlight-color: transparent;
  white-space: 'normal';
}

*,
*::before,
*::after {
  border-color: var(--contrast-rgb);
  box-sizing: 'border-box';
  word-wrap: 'break-word';
}

html,
body {
  margin: 0;
  padding: 0;
  box-sizing: 'border-box';
  scroll-behavior: smooth;
  font-size: 100%;
  font-family: 'Inter', sans-serif;
}

body {
  position: relative;
  font-size: 1.5rem;
  line-height: 2;
  text-rendering: 'optimizeLegibility';
  -webkit-text-size-adjust: 'none';
  -moz-text-size-adjust: 'none';
  -ms-text-size-adjust: 'none';
  -o-text-size-adjust: 'none';
  text-size-adjust: 'none';
  -webkit-font-smoothing: 'antialiased';
  -moz-osx-font-smoothing: 'grayscale';
  overflow-x: auto;
  max-width: 100vw;
  color: rgb(var(--contrast-rgb));
  background: linear-gradient(to bottom, transparent, #ffffff) #e2e2e2;
}

#__next,
#root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
```

```css
/* globals.css */

@import 'tailwindcss/base';

@tailwind base;
@tailwind components;
@tailwind utilities;
```



### Google Fonts

```shell
import { Bebas_Neue, Inter } from 'next/font/google';

// #vgdy0w

// If loading a variable font, you don't need to specify the font weight
export const inter = Inter({
  // weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--inter-font',
});

export const bebas = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--bebas-font',
});
```

```tsx
import {inter} from '@/utils.fonts'

 <main className={`flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] ${inter.variable}`}>
  {/*...*/}
</main>
```

```tsx
// tailwind.config.ts

  theme: {
    extend: {
      fontFamily: {
        // #vgdy0w
        body: ['var(--inter-font)', ...fontFamily.sans],
        dec: ['var(--bebas-font)', 'cursive'],
      },
    }
  }
```



## [TRPC](https://create.t3.gg/en/introduction)

> - [Quickstart | tRPC](https://trpc.io/docs/quickstart)

### Env Vars

> T3 now rolls up the env vars solution into it's own package, it comes pre-installed and semi-configured so we can add our own variables based on the examples.
>
> - [Env Vars (t3.gg)](https://env.t3.gg/docs/installation)

Based  on the `.env` file:

```shell
# Prisma
# https://www.prisma.io/docs/reference/database-reference/connection-urls#env
DATABASE_URL="file:./db.sqlite"

# Next Auth
# You can generate a new secret on the command line with:
# openssl rand -base64 32
# https://next-auth.js.org/configuration/options#secret
# NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"

# Next Auth Discord Provider
DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""

NEXT_PUBLIC_MIXPANEL_TOKEN=""

# Next Auth Discord Provider
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

ADMIN_EMAIL="
SMTP_USER=""
SMTP_PASSWORD="
SMTP_HOST=""
SMTP_PORT=""
EMAIL_FROM=""
```

Update the `src/env.mjs` file:

```js
import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string().min(1)
        : z.string().min(1).optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string().min(1) : z.string().url(),
    ),
    // Add `.min(1) on ID and SECRET if you want to make sure they're not empty
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    ADMIN_EMAIL: z.string().email(),
    SMTP_USER: z.string(),
    SMTP_PASSWORD: z.string(),
    SMTP_HOST: z.string(),
    SMTP_PORT: z.string(),
    EMAIL_FROM: z.string().email(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
    NEXT_PUBLIC_MIXPANEL_TOKEN: z.string().min(1),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    EMAIL_FROM: process.env.EMAIL_FROM,
    NEXT_PUBLIC_MIXPANEL_TOKEN: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
  },
});
```



### Export TRPC inner context (used for testing, etc..)

```tsx
// src/server/api/trpc
import type { inferAsyncReturnType } from '@trpc/server';

export type InnerTRPCContext = inferAsyncReturnType<
  typeof createInnerTRPCContext
>;
```







## [NEXT-AUTH](https://next-auth.js.org/getting-started/example)



### Test Utilities

```tsx
// lib/next-auth/utils/scaffold/session.ts

import { randomBytes } from 'crypto';

import type { Session, User } from 'next-auth';

import { prisma } from '../../../../src/server/db';

/**
 ** Use by test factory
 *
 ** @SEE: https://tinyurl.com/2hmcdg8u
 */

const defaultSessionMaxAge = 30 * 24 * 60 * 60 * 1000;
const sessionMaxAge = defaultSessionMaxAge;
const sessionUpdateAge = 24 * 60 * 60 * 1000;
/**
 *
 *
 * @export
 * @param {User} user
 * @return {*}
 */
export async function createSession(user: User) {
  try {
    let expires = null;
    if (sessionMaxAge) {
      const dateExpires = new Date();
      dateExpires.setTime(dateExpires.getTime() + sessionMaxAge);
      expires = dateExpires.toISOString();
    }
    if (!expires) throw new Error('createSession ' + 'no expiration');
    return prisma['session'].create({
      data: {
        expires,
        userId: user.id,
        sessionToken: randomBytes(32).toString('hex'),
        // accessToken: randomBytes(32).toString('hex'),
      },
    });
  } catch (error) {
    console.error('CREATE_SESSION_ERROR', error);
    return Promise.reject(
      new Error('CREATE_SESSION_ERROR ' + JSON.stringify(error))
    );
  }
}

/**
 *
 *
 * @export
 * @param {Session} session
 * @param {boolean} force
 * @return {*}
 */
export async function updateSession(session: Session, force: boolean) {
  console.log('UPDATE_SESSION', session);
  try {
    if (
      sessionMaxAge &&
      (sessionUpdateAge || sessionUpdateAge === 0) &&
      session.expires
    ) {
      // Calculate last updated date, to throttle write updates to database
      // Formula: ({expiry date} - sessionMaxAge) + sessionUpdateAge
      //     e.g. ({expiry date} - 30 days) + 1 hour
      //
      // Default for sessionMaxAge is 30 days.
      // Default for sessionUpdateAge is 1 hour.
      const dateSessionIsDueToBeUpdated = new Date(session.expires);
      dateSessionIsDueToBeUpdated.setTime(
        dateSessionIsDueToBeUpdated.getTime() - sessionMaxAge
      );
      dateSessionIsDueToBeUpdated.setTime(
        dateSessionIsDueToBeUpdated.getTime() + sessionUpdateAge
      );

      // Trigger update of session expiry date and write to database, only
      // if the session was last updated more than {sessionUpdateAge} ago
      if (new Date() > dateSessionIsDueToBeUpdated) {
        const newExpiryDate = new Date();
        newExpiryDate.setTime(newExpiryDate.getTime() + sessionMaxAge);
        session.expires = `${newExpiryDate}`; // check: coerced to string
      } else if (!force) {
        return null;
      }
    } else {
      // If session MaxAge, session UpdateAge or session.expires are
      // missing then don't even try to save changes, unless force is set.
      if (!force) {
        return null;
      }
    }

    const { id, expires } = session as { id: string } & Session;
    return prisma['session'].update({ where: { id }, data: { expires } });
  } catch (error) {
    console.error('UPDATE_SESSION_ERROR', error);
    return Promise.reject(
      new Error('UPDATE_SESSION_ERROR ' + JSON.stringify(error))
    );
  }
}

/**
 *
 *
 * @export
 * @param {*} sessionToken
 * @return {*}
 */
export async function deleteSession(sessionToken: any) {
  console.log('DELETE_SESSION', sessionToken);
  try {
    return prisma['session'].delete({ where: { sessionToken } });
  } catch (error) {
    console.error('DELETE_SESSION_ERROR', error);
    return Promise.reject(
      new Error('DELETE_SESSION_ERROR ' + JSON.stringify(error))
    );
  }
}

```



### User Permissions

```tsx
// lib/next-auth/services/permissions.ts

/**
 *
 * @fileoverview This file contains functions that can be used to check if a user has permissions to perform an action
 * @SEE: https://github.com/echobind/bisonapp/blob/canary/packages/create-bison-app/template/services/permissions.ts
 *
 * Requires user roles to be added to prisma db
 */

import type { InnerTRPCContext } from '@/server/api/trpc';
import type { User } from '@prisma/client';

import { ROLES } from 'lib/prisma/utils';

/**
 * Returns true if the user has a role of admin
 * @param user The user to check the role for
 */
export const isAdmin = (user?: Partial<User> | null): boolean => {
  if (!user?.role) {
    return false;
  }

  return user.role === Number(ROLES.ADMIN);
};

/**
 * Returns true if the passed in user is the same as the logged in user
 * @param user the user to test
 * @param ctx the context which contains the current user
 */
export function isSelf(
  id: User['id'],
  session: InnerTRPCContext['session']
): boolean {
  return id === session?.user.id;
}

export function isOwner(
  profileId: User['profileId'],
  session: InnerTRPCContext['session']
): boolean {
  return profileId === session?.user.profileId;
}

/**
 * Returns true if a user can access an object. This is a very basic check that quickly does the following:
 *   The current user is an admin
 *   The current user is trying to access themselves
 *   The object has a userId property that the same id as the current user
 * @param object the object to check for a userId property on
 * @param ctx the context which contains the current user
 * @param idField the key in the object to check against
 */
export function canAccess(
  user: User,
  session: InnerTRPCContext['session'],
  idField = 'id' || 'userId'
): boolean {
  if (!session?.user) return false;
  if (isAdmin(session.user)) return true;
  if (isSelf(user.id, session)) return true;

  return (user as any)[idField] === session.user?.id;
}

```



### Token Verification

```tsx
// lib/next-auth/services/auth.ts

/**
 * Handles auth verification actions on the API.
 */

import * as bcrypt from 'bcryptjs';
// export default () => console.log('boop');
/**
 * Hashes a password using bcrypt
 * @param password the password to hash
 */
export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

/**
 * Compares a password against a hashed password
 * @param password The password to compare
 * @param hashedPassword The hashed password
 */
export function comparePasswords(
  password: string,
  hashedPassword: string
): boolean {
  return bcrypt.compareSync(password, hashedPassword);
}
```



## Providers

```tsx
// lib/next-auth/options/providers.ts

/* eslint-disable no-unused-vars */
// import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';

import { type NextAuthOptions } from 'next-auth';

import { env } from '@/env.mjs';
import { ONE_DAY_MS } from '@/utils';
// import { prisma } from '@/server/db';
// import { User } from '@prisma/client';
// import { comparePasswords } from '../services';

const google = GoogleProvider({
  clientId: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
  // authorization: {
  //   params: {
  //     prompt: 'consent',
  //     access_type: 'offline',
  //     response_type: 'code',
  //     scope:
  //       'openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
  //   },
  // },
});

// /**
//  * @NOTE: Requires nodemailer + JWT strategy + callback to work
//  */
const email = EmailProvider({
  server: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  },
  from: process.env.EMAIL_FROM,
  maxAge: ONE_DAY_MS, // How long email links are valid for (default 24h)
});

/**
 * @NOTE: Requires JWT strategy + callback to work
 * + must also add password field to db
 * @FIXME: this is not working due to a type issue after updating client side user/session/role handling see #sha- 250b035b441448c2e5e3461ad6393a56222c16ab
 */
// const credentials = CredentialsProvider({
//   name: 'Credentials',
//   credentials: {
//     email: {
//       label: 'Username',
//       type: 'text',
//       placeholder: 'you@youremail.com',
//       value: process.env.TEST_USER,
//     },
//     password: {
//       label: 'Password',
//       type: 'password',
//       placeholder: '***********',
//       value: process.env.TEST_PW,
//     },
//   },
//   async authorize(credentials, req) {
//     if (!credentials || !credentials?.email || !credentials?.password) {
//       console.log('🔴 invalid credentials');
//       return null;
//     }
//     const user = await prisma.user.findUnique({
//       where: { email: credentials?.email },
//       include: { Profile: true },
//     });

//     if (!user || !user?.password) return null;

//     if (comparePasswords(credentials?.password, user?.password)) {
//       console.log('🟢 password compare success');
//       return { ...user, profile: user?.Profile?.id };
//     }
//     console.log('🔴 password compare fail');
//     return null;
//   },
// });

export const providers: NextAuthOptions['providers'] = [email, google];
// TEST_ENV ? providers.push(credentials) : providers.push(google);
```



### Events

```tsx
// lib/next-auth/options/events

import type { NextAuthOptions } from 'next-auth';

// import { analytics } from '../../analytics';

// import { prisma } from '@/server/db';

// @link: https://next-auth.js.org/configuration/options#events
export const events: NextAuthOptions['events'] = {
  async signIn(message) {
    // analytics.track('auth-signIn', {
    //   category: 'auth',
    //   label: 'auth:signIn',
    //   value: 1,
    //   ...message.user,
    //   isNewUser: message.isNewUser,
    //   // @TODO: add emailVerified field to tracking
    // });
    // analytics.identify(message.user.id, {
    //   ...message.user,
    //   isNewUser: message.isNewUser,
    // });
  },
  async signOut(message) {
    // analytics.track('auth-signOut', {
    //   category: 'auth',
    //   label: 'auth:signOut',
    //   value: 1,
    //   ...message.session.user,
    // });
    // analytics.identify(message.session.user.id, {});
  },
  async createUser(message) {
    // const user = await prisma.user.update({
    //   where: { id: message.user.id },
    //   data: {
    //     Profile: { create: {} },
    //     Role: { connect: { level: 0 } },
    //   },
    //   include: { Profile: true },
    // });

    // if (user && user.Profile && user.role) {
    //   analytics.track('auth-user-create', {
    //     category: 'auth',
    //     label: 'user:create',
    //     value: 1,
    //     ...message.user,
    //     profile: user.profileId,
    //   });
    //   analytics.identify(message.user.id, {
    //     ...message.user,
    //     profile: user.profileId,
    //   });
    // }
  },
  async updateUser(message) {
    // analytics.track('auth-user-update', {
    //   category: 'auth',
    //   label: 'user:update',
    //   value: 1,
    //   ...message.user,
    // });
    // analytics.identify(message.user.id, {
    //   ...message.user,
    // });
  },
  async linkAccount(message) {
    delete message.account.access_token;
    delete message.account.expires_at;
    delete message.account['id_token'];
    delete message.account['token_type'];
    delete message.account.scope;
    delete message.account['expires_at'];
    message.account['providerAccountId'] = '*****';
    // analytics.track('auth-link-account', {
    //   category: 'auth',
    //   label: 'account:link',
    //   value: 1,
    //   ...message.account,
    // });
    if (!message.account && !message.user.name) {
      // analytics.track('auth-link-account-error', {
      //   category: 'auth',
      //   label: 'account:link:error',
      //   value: 1,
      // });
      // analytics.identify(message.user.id, {
      //   ...message.user,
      // });
    }
  },
  async session(message) {
    // analytics.track('auth-session', {
    //   category: 'auth',
    //   label: 'session',
    //   value: 1,
    //   ...message.session.user,
    // });
  },
};
```



### Callbacks

```tsx
// next-auth/options/callbacks.ts

// import { EMAIL_REGEX } from '@/utils';
// import type { User } from '@prisma/client';
import type { CallbacksOptions } from 'next-auth';

export const jwt: CallbacksOptions['jwt'] = ({ token, account, profile }) => {
  if (account) {
    token.accessToken = account.access_token;
    token.id = profile?.sub;
  }

  return token;
};

export const session: CallbacksOptions['session'] = ({
  session,
  user,
  token,
}) => {
  if (session?.user) {
    session.user.id = user?.id;
    // session.user.profileId = user?.profileId;
    session.user.emailVerified = user?.emailVerified;
    // session.user.role = user?.role || 0; // make user anonymous if they don't have a role
    if (!session?.accessToken) {
      session.accessToken = token?.accessToken;
    }
  }
  console.log(session);
  return session;
};

export const signIn: CallbacksOptions['signIn'] = ({
  user,
  account,
  profile, // @NOTE: this is the profile from the provider not our profile
  email,
  credentials,
}) => {
  // @NOTE: must specify a validation check for each provider
  // if (account?.provider === 'google' && profile?.email) {
  //   return profile?.email.endsWith('@gmail.com');
  // }

  return true;
};

export const callbacks = { signIn, jwt, session };
```





## Nodemailer

```shell
yarn add nodemailer
```

```shell
yarn add -D @types/nodemailer
```

```tsx
// lib/nodemailer/index.ts

import { createTransport } from 'nodemailer';

import type { Transporter } from 'nodemailer';

import { env } from '@/env.mjs';
import { isDev } from '@/utils';

type EmailParams = {
  email: string;
  subject: string;
  html: string;
};

export default class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      secure: true,
    });
  }

  async sendTransactionalEmail(params: EmailParams) {
    try {
      await this.transporter.sendMail({
        from: 'Swatchr App <support@swatchr.app>',
        to: params.email,
        subject: params.subject,
        html: params.html,
      });
      isDev && console.log('Transactional email sent successfully');
    } catch (error) {
      console.error('Error sending transactional email:', error);
    }
  }

  async sendAdminEmail(params: Omit<EmailParams, 'email'>) {
    try {
      await this.transporter.sendMail({
        from: 'Swatchr App <support@swatchr.app>',
        to: env.ADMIN_EMAIL,
        subject: params.subject,
        html: params.html,
      });
      isDev && console.log('Admin email sent successfully');
    } catch (error) {
      console.error('Error sending admin email:', error);
    }
  }
}
```



### Email Wrapper

```tsx
// lib/nodemailer/emails/email-wrapper.tsx

export function EmailWrapper({
  subject,
  children,
}: {
  subject: string;
  children: React.ReactNode;
}) {
  return (
    <html>
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <meta charSet="utf-8" />
        <title>{subject || 'Swatchr App'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <main className="p-4 bg-black border-width-1 rounded-4 border border-red-400">
          {children}
        </main>
      </body>
    </html>
  );
}
```



### Emails

```tsx
// lib/nodemailer/emails/feedback-email.tsx

import { partialMaskEmail } from '@/utils';
import { EmailWrapper } from './email-wrapper';

export function feedbackEmail({
  subject,
  email,
}: {
  subject: string;
  email: string;
}) {
  return (
    <EmailWrapper subject={subject}>
      <div className='p-4 border rounded-4 bg-black'>
        <h1 className="mb-4 text-xl">
          Hey!👋 Thanks for providing your feedback
        </h1>
        <p className="mb-4">
          {/* eslint-disable-next-line react/no-unescaped-entities  */}
          We'll keep you updated on this issue. You'll receive updates at{' '}
          {partialMaskEmail(email)}
        </p>
      </div>
    </EmailWrapper>
  );
}

export function adminFeedbackEmail({
  subject,
  email,
}: {
  subject: string;
  email?: string;
}) {
  return (
    <EmailWrapper subject={subject}>
      <div className='p-4 border rounded-4 bg-black'>
        <h1 className="mb-4 text-xl">
          New Feedback Submitted
        </h1>
        {/* partialMaskEmail(email) */}
        {email ? <p className='mb-4'>from: {email}</p> : null}
        {subject}
      </div>
    </EmailWrapper>
  );
}
```



```tsx
// lib/nodemailer/emailers/verification-email.tsx

import { partialMaskEmail } from '@/utils';
import { EmailWrapper } from './email-wrapper';

export function verificationEmail({
  subject,
  email,
}: {
  subject: string;
  email: string;
}) {
  return (
    <EmailWrapper subject={subject}>
      <div className="p-4 bg-black border-width-1 rounded-4 border">
        <h1 className="xl mb-4">
        Hey!👋 Thanks for joining the Swatchr Beta!
        </h1>
        <h2 className="lg mb-4">
          Let&apos;s get you started.
        </h2>
        <p className="mb-4">
          An account is pending for the following email:{' '}
          {partialMaskEmail(email)}
        </p>
        <h2 className="text-md mb-4">
          Verify Your Email
        </h2>
        <p className="mb-4">
          Please click the button below to verify your email address.
        </p>
        <a href="https://swatchr.app" target="_blank" rel="noopener noreferrer">Verify Email</a>
      </div>
    </EmailWrapper>
  );
}
```



## [Analytics](https://getanalytics.io/)

```shell
yarn add @vercel/analytics analytics analytics-plugin-do-not-track @analytics/activity-utils @analytics/cookie-utils @analytics/mixpanel
```

> ```shell
> @analytics/google-analytics
> ```

```tsx
// lib/analytics/plugin-do-not-track.d.ts

declare module 'analytics-plugin-do-not-track' {
  export default function doNotTrackPlugin(): void;
}
```

### Custom Logger

```tsx
// lib/analytics/logger.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
export function loggerPlugin(config: { enabled: boolean }) {
  return {
    name: 'analytics-logger',
    config: {
      enabled: config.enabled,
    },
    initialize: () => console.log('📊 loading ALogger'),
    loaded: () => true,
    ready: () => console.log('📊 ready: ALogger'),
    page: ({ payload }: { payload: Record<string, any> }) => {
      console.log('📊 APage', payload);
    },
    pageEnd: ({ payload }: { payload: Record<string, any> }) => {
      console.log('📊 APageEnd', payload);
    },
    /* Track event */
    track: ({ payload }: { payload: Record<string, any> }) => {
      console.log('📊 ATrack', payload);
    },
    /* Identify user */
    identify: ({ payload }: { payload: Record<string, any> }) => {
      delete payload?.traits?.password;
      console.log('📊 AIdentify', payload);
    },
  };
}
```



### Custom Plugin

```tsx
export function crispPlugin(userConfig: { crispId: string; enabled: boolean }) {
  // return object for analytics to use
  return {
    name: 'crisp-plugin',
    config: {
      crispId: userConfig.crispId,
      enabled: userConfig.enabled,
    },
    initialize: ({ config }: any) => {
      // load your script here.
      if (!config.enabled) return;
      (<any>window).$crisp = [];
      (<any>window).CRISP_WEBSITE_ID = config.crispId;
      (function () {
        const d = document;
        // this might be causing an unterminated string literal error
        // @SEE: https://tinyurl.com/2ocvkfvt

        const s = d.createElement('script');
        s.src = 'https://client.crisp.chat/l.js';
        // s.async = 1;
        s.async = true;
        d?.getElementsByTagName('head')[0]?.appendChild(s);
      })();
    },
  };
}

// usage:
// crispPlugin({
//   crispId: String(process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID),
//   enabled: !!process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID && getConsent(),
// }),

```



### Analytics Config With Consent

```tsx
// lib/analytics/consent.ts

import { APP_CONSENT, isClient, isDev, isProd } from '@/utils';
import mixpanelPlugin from '@analytics/mixpanel';
import Analytics, { type AnalyticsInstance } from 'analytics';
import doNotTrack from 'analytics-plugin-do-not-track';

import { loggerPlugin } from './logger';

// @link: https://getanalytics.io/plugins/do-not-track/

// @TODO: Impelment tab events @SEE: https://getanalytics.io/plugins/tab-events/

export function getConsent(): boolean {
  if (!isClient) return false;
  // @TTODO: extract key name to const and use in other places
  const consent = localStorage.getItem(APP_CONSENT);
  if (consent !== null) return JSON.parse(consent);
  localStorage.setItem(APP_CONSENT, 'false');
  return false;
}

const analyze = !isDev && getConsent();
export const analytics = Analytics({
  app: 'swatchr',
  debug: isDev,
  plugins: [
    analyze
      ? mixpanelPlugin({ // supplement with analytics of choice
          token: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
          enabled: !!process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
        })
      : doNotTrack(),
    loggerPlugin({ enabled: !isProd }),
  ],
});

export type WindowWithAnalytics = Window &
  typeof globalThis & { Analytics: AnalyticsInstance };
if (isClient) {
  (window as WindowWithAnalytics).Analytics = analytics;
}

/**
 * @NOTE: FIREFOX BROWSER
 * Firefox blocks cookies from third-party trackers by default.
 * @SEE: https://developer.mozilla.org/en-US/docs/Web/Privacy/Storage_access_policy/Errors/CookieBlockedTracker
 *
 */
```



### Custom Analytics Wrapper

```tsx
// src/components/analytics/custom-analytics.tsx

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getAnonId } from '@/utils';
// import { api } from '@/utils/api';
import { analytics } from 'lib/analytics';

interface IAnalytics {
  asPath: string;
}

/**
 *
 * NOTE: add server route to get ip
 */
export const CustomAnalytics: React.FC<IAnalytics> = ({ asPath }) => {
  const { data: session, status } = useSession();
  // const { data: ip } = api.server.ip.useQuery();
  useEffect(() => {
    analytics.page();
  }, [asPath]);

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      const anon = getAnonId();
      analytics.identify(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        anon!,
        {
          category: 'anon',
          label: 'anon-user',
          value: 1,
        },
        // () => console.log('Identified anon user', anon, ip)
        () => console.log('Identified anon user', anon)
      );
    }
    // }, [session, status, ip]);
  }, [session, status]);

  return null;
};
```

```tsx
// src/pages/_app.tsx

import type { NextComponentTypeWithAuth } from '@/types';
import type { Session } from 'next-auth';
import type { AppType } from 'next/app';

import { CustomAnalytics } from '@/components/';
import { api } from '@/utils/api';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) => {
  const { auth } = Component as NextComponentTypeWithAuth;

  return (
    <>
      {!isDev ? <CustomAnalytics asPath={router.asPath} /> : null}
    </>
  );
};

export default api.withTRPC(MyApp);
```



### Banner

```tsx
// src/components/analytics/banner.tsx

'use client';

import { useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import Link from 'next/link';
import { APP_CONSENT, isBrowser } from '@/utils';
import { analytics, getConsent } from 'lib/analytics';

import { CookieIcon } from '@/components/icons';

interface BannerProps {
  children: ReactNode;
  btnLabel: string;
  consent: boolean;
  handleConsent: () => void;
}

export const Banner: FC<BannerProps> = ({
  children,
  btnLabel,
  consent,
  handleConsent,
}) => {
  const [hide, setHide] = useState<boolean>(consent);

  useEffect(() => {
    if (isBrowser && !consent) document.body.style.overflow = 'hidden';
    () => {
      if (isBrowser) document.body.style.overflow = 'visible';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
  }, [hide, consent]);

  return !hide ? (
    <>
      <div className="absolute inset-0 z-[1] overflow-hidden bg-black/50 dark:bg-white/50" />
      <div className="alert absolute bottom-6 z-[2] w-9/12 shadow-lg">
        <div className="flex h-full w-full flex-col items-center justify-between space-y-3 md:flex-row md:space-x-2">
          <div className="h-12 w-12">
            <CookieIcon />
          </div>
          <div className="flex flex-col items-start space-x-4 md:flex-row md:items-center">
            <div className="p-4 sm:p-0">{children}</div>
          </div>
          <div className="flex flex-col items-center gap-y-2 space-y-2">
            <button
              aria-label="accept-button"
              className="btn-outline btn-sm btn w-36"
              onClick={handleConsent}
            >
              {btnLabel}
            </button>
            <button
              aria-label="accept-button"
              className="btn-ghost btn-sm btn w-36 text-neutral-focus"
              onClick={() => {
                setHide(!hide);
              }}
            >
              Later
            </button>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export function Consent() {
  'use client';
  const [consent, setConsent] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const localConsent = getConsent();
    if (localConsent) document.body.style.overflow = 'visible';
    setConsent(localConsent);
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!consent) return;
    localStorage.setItem(APP_CONSENT, 'true');
  }, [consent]);

  const handleConsent = () => {
    if (isBrowser) document.body.style.overflow = 'visible';
    setConsent(true);
    analytics.track(APP_CONSENT, {
      category: 'consent-approval',
      label: 'consent',
      value: 1,
    });
  };

  return mounted && !consent ? (
    <Banner
      btnLabel="I Understand"
      handleConsent={handleConsent}
      consent={consent}
    >
      <p className="text-sm font-medium leading-3 md:text-base">
        We use cookies to personalize content and provide you with a better
        browsing experience.
      </p>
      <p className="font-italic mt-1 text-xs leading-3 text-gray-500">
        For more info visit our{' '}
        <Link className="text-xs underline" href="/policies/privacy">
          Privacy Policy
        </Link>
        . and{' '}
        <Link className="text-xs underline" href="/policies/terms">
          Terms and Condition
        </Link>
        .
      </p>
    </Banner>
  ) : null;
}
```



### Vercel Analytics

```tsx
// src/pages/_app.ts

import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

import type { NextComponentTypeWithAuth } from '@/types';
import type { Session } from 'next-auth';
import type { AppType } from 'next/app';

import { api } from '@/utils/api';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) => {
  const { auth } = Component as NextComponentTypeWithAuth;

  return (
    <>
      <Analytics />
    </>
  );
};

export default api.withTRPC(MyApp);
```



### [Next-Sitemap](https://github.com/iamvishnusankar/next-sitemap)

```shell
yarn add next-sitemap
```

```tsx
// next-sitemap.config.cjs

/** @type {import('next-sitemap').IConfig} */

// @TODO: add postbuild script to generate a sitemap
// @link: https://github.com/iamvishnusankar/next-sitemap
const NextSitemapConfig = {
  siteUrl: String(process.env?.VERCEL_URL || process.env?.NEXTAUTH_URL),
  generateRobotsTxt: true,
  exclude: ['/sandbox', '/_splash', '/admin/*', '/api/*'],
};

module.exports = NextSitemapConfig;
```

```json
// package.json

{
  "scripts": {
	  "postbuild": "next-sitemap"
  }
}
```



### [Next-SEO](https://github.com/garmeeh/next-seo)

```shell
yarn add next-seo
```

```json
// config.json

{
  "title": "Swatchr",
  "url": "https://swatchr.app",
  "description": "This is the description for this #bada55 project.",
  "keywords": "Doing all the dope things of course",
  "twitterHandle": "@SwatchrApp",
  "locale": "en_US",
  "images": [
    {
      "url": "https://cdn.jsdelivr.net/gh/swatchr/app@main/public/swatchr-md.png",
      "width": 960,
      "height": 960,
      "alt": "Swatchr Logo",
      "type": "image/png"
    }
  ],
  "additionalLinkTags": [
    {
      "rel": "icon",
      "href": "https://cdn.jsdelivr.net/gh/swatchr/app@main/public/swatchr-md.png"
    },
    {
      "rel": "banner",
      "href": "https://cdn.jsdelivr.net/gh/swatchr/app@main/public/swatchr-full.png"
    },
    {
      "rel": "canonical",
      "href": "https://swatchr.app"
    }
  ]
}
```

```tsx
// utils/seo.js

export function SEOConfig(
  title: string,
  description?: string,
  image?: OGImage
): SeoConfig {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { images, ...config }: Config = require('../../_data/seo.config.json');
  const newImages =
    image?.url && images?.[0]?.url !== image.url ? [image, ...images] : images;
  const ogImages = newImages.map(({ url, width, height, alt, type }) => ({
    url,
    width,
    height,
    alt,
    type,
  }));

  return {
    title: `${title ?? config.title}`,
    description: description ?? config.description,
    keywords: config.keywords,
    twitter: {
      cardType: 'summary_large_image',
      handle: config.twitterHandle,
    },
    openGraph: {
      url: config.url,
      title: `${title ?? config.title}`,
      description: description ?? config.description,
      locale: config.locale,
      images: ogImages,
    },
    additionalLinkTags: config.additionalLinkTags,
  };
}

interface SeoConfig {
  title: string;
  description: string | undefined;
  keywords: string[] | undefined;
  twitter: {
    cardType: string;
    handle: string | undefined;
  };
  openGraph: {
    url: string | undefined;
    title: string;
    description: string | undefined;
    locale: string | undefined;
    images: OGImage[];
  };
  additionalLinkTags: { rel: string; href: string }[] | undefined;
}

interface Config {
  title: string;
  description: string | undefined;
  keywords: string[] | undefined;
  twitterHandle: string | undefined;
  url: string | undefined;
  locale: string | undefined;
  images: OGImage[];
  additionalLinkTags: { rel: string; href: string }[] | undefined;
}

export type OGImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
  type: string;
};
```

```tsx
// src/components/layouts/default.tsx

import { NextSeo } from 'next-seo';
import { SEOConfig } from '@/utils/seo';


export const BaseLayout: React.FC<BaseLayoutProps> = ({
  title = 'Site Title',
  description = '',
  image,
  children,
}) => {
  
  return (
    <>
    	<NextSeo {...SEOConfig(title, description, image)} />
    </>
  )
}
```



### Markdown

```shell
yarn add markdown-to-jsx
```

```tsx
// src/server/api/routers/markdown.ts

import fs from 'fs';
import path from 'path';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { z } from 'zod';

export const markdownRouter = createTRPCRouter({
  getFileContent: publicProcedure
    .input(z.object({ file: z.string() }))
    .query(({ input }) => {
      const markdownFilePath = path.join(
        process.cwd(),
        'content',
        'legal',
        input.file + '.md'
      );
      const markdownFileContent = fs.readFileSync(markdownFilePath, 'utf-8');
      return { content: markdownFileContent };
    }),
});

```

```tsx
// src/pages/polices/disclaimer.tsx

import React from 'react';
import type { NextPage } from 'next';
import { DefaultLayout } from '@/components';
import Markdown from 'markdown-to-jsx';

import { api } from '@/utils/api';

const Disclaimer: NextPage = () => {
  const { data } = api.markdown.getFileContent.useQuery({
    file: 'disclaimer',
  });

  return (
    <DefaultLayout>
      <div className="prose-lg prose p-4">
        <Markdown>{data?.content ?? ''}</Markdown>
      </div>
    </DefaultLayout>
  );
};

export default Disclaimer;
```

