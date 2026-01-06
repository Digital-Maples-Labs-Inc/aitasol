# Retell AI Chat Widget Setup Guide

This guide will help you set up the Retell AI chat widget on your website.

## Overview

The Retell chat widget provides text-based conversations through a chat interface. It's automatically embedded on all frontend pages (excluding admin pages) when configured.

## Prerequisites

1. **Create a Chat Agent** in Retell AI
   - Go to your Retell AI dashboard
   - Create a chat agent following the [Create Chat Agent guide](https://docs.retellai.com/build/create-chat-agent)
   - Note your **Chat Agent ID**

2. **Get Your Credentials**
   - **Retell Public Key**: Found in your Retell dashboard under Settings → Public Keys
   - **Chat Agent ID**: The ID of your chat agent (format: `agent_xxxxxxxxxxxxxxxxxxx`)
   - **Google reCAPTCHA v3 Key** (Optional): For bot protection

## Configuration

### Option 1: Environment Variables (Recommended)

**For Expo apps (this project)**, add the following to your `.env` file:

```env
# Retell AI Chat Widget Configuration (Required)
EXPO_PUBLIC_RETELL_PUBLIC_KEY=key_xxxxxxxxxxxxxxxxxxxxx
EXPO_PUBLIC_RETELL_AGENT_ID=agent_xxxxxxxxxxxxxxxxxxx

# Optional: reCAPTCHA v3 for bot protection
EXPO_PUBLIC_RETELL_RECAPTCHA_KEY=YOUR_GOOGLE_RECAPTCHA_SITE_KEY

# Optional Configuration
EXPO_PUBLIC_RETELL_AGENT_VERSION=0
EXPO_PUBLIC_RETELL_TITLE=Chat with us!
EXPO_PUBLIC_RETELL_COLOR=#FFA07A
EXPO_PUBLIC_RETELL_BOT_NAME=AI Assistant
EXPO_PUBLIC_RETELL_POPUP_MESSAGE=Need help? Chat with us!
EXPO_PUBLIC_RETELL_SHOW_AI_POPUP=true
EXPO_PUBLIC_RETELL_SHOW_AI_POPUP_TIME=5
EXPO_PUBLIC_RETELL_AUTO_OPEN=false
```

**Note**: 
- For **Expo apps**, use `EXPO_PUBLIC_` prefix (this project)
- For **Next.js**, use `NEXT_PUBLIC_` prefix
- For **Create React App**, use `REACT_APP_` prefix

### Option 2: Direct Configuration in Code

You can also configure the widget directly in `App.tsx`:

```tsx
<RetellChatWidget
  publicKey="key_xxxxxxxxxxxxxxxxxxxxx"
  agentId="agent_xxxxxxxxxxxxxxxxxxx"
  title="Chat with us!"
  color="#FFA07A"
  botName="AI Assistant"
  popupMessage="Need help? Chat with us!"
  showAiPopup={true}
  showAiPopupTime={5}
  recaptchaKey="YOUR_GOOGLE_RECAPTCHA_SITE_KEY"
/>
```

## Widget Attributes

### Required
- `publicKey` - Your Retell public key
- `agentId` - Your chat agent ID

### Optional
- `agentVersion` - Agent version (if unset, uses latest version)
- `title` - Custom chat window title (default: "Chat with us!")
- `logoUrl` - URL of your logo image
- `color` - Hex color code for widget theme (e.g., "#FFA07A")
- `botName` - Bot name for popup messages
- `popupMessage` - Popup message before users open chat
- `showAiPopup` - Set to `true` to enable popup messages (default: false)
- `showAiPopupTime` - Seconds to delay before showing popup (default: 0)
- `autoOpen` - Set to `true` to auto-open chat widget on page load (default: false)
- `dynamic` - JSON object with dynamic variables for the chat agent
- `recaptchaKey` - Google reCAPTCHA v3 site key for bot protection
- `enabled` - Enable/disable the widget (default: true)

## reCAPTCHA Protection (Optional)

To enable bot protection with Google reCAPTCHA v3:

1. **Get a reCAPTCHA v3 Site Key**
   - Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
   - Create a new site (select reCAPTCHA v3)
   - Copy your Site Key

2. **Add to Environment Variables**
   ```env
   NEXT_PUBLIC_RETELL_RECAPTCHA_KEY=YOUR_GOOGLE_RECAPTCHA_SITE_KEY
   ```

3. **Enable in Retell Dashboard**
   - Go to Retell Dashboard → Settings → Public Keys
   - Enable reCAPTCHA protection for your public key

**Important**: Only reCAPTCHA v3 is supported.

## How It Works

1. The widget script is automatically loaded on all frontend pages
2. A floating button (robot icon) appears in the bottom right corner
3. Users click the button to open the chat interface
4. Chat sessions are automatically handled and persisted in localStorage
5. If reCAPTCHA is enabled, bot protection is automatically applied
6. The widget is **not loaded on admin pages** (`/admin/*`)

## Testing

1. Start your development server:
   ```bash
   npm start
   ```

2. Navigate to any frontend page (e.g., `/`, `/about`, `/contact`)

3. Look for the floating chat button in the bottom right corner

4. Click the button to open the chat interface

5. Start a conversation with your agent

## Troubleshooting

### Widget Not Appearing

1. **Check Console for Errors**
   - Open browser DevTools (F12)
   - Check the Console tab for any errors
   - Look for warnings about missing credentials

2. **Verify Credentials**
   - Ensure `publicKey` and `agentId` are set correctly
   - Check that they're not empty strings

3. **Check Environment Variables**
   - Verify `.env` file exists and has correct values
   - Restart your development server after changing `.env`
   - For production, ensure environment variables are set in your hosting platform

4. **Verify Agent Status**
   - Check in Retell dashboard that your chat agent is active
   - Ensure the agent ID matches

### reCAPTCHA Not Working

1. **Verify reCAPTCHA Key**
   - Ensure you're using reCAPTCHA v3 (not v2)
   - Check that the key is correct in your `.env` file

2. **Check Retell Settings**
   - Ensure reCAPTCHA protection is enabled for your public key in Retell dashboard

3. **Check Console**
   - Look for reCAPTCHA-related errors in browser console

## Example Configuration

Here's a complete example with all optional features:

```tsx
<RetellChatWidget
  publicKey="key_xxxxxxxxxxxxxxxxxxxxx"
  agentId="agent_xxxxxxxxxxxxxxxxxxx"
  agentVersion="0"
  title="Chat with AitaSol"
  logoUrl="https://yoursite.com/logo.png"
  color="#007AFF"
  botName="AitaSol Assistant"
  popupMessage="Have questions about studying in Canada? Chat with us!"
  showAiPopup={true}
  showAiPopupTime={5}
  autoOpen={false}
  dynamic={{
    website: "AitaSol Education",
    service: "Education Consultancy"
  }}
  recaptchaKey="YOUR_GOOGLE_RECAPTCHA_SITE_KEY"
  enabled={true}
/>
```

## Documentation

For more details, see the [Retell AI Chat Widget Documentation](https://docs.retellai.com/deploy/chat-widget).

## Support

If you encounter issues:
1. Check the [Retell AI Documentation](https://docs.retellai.com/)
2. Review browser console for errors
3. Verify all credentials are correct
4. Ensure your chat agent is properly configured in Retell dashboard

