    import TransactionModal from '@/components/features/TransactionModal';
import Sidebar from '@/components/layout/Navigation';
    import React from 'react';
    import { Suspense } from 'react';

    export default function DashboardLayout({
    children,
    }: {
    children: React.ReactNode;
    }) {
    return (
        <div className="flex h-screen bg-[#090A0F] overflow-hidden text-slate-200 font-sans selection:bg-[#00E676]/30">
        
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto md:pl-2 md:pt-2">
            <div className="min-h-full bg-[#121620] md:rounded-tl-[2.5rem] border-t border-l border-white/5 md:shadow-[-10px_-10px_30px_rgba(0,0,0,0.5)] pb-24 md:pb-8 relative">
            {children}
            </div>
        </main>
        
        {/* 
            Suspense diwajibkan oleh Next.js untuk komponen 
            yang menggunakan hook parameter URL (useSearchParams) 
        */}
        <Suspense fallback={null}>
            <TransactionModal />
        </Suspense>
        </div>
    );
    }