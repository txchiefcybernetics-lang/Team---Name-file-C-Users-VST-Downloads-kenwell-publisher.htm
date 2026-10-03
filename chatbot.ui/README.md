# TxBot Chatbot UI

A responsive web-based chatbot interface for the TxBot token management platform.

## Features

✨ **Modern Interface**
- Clean, gradient-based design
- Responsive mobile-friendly layout
- Smooth animations and transitions

💬 **Chat Functionality**
- Real-time message display
- User and bot message differentiation
- Automatic scrolling to latest messages
- Timestamp for each message
- Searchable conversation history by topic or message, with selectable topics and short IDs, saved in the current browser
- Welcome greeting defaults to `Debugger`; users can change the display name, which is saved locally in the current browser

🎯 **Quick Start**
- Requires Node.js 18+ and npm
- Uses Vite for local development and production builds
- Easy to customize

## Files

- `index.html` - Main chatbot interface
- `styles.css` - Styling and animations
- `script.js` - Chat logic and message handling
- `README.md` - This file

## Usage

1. Run `npm ci` from `chatbot.ui/`
2. Run `npm run dev -- --host 0.0.0.0`
3. Open the local URL printed by Vite
4. Set your first name in the welcome prompt if desired
5. Type a message or choose a quick prompt

The demo does not have authentication and cannot read a server-side account name. The optional first name is stored in the browser only.

## Customize

### Change Colors

Edit the gradients and component styles in `styles.css`.

### Add Local Replies

Edit the `replies` object and `getLocalReply()` in `script.js`. Local keyword replies are used when `VITE_CHAT_API_URL` is not configured.

### Change Bot Name

Update the page `<title>` and `.chat-header h1` in `index.html`.

## Backend Integration

Copy `.env.example` to `.env` and set the API route:

```env
VITE_CHAT_API_URL=https://api.tradexpress.co/chat/write/example.ext
```

The UI sends a `POST` request with the current message and the conversation so far:

```json
{
  "message": "What about security?",
  "messages": [
    { "role": "user", "content": "Tell me about tokens" },
    { "role": "assistant", "content": "TxBot helps teams manage token workflows." },
    { "role": "user", "content": "What about security?" }
  ]
}
```

The backend should use `messages` as conversational context and return JSON `{ "reply": "..." }`. Configure `VITE_CHAT_API_URL` with the URL of a backend that implements this contract; replace the example URL in `.env.example` with your deployed endpoint. For a separately hosted backend, configure CORS. Restart Vite after editing `.env`. Vite exposes `VITE_` variables to browser code, so never put secrets in them. Without a configured API, the demo uses limited local keyword replies and does not provide AI-generated responses.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Demo

You can test the chatbot locally:
1. Install Node.js 18+ and npm
2. Navigate to the `chatbot.ui` directory
3. Run `npm ci`
4. Run `npm run dev -- --host 0.0.0.0`
5. Open the local URL printed by Vite

## Quick Start Commands

Try asking the chatbot:
- "hello" - Get a greeting
- "help" - See available commands
- "token" - Learn about tokens
- "security" - Understand security features
- "pilot" - Ask about the 90-day pilot program
- "providers" - See the TradeX and TX services listed in the FAQ
- "feedback" - Find the Tradexpress Community Discussions page

## Keyboard Shortcuts

- **Enter** - Send message
- **Shift + Enter** - New line (if multi-line input enabled)

## Troubleshooting

**Messages not appearing?**
- Check browser console for errors (F12)
- Ensure JavaScript is enabled
- Clear browser cache and reload

**Styling looks wrong?**
- Ensure `styles.css` is in the same directory as `index.html`
- Check file permissions
- Try a different browser

## API Integration Example

Configure `VITE_CHAT_API_URL` as described in [Backend Integration](#backend-integration). The backend should accept `{ "message": "...", "messages": [{ "role": "user|assistant", "content": "..." }] }` and return `{ "reply": "..." }`.

## License

MIT - Part of TxBot Project

## Next Steps

- [x] Basic chatbot UI ✅
- [ ] Backend API integration
- [ ] User authentication
- [ ] Message persistence
- [ ] Admin dashboard
- [ ] Advanced AI responses
- [ ] Voice input/output
- [ ] Multi-language support

## Contributing

Want to improve the chatbot UI? Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Submit a pull request

## Support

For product feedback or feature ideas, use [Tradexpress Community Discussions](https://tradexpress.co/orgs/community/discussions). Choose the closest category and check for an existing discussion before starting a new one. For bugs in this chatbot UI, use this repository's issue tracker if enabled.

---

**TxBot** - Token Management AI Assistant | Powered by KENWELL-TX-ORG
