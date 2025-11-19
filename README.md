## Infinite Robots homepage

This is a [Next.js](https://nextjs.org) project for the Infinite Robots homepage.

## Prerequisites

- Node.js v24.11.1 (specified in `.nvmrc`)
- npm 11.6.2+

If you use [nvm](https://github.com/nvm-sh/nvm), you can install and use the correct Node version:

```bash
nvm install
nvm use
```

## Environment Variables

Create a `.env.local` file in the root directory with the following:

```bash
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN
```

## Running the Development Server

First, run the development server:
Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Code Formatting

This project uses Prettier for code formatting. Format your code with:

```bash
npm run format        # Format all files
npm run format:check  # Check formatting without making changes
```

VS Code will automatically format on save if you have Prettier extension installed.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
