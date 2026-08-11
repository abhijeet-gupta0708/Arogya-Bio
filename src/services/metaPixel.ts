// src/services/metaPixel.ts

const META_PIXEL_ID = '2176887713123874';

type MetaFbq = {
  (...args: any[]): void;
  push: (...args: any[]) => void;
  loaded: boolean;
  version: string;
  queue: any[];
};

declare global {
  interface Window {
    fbq?: MetaFbq;
    _fbq?: MetaFbq;
  }
}

export const initMetaPixel = (): void => {
  if (typeof window === 'undefined') return;

  // Prevent initializing the Pixel more than once
  if (window.fbq?.loaded) return;

  const fbq: MetaFbq = (...args: any[]): void => {
    fbq.queue.push(args);
  };

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];

  window.fbq = fbq;
  window._fbq = fbq;

  // Load Meta Pixel library
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';

  const firstScript = document.getElementsByTagName('script')[0];

  if (firstScript?.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
    document.head.appendChild(script);
  }

  // Initialize Meta Pixel
  window.fbq('init', META_PIXEL_ID);

  // Track page visit
  window.fbq('track', 'PageView');
};

// Track custom Meta Pixel events
export const trackMetaEvent = (
  eventName: string,
  parameters?: Record<string, any>
): void => {
  if (typeof window === 'undefined' || !window.fbq) return;

  if (parameters) {
    window.fbq('track', eventName, parameters);
  } else {
    window.fbq('track', eventName);
  }
};