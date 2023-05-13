# Next-Auth / Prisma Setup Next.js v13



```js
model User {
		// ...
    password      String? // @db.Text
}

```

> we'll be using the credentials provider first, so we'll need to ensure our schema accepts a password on our User model.



[Source](https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/)



## Create Prisma Client

```shell
mkdir lib/prisma && touch lib/prisma/client.ts && nano lib/prisma/client.ts
```

```tsx
// /lib/prisma/client.ts

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```



## Seed Database

```shell
touch prisma/seed.ts && micro prisma/seed.ts
```

```shell
yarn add bcryptjs
```

```ts
// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await hash('password123', 12);
  const user = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      email: 'admin@admin.com',
      name: 'Admin',
      password,
    },
  });
  console.log({ user });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

```json
// package.json

{
  "scripts": {
    "seed": "prisma db seed"
  }
  {
"prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  },
}
```



## Migrate



We'll use the migrate strategy to keep our database schema in sync with the Prisma Schema as it evolves and maintain existing data in the database.

```shell
# prisma migrate dev --name <name>
```

```shell
npx prisma migrate dev --name add-user-pw
```



## Configure Auth Options

```shell
mkdir src/app/api/auth.ts && mkdir src/app/api/auth/[...nextauth] && touch src/app/api/auth/[...nextauth]/route.ts && nano src/app/api/auth/[...nextauth]/route.ts
```



```tsx
// lib/next-auth/options/auth.ts

import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { prisma } from 'lib/prisma';

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
    async authorize(
      credentials: Record<'email' | 'password', string> | undefined
    ) {
      if (!credentials?.email || !credentials.password) {
        return null;
      }

      const user = await prisma.user.findUnique({
        where: {
          email: credentials.email,
        },
      });

      if (
        !user ||
        !(await compare(credentials.password, user.password as string))
      ) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: user.emailVerified,
        randomKey: 'Hey cool', // @TODO: add key to JWT
        password: '', // @FIXME: Don't send back the password
      };
    },
  }),
];

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers,
};
```



### Store Custom keys in JWT

```tsx
// lib/next-auth/options/auth.ts

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers,
  callbacks: {
    session: ({ session, token }) => {
      console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey, // adds custom key here.
        },
      };
    },
    jwt: ({ token, user }) => {
      console.log("JWT Callback", { token, user });
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
```

> This is a pattern to help us pass along additional information via our session object. If you ever want to look at the current session you can use the url:
> [http://localhost:3000/api/session](http://localhost:3000/api/session)





## Create Auth Route Handler

```tsx
// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import { authOptions } from 'lib/next-auth/v2/options';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```



## Client Side Protection

```shell
mkdir src/app/profile && touch src/app/profile/page.tsx && micro src/app/profile/page.tsx
```

```tsx
// src/app/profile/page.tsx

"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { cache, use } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

const getUsers = cache(() =>
  fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json())
);

export default function Profile() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });

  if (status === "loading") {
    return <p>Loading....</p>;
  }

  let users = use<User[]>(getUsers());

  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 20,
        }}
      >
        {users.map((user) => (
          <div
            key={user.id}
            style={{ border: "1px solid #ccc", textAlign: "center" }}
          >
            <img
              src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
              alt={user.name}
              style={{ height: 180, width: 180 }}
            />
            <h3>{user.name}</h3>
          </div>
        ))}
      </div>
    </main>
  );
}
```





## Server Side Protection

```shell
mkdir src/app/api/session && touch src/app/api/session/route.ts && nano src/app/api/session/route.ts
```

```tsx
// src/app/api/session/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from 'lib/next-auth/v2/options';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "You are not logged in" }),
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: !!session,
    session,
  });
}
```

```tsx
// src/app/profile/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

type User = {
  id: number;
  name: string;
  email: string;
};

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const users: User[] = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  ).then((res) => res.json());

  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 20,
        }}
      >
        {users.map((user) => (
          <div
            key={user.id}
            style={{ border: "1px solid #ccc", textAlign: "center" }}
          >
            <img
              src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
              alt={user.name}
              style={{ height: 180, width: 180 }}
            />
            <h3>{user.name}</h3>
          </div>
        ))}
      </div>
    </main>
  );
}
```



## Middleware Protection

```tsx
// src/middleware.ts

export { default } from "next-auth/middleware";

export const config = {
	matcher: ['/((?!register|api|login).*)'], // whitelisted routes
};
```

When using middleware for protection we no longer need the client or server side protection in most cases so it can be removed:
```tsx
// src/app/profile/page.tsx

type User = {
  id: number;
  name: string;
  email: string;
};

export default async function Profile() {
  const users: User[] = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  ).then((res) => res.json());

  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 20,
        }}
      >
        {users.map((user) => (
          <div
            key={user.id}
            style={{ border: "1px solid #ccc", textAlign: "center" }}
          >
            <img
              src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
              alt={user.name}
              style={{ height: 180, width: 180 }}
            />
            <h3>{user.name}</h3>
          </div>
        ))}
      </div>
    </main>
  );
}
```



## Registration

```shell
mkdir src/app/api/register && touch src/app/api/register/route.ts && micro src/app/api/register/route.ts
```



```tsx
// src/app/api/register/route.ts

import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = (await req.json()) as {
      name: string;
      email: string;
      password: string;
    };
    const hashed_password = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
```



```shell
mkdir src/app/register && touch src/app/register/form.tsx && micro src/app/register/form.tsx
```

```tsx
// src/app/register/form.tsx

'use client';

import { useState, type ChangeEvent } from 'react';
import { signIn } from 'next-auth/react';

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoading(false);
      if (!res.ok) {
        alert((await res.json()).message);
        return;
      }

      signIn(undefined, { callbackUrl: '/' });
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      alert(error.message);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 500,
        rowGap: 10,
      }}
    >
      <label htmlFor="name">Name</label>
      <input
        title="Name"
        required
        type="text"
        name="name"
        value={formValues.name}
        onChange={handleChange}
        style={{ padding: '1rem' }}
      />
      <label htmlFor="email">Email</label>
      <input
        title="Email"
        required
        type="email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
        style={{ padding: '1rem' }}
      />
      <label htmlFor="password">Password</label>
      <input
        title="Password"
        required
        type="password"
        name="password"
        value={formValues.password}
        onChange={handleChange}
        style={{ padding: '1rem' }}
      />
      <button
        style={{
          backgroundColor: `${loading ? '#ccc' : '#3446eb'}`,
          color: '#fff',
          padding: '1rem',
          cursor: 'pointer',
        }}
        disabled={loading}
      >
        {loading ? 'loading...' : 'Register'}
      </button>
    </form>
  );
};
```

```shell
touch src/app/register/page.tsx && micro src/app/register/page.tsx
```

```tsx
// src/app/register/page.tsx

import { RegisterForm } from "./form";

export default function RegisterPage() {
  return (
    <div
      style={{
        display: "flex",
        height: "70vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1>Register</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
```
