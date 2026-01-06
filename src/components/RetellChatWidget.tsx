/**
 * Retell AI Chat Widget Component
 * Embeds the Retell chat widget on the frontend
 * Documentation: https://docs.retellai.com/deploy/chat-widget
 */

import * as React from 'react';

interface RetellChatWidgetProps {
  publicKey?: string;
  agentId?: string;
  agentVersion?: string;
  title?: string;
  logoUrl?: string;
  color?: string;
  botName?: string;
  popupMessage?: string;
  showAiPopup?: boolean;
  showAiPopupTime?: number;
  autoOpen?: boolean;
  dynamic?: Record<string, any>;
  recaptchaKey?: string;
  enabled?: boolean;
}

export default function RetellChatWidget({
  publicKey = process.env.EXPO_PUBLIC_RETELL_PUBLIC_KEY || process.env.NEXT_PUBLIC_RETELL_PUBLIC_KEY || process.env.REACT_APP_RETELL_PUBLIC_KEY || '',
  agentId = process.env.EXPO_PUBLIC_RETELL_AGENT_ID || process.env.NEXT_PUBLIC_RETELL_AGENT_ID || process.env.REACT_APP_RETELL_AGENT_ID || '',
  agentVersion,
  title = 'Chat with us!',
  logoUrl,
  color,
  botName,
  popupMessage,
  showAiPopup = false,
  showAiPopupTime = 0,
  autoOpen = false,
  dynamic,
  recaptchaKey = process.env.EXPO_PUBLIC_RETELL_RECAPTCHA_KEY || process.env.NEXT_PUBLIC_RETELL_RECAPTCHA_KEY || process.env.REACT_APP_RETELL_RECAPTCHA_KEY || '',
  enabled = true,
}: RetellChatWidgetProps) {
  React.useEffect(() => {
    // Only load on web and if enabled
    if (typeof window === 'undefined' || !enabled) {
      console.log('Retell Chat Widget: Not loading (not web or disabled)');
      return;
    }

    // Don't load on admin pages
    if (window.location.pathname.startsWith('/admin')) {
      console.log('Retell Chat Widget: Not loading on admin pages');
      return;
    }

    // Check if widget is already loaded
    if (document.getElementById('retell-widget')) {
      console.log('Retell Chat Widget: Already loaded');
      return;
    }

    // Validate required props
    if (!publicKey || !agentId) {
      console.warn('Retell Chat Widget: Missing required credentials');
      console.warn('  - publicKey:', publicKey ? 'Set' : 'MISSING');
      console.warn('  - agentId:', agentId ? 'Set' : 'MISSING');
      console.warn('  - Please add NEXT_PUBLIC_RETELL_PUBLIC_KEY and NEXT_PUBLIC_RETELL_AGENT_ID to your .env file');
      return;
    }

    console.log('Retell Chat Widget: Loading with credentials:', {
      publicKey: publicKey.substring(0, 10) + '...',
      agentId: agentId.substring(0, 10) + '...',
    });

    // Load reCAPTCHA if key is provided
    if (recaptchaKey) {
      const recaptchaScript = document.createElement('script');
      recaptchaScript.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaKey}`;
      recaptchaScript.async = true;
      recaptchaScript.defer = true;
      
      // Check if reCAPTCHA script already exists
      if (!document.querySelector(`script[src*="recaptcha/api.js"]`)) {
        document.head.appendChild(recaptchaScript);
      }
    }

    // Create and configure the Retell widget script
    const widgetScript = document.createElement('script');
    widgetScript.id = 'retell-widget';
    widgetScript.src = 'https://dashboard.retellai.com/retell-widget.js';
    widgetScript.type = 'module';
    widgetScript.setAttribute('data-public-key', publicKey);
    widgetScript.setAttribute('data-agent-id', agentId);

    // Add optional attributes
    if (agentVersion !== undefined) {
      widgetScript.setAttribute('data-agent-version', agentVersion);
    }
    if (title) {
      widgetScript.setAttribute('data-title', title);
    }
    if (logoUrl) {
      widgetScript.setAttribute('data-logo-url', logoUrl);
    }
    if (color) {
      widgetScript.setAttribute('data-color', color);
    }
    if (botName) {
      widgetScript.setAttribute('data-bot-name', botName);
    }
    if (popupMessage) {
      widgetScript.setAttribute('data-popup-message', popupMessage);
    }
    if (showAiPopup) {
      widgetScript.setAttribute('data-show-ai-popup', 'true');
    }
    if (showAiPopupTime !== undefined) {
      widgetScript.setAttribute('data-show-ai-popup-time', showAiPopupTime.toString());
    }
    if (autoOpen) {
      widgetScript.setAttribute('data-auto-open', 'true');
    }
    if (dynamic) {
      widgetScript.setAttribute('data-dynamic', JSON.stringify(dynamic));
    }
    if (recaptchaKey) {
      widgetScript.setAttribute('data-recaptcha-key', recaptchaKey);
    }

    // Handle script load events
    widgetScript.onload = () => {
      console.log('Retell Chat Widget: Script loaded successfully');
    };

    widgetScript.onerror = (error) => {
      console.error('Retell Chat Widget: Failed to load script', error);
    };

    // Append to head
    document.head.appendChild(widgetScript);
    console.log('Retell Chat Widget: Script tag added to document head');

    // Cleanup function
    return () => {
      const script = document.getElementById('retell-widget');
      if (script) {
        console.log('Retell Chat Widget: Removing script');
        script.remove();
      }
    };
  }, [
    publicKey,
    agentId,
    agentVersion,
    title,
    logoUrl,
    color,
    botName,
    popupMessage,
    showAiPopup,
    showAiPopupTime,
    autoOpen,
    dynamic,
    recaptchaKey,
    enabled,
  ]);

  return null; // This component doesn't render anything
}

