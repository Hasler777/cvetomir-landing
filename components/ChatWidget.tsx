"use client";

import Script from "next/script";

const CHAT_ID = "2bdc09d0-95ae-492c-b4d0-4844fc65a966";

const INJECT_STYLES = `
  [data-id=chat-host] {
    bottom: 8px;
    right: 24px;
    align-items: end;
  }`;

declare global {
  interface Window {
    appChatClient?: (
      config: { chatId: string },
      options: { host: HTMLElement | null; injectStyles?: string }
    ) => void;
  }
}

export default function ChatWidget() {
  return (
    <>
      <div id="chat-client" style={{ zIndex: 1000000 }} />
      <Script
        src="https://twin24.ai/app/chat-client/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.appChatClient?.(
            { chatId: CHAT_ID },
            {
              host: document.getElementById("chat-client"),
              injectStyles: INJECT_STYLES,
            }
          );
        }}
      />
    </>
  );
}
