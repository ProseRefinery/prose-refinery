export const trackEvent = (eventName: string, params?: Record<string, any>) => {
    // Meta Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', eventName, params);
    }

    // GA4
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, params);
    }
};
