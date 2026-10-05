# TxBot

TxBot is a browser-based trade assistant demo for token workflows, security guidance, HS-code questions, and customs support. The chatbot interface is in [`chatbot.ui/`](./chatbot.ui/).

## Preview

The production preview is not currently available; the configured Vercel URL returns 404.

To preview the chatbot in Codespaces, start Vite from `chatbot.ui/` with `npm run dev` and open the forwarded port **5173**. Port **8080** serves the repository root and may show a directory listing instead of the chatbot. The forwarded Codespaces URL is temporary and only works while the dev server is running.

## Run the chatbot locally

Requirements: Node.js 18+ and npm.

```sh
cd chatbot.ui
npm ci
npm run dev
```

Vite prints the local URL after the development server starts.

## Features

- Start, search, select, and delete conversations. History is saved in the current browser.
- Personalize the welcome greeting with a locally saved first name.
- Use quick prompts for common TxBot topics.
- Optionally connect a backend that accepts the current message and conversation transcript.

Without a configured backend, the app uses limited local keyword replies; it does not generate AI responses.

## Documentation

- [Chatbot setup and usage](./chatbot.ui/README.md)
- [Deployment guide](./chatbot.ui/DEPLOYMENT.md)
- [Frequently asked questions](./chatbot.ui/FAQ.md)

## Build

```sh
cd chatbot.ui
npm ci
npm run build
```

The production site is built into `wss:chatbot.ui/dist/`.
