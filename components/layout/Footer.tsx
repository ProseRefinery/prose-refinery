import Link from 'next/link';
import Image from 'next/image';
import { Mail, MessageSquare } from 'lucide-react';
import { COMPANY, NAV_ITEMS } from '@/lib/constants';

export function Footer() {
    return (
        <footer className="border-t border-slate-800/50 bg-slate-900/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Image
                                src="/logo.png"
                                alt="Prose Refinery"
                                width={32}
                                height={32}
                                className="w-8 h-8"
                            />
                            <span className="text-lg font-semibold text-white">
                                {COMPANY.name}
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm max-w-md mb-4">
                            Precision editorial services for speculative fiction authors.
                            We help you transform your manuscript into a publication-ready work.
                        </p>
                        <div className="flex items-center gap-4">
                            <a
                                href={`mailto:${COMPANY.email}`}
                                className="text-slate-400 hover:text-emerald-400 transition-colors"
                            >
                                <Mail size={20} />
                            </a>
                            <a
                                href={`https://wa.me/${COMPANY.whatsapp?.replace('+', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-emerald-400 transition-colors"
                            >
                                <MessageSquare size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Navigation</h4>
                        <ul className="space-y-2">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        href={item.href}
                                        className="text-slate-400 hover:text-emerald-400 text-sm transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li>{COMPANY.legalName}</li>
                            <li>Company No. {COMPANY.companyNumber}</li>
                            <li className="pt-2">
                                <a href="#" className="hover:text-emerald-400 transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-emerald-400 transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-800/50 text-center text-slate-500 text-sm">
                    © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
