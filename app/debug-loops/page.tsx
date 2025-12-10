'use client';

import { useState } from 'react';

export default function DebugLoopsPage() {
    const [email, setEmail] = useState('');
    const [templateId, setTemplateId] = useState('cmizisawj06lk2c0i7i6yq6pu'); // Default to diagnostic
    const [logs, setLogs] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const addLog = (msg: string, data?: any) => {
        const timestamp = new Date().toLocaleTimeString();
        const content = data ? `${msg}\n${JSON.stringify(data, null, 2)}` : msg;
        setLogs(prev => [`[${timestamp}] ${content}`, ...prev]);
    };

    const runTest = async (action: string) => {
        if (!email) {
            alert('Please enter an email');
            return;
        }

        setLoading(true);
        addLog(`Running ${action}...`);

        try {
            const res = await fetch('/api/debug-loops', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, email, templateId })
            });

            const data = await res.json();

            if (data.success) {
                addLog('✅ Success', data.result);
            } else {
                addLog('❌ Failed', data.error);
            }
        } catch (err: any) {
            addLog('❌ Network Error', err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 p-8 font-mono">
            <div className="max-w-3xl mx-auto space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Loops.so Integration Debugger</h1>
                    <p className="text-slate-400">Use this page to verified your Loops API connection.</p>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg space-y-4 border border-slate-700">
                    <div>
                        <label className="block text-sm font-medium mb-1">Test Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white placeholder-slate-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Template ID (for email test)</label>
                        <input
                            type="text"
                            value={templateId}
                            onChange={(e) => setTemplateId(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white"
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={() => runTest('test-contact')}
                            disabled={loading}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded disabled:opacity-50"
                        >
                            1. Test Create Contact
                        </button>
                        <button
                            onClick={() => runTest('test-email')}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
                        >
                            2. Test Send Email
                        </button>
                        <button
                            onClick={() => runTest('test-event')}
                            disabled={loading}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded disabled:opacity-50"
                        >
                            3. Test Trigger Event
                        </button>
                    </div>
                </div>

                <div className="bg-black p-4 rounded-lg border border-slate-800 h-96 overflow-y-auto">
                    <div className="flex justify-between items-center mb-2 sticky top-0 bg-black pb-2 border-b border-slate-800">
                        <span className="text-xs font-bold uppercase text-slate-500">Console Output</span>
                        <button onClick={() => setLogs([])} className="text-xs text-red-400 hover:text-red-300">Clear</button>
                    </div>
                    {logs.length === 0 && <p className="text-slate-600 italic">Ready to test...</p>}
                    {logs.map((log, i) => (
                        <pre key={i} className="text-xs whitespace-pre-wrap mb-4 font-mono text-emerald-400 border-b border-slate-800/50 pb-2">
                            {log}
                        </pre>
                    ))}
                </div>
            </div>
        </div>
    );
}
