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

🎯 **Quick Start**
- No build tools required
- Pure HTML/CSS/JavaScript
- Easy to customize

## Files

- `index.html` - Main chatbot interface
- `styles.css` - Styling and animations
- `script.js` - Chat logic and message handling
- `README.md` - This file

## Usage

1. Open `index.html` in a web browser
2. Type a message in the input field
3. Press Enter or click Send
4. Bot responds based on keyword matching

## Customize

### Change Colors
Edit the gradient in `styles.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Add Bot Responses
Edit `botResponses` in `script.js`:
```javascript
const botResponses = {
    'your-keyword': 'Your custom response',
    // ...
};
```

### Change Bot Name
Update `<title>` and `.chat-header h1` in `index.html`

## Integration

To connect to a real backend:

1. Replace the `getBotResponse()` function in `script.js` with an API call:
```javascript
async function getBotResponse(userMessage) {
    const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: userMessage })
    });
    const data = await response.json();
    return data.reply;
}
```

2. Update the chat form handler to use `await`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Demo

You can test the chatbot locally:
1. Clone or download the repository
2. Navigate to the `chatbot.ui` directory
3. Open `index.html` in your browser
4. Start chatting!

## Quick Start Commands

Try asking the chatbot:
- "hello" - Get a greeting
- "help" - See available commands
- "token" - Learn about tokens
- "security" - Understand security features
- "pilot" - Ask about the 90-day pilot program

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

Here's how to connect to a Python backend (like Kenwell.py):

```javascript
async function getBotResponse(userMessage) {
    try {
        const response = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage })
        });
        
        if (!response.ok) throw new Error('Network response failed');
        
        const data = await response.json();
        return data.reply || 'No response received';
    } catch (error) {
        console.error('Error:', error);
        return 'Sorry, I encountered an error. Please try again.';
    }
}
```

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

For questions or issues, please open a GitHub issue in the main repository.

---

**TxBot** - Token Management AI Assistant | Powered by KENWELL-TX-ORG
