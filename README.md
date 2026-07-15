# Infinite Robots homepage

The [Next.js](https://nextjs.org) marketing site for Infinite Robots, including the AI chat widget.

## Prerequisites

- Node.js 24 (see `.nvmrc`; enforced by `engines.node`)
- npm 11+

If you use [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm install
nvm use
```

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
# AI chat widget — Anthropic API key (console.anthropic.com)
ANTHROPIC_API_KEY=sk-ant-...

# Discord — chat transcripts are logged to a thread per conversation
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_CHANNEL_ID=your_channel_id

# Discord — contact form submissions
DISCORD_WEBHOOK_URL=your_webhook_url

# Canonical site origin, used for robots.txt and sitemap
# Defaults to https://infinite-robots.com when unset
NEXT_PUBLIC_BASE_URL=https://infinite-robots.com
```

The same variables must be set in the Vercel project for deployed environments.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script                 | Purpose                             |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Start the development server        |
| `npm run build`        | Production build                    |
| `npm start`            | Serve the production build          |
| `npm run lint`         | ESLint over the project             |
| `npm run lint:fix`     | ESLint with autofix                 |
| `npm run typecheck`    | Type-check without emitting         |
| `npm run test`         | Vitest in watch mode, with coverage |
| `npm run test:run`     | Vitest once (used by CI)            |
| `npm run format`       | Format with Prettier                |
| `npm run format:check` | Check formatting without writing    |

A pre-commit hook runs `lint-staged` over staged files. CI runs lint, typecheck, tests, and build on every pull request.

## Chat Architecture

The chat widget in the header has two independent paths — neither depends on the other:

1. **AI response** — `ChatWidget` → `useAIChat` → `POST /api/chat` → Anthropic (via the [AI SDK](https://ai-sdk.dev) `@ai-sdk/anthropic` provider), streamed back to the browser.
2. **Discord logging** — `useDiscord` → `/api/discord/thread` and `/api/discord/message`, which mirror each conversation into a Discord thread. This is write-only; nothing comes back from Discord to the site.

Because they are independent, Discord messages arriving does not imply the AI path is healthy. The widget shows "Offline" if _either_ path fails.

Requests go directly to the Anthropic API. The Vercel AI Gateway is intentionally not used — it requires paid Vercel credits to forward to your own key (BYOK), which adds cost and a failure point for no benefit here.

Errors during streaming surface after the HTTP response has already begun, so they are logged in `/api/chat` via the `onError` handler rather than the surrounding `try`/`catch`. Check the Vercel runtime logs for `Chat stream error:` when the widget goes offline.

## Deployment

Deployed on [Vercel](https://vercel.com). Pushes to `main` deploy automatically; pull requests get preview deployments.
