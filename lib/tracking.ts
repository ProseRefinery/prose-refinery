
// Declare global augmentations for window
declare global {
    interface Window {
        fbq?: (action: string, eventName: string, params?: Record<string, unknown>) => void;
        gtag?: (action: string, eventName: string, params?: Record<string, unknown>) => void;
    }
}

export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
    // Meta Pixel
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', eventName, params);
    }

    // GA4
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, params);
    }
};
