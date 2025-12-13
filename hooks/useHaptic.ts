'use client';

import { useCallback } from 'react';

/**
 * useHaptic - Provides a simple interface for device vibration
 * Currently supported primarily on Android via navigator.vibrate
 * iOS does not support the Web Vibration API, but we simulate the "feel" 
 * via visual micro-interactions (scaling) in the components themselves.
 */
export function useHaptic() {
    const trigger = useCallback(() => {
        if (typeof window !== 'undefined' && navigator.vibrate) {
            // Short, sharp vibration for UI feedback (10ms)
            navigator.vibrate(10);
        }
    }, []);

    return { trigger };
}
