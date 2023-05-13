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



