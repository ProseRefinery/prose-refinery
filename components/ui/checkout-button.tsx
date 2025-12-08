'use client';

import { useState } from 'react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CheckoutButtonProps {
    priceId: string;
    children: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary' | 'ghost';
}

export function CheckoutButton({ priceId, children, className, variant = 'primary' }: CheckoutButtonProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    priceId,
                    // valid absolute urls for success/cancel could be passed here if needed,
                    // but defaults in API route are relative which works if on same domain context
                }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('Checkout error:', data.error);
                // Optionally show toast or error message
                setLoading(false);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            setLoading(false);
        }
    };

    return (
        <MagneticButton
            onClick={handleCheckout}
            variant={variant}
            className={className}
            disabled={loading}
        >
            {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
            {children}
            {!loading && <ArrowRight size={18} className="ml-2" />}
        </MagneticButton>
    );
}
