'use client';

import { useCallback } from 'react';

/**
 * useHaptic - Provides a simple interface for device vibration
 * Currently supported primarily on Android via navigator.vibrate
 * iOS does not support the Web Vibration API, but we simulate the "feel" 
 * via visual micro-interactions (scaling) in the components themselves.
 */
/**
 * useHaptic - Provides a rich interface for device vibration
 * Supports multiple feedback patterns to mimic native OS feel.
 */
export function useHaptic() {
    const trigger = useCallback((type: 'light' | 'medium' | 'heavy' | 'success' | 'error' = 'medium') => {
        if (typeof window === 'undefined' || !navigator.vibrate) return;

        switch (type) {
            case 'light':
                navigator.vibrate(5); // Subtle tick (Nav links, selections)
                break;
            case 'medium':
                navigator.vibrate(10); // Standard tap (Buttons)
                break;
            case 'heavy':
                navigator.vibrate(15); // Weighted impact (Primary CTAs)
                break;
            case 'success':
                navigator.vibrate([10, 30, 10]); // Double tick
                break;
            case 'error':
                navigator.vibrate([15, 50, 15, 50, 15]); // Shudder
                break;
        }
    }, []);

    return { trigger };
}
