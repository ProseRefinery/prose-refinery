import { NextResponse } from 'next/server';

const LOOPS_API_KEY = process.env.LOOPS_API_KEY;
const LOOPS_API_URL = 'https://app.loops.so/api/v1';

if (!LOOPS_API_KEY) {
    console.warn('Missing LOOPS_API_KEY environment variable');
}

interface ContactData {
    email: string;
    firstName?: string;
    source?: string;
    recommendedTier?: string;
    manuscriptTitle?: string;
    genre?: string;
    quizCompleted?: boolean;
    [key: string]: any;
}

interface TransactionalData {
    transactionalId: string;
    email: string;
    dataVariables?: Record<string, any>;
}

// Add or update a contact
export async function upsertContact(data: ContactData) {
    if (!LOOPS_API_KEY) return { error: 'Missing API Key' };

    try {
        const response = await fetch(`${LOOPS_API_URL}/contacts/create`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${LOOPS_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                firstName: data.firstName || '',
                source: data.source || 'website',
                recommendedTier: data.recommendedTier || '',
                manuscriptTitle: data.manuscriptTitle || '',
                genre: data.genre || '',
                quizCompleted: data.quizCompleted || false,
                // Spread only properties that aren't already matched above
                ...Object.fromEntries(
                    Object.entries(data).filter(([key]) =>
                        !['email', 'firstName', 'source', 'recommendedTier', 'manuscriptTitle', 'genre', 'quizCompleted'].includes(key)
                    )
                )
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Loops contact error:', error);
            // Don't throw, just log, to prevent blocking the flow if Loops is down
            return { error: error.message };
        }

        return await response.json();
    } catch (e) {
        console.error('Loops connection error:', e);
        return { error: 'Connection failed' };
    }
}

// Send transactional email
export async function sendTransactional(data: TransactionalData) {
    if (!LOOPS_API_KEY) return { error: 'Missing API Key' };

    try {
        const response = await fetch(`${LOOPS_API_URL}/transactional`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${LOOPS_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                transactionalId: data.transactionalId,
                email: data.email,
                dataVariables: data.dataVariables || {},
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Loops email error:', error);
            return { error: error.message };
        }

        return await response.json();
    } catch (e) {
        console.error('Loops connection error:', e);
        return { error: 'Connection failed' };
    }
}

// Trigger an event (for automations)
export async function triggerEvent(email: string, eventName: string) {
    if (!LOOPS_API_KEY) return { error: 'Missing API Key' };

    try {
        const response = await fetch(`${LOOPS_API_URL}/events/send`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${LOOPS_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                eventName,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Loops event error:', error);
            return { error: error.message };
        }

        return await response.json();
    } catch (e) {
        console.error('Loops connection error:', e);
        return { error: 'Connection failed' };
    }
}
