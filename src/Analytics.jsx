import { useEffect } from 'react';

const Analytics = () => {
  useEffect(() => {
    // If gtag is already present (we injected it in index.html), don't inject again.
    if (window.gtag) {
      // Optionally send an initial page_view
      window.gtag('config', 'G-TSQ6RSD1T4', { page_path: window.location.pathname });
      return;
    }

    // If the script tag isn't present, create it. If index.html already includes it, this is skipped.
    const existingScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
    if (!existingScript) {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-TSQ6RSD1T4';
      document.head.appendChild(script1);
    }

    // Initialize the dataLayer and gtag function if not present.
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function() { window.dataLayer.push(arguments); };

    // Configure with initial page path
    window.gtag('js', new Date());
    window.gtag('config', 'G-TSQ6RSD1T4', { page_path: window.location.pathname });

    // No cleanup because removing analytics scripts at unmount is usually undesirable.
  }, []);

  return null;
};

export default Analytics;

// Export tracking functions
export const trackEvent = (eventName, eventParams = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
    console.log('📊 Event:', eventName, eventParams);
  }
};

export const trackPageView = (pageName) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
    console.log('📊 Page view:', pageName);
  }
};