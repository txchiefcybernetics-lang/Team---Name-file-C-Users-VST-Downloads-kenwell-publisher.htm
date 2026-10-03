# TxBot

TxBot is a browser-based trade assistant demo for token workflows, security guidance, HS-code questions, and customs support. The chatbot interface is in [`chatbot.ui/`](./chatbot.ui/).

## Preview

[Open the live TxBot preview](https://team-name-file-c-users-vst-download.vercel.app)

The Codespaces preview URL is temporary and only works while its forwarded development server is available.

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

The production site is built into `chatbot.ui/dist/`.
