    'use client';

    import { useState, useEffect } from 'react';
    import { ArrowRightLeft, Search, Filter, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { fetchAPI } from '@/app/lib/api';

    export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // State untuk Filter Data
    const [filterType, setFilterType] = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchTransactions = async () => {
        try {
            const res = await fetchAPI('/transactions');
            setTransactions(res.data || []);
        } catch (error) {
            console.error('Galat menarik log arus kas:', error);
        } finally {
            setIsLoading(false);
        }
        };
        fetchTransactions();
    }, []);

    if (isLoading) {
        return (
        <div className="flex h-full items-center justify-center">
            <div className="w-10 h-10 border-2 border-[#2962FF]/20 border-t-[#2962FF] rounded-full animate-spin"></div>
        </div>
        );
    }

    // Logika Penyaringan (Filtering & Searching) di sisi Klien
    const filteredTransactions = transactions.filter(tx => {
        const matchType = filterType === 'ALL' || tx.category?.type === filterType;
        const matchSearch = (tx.description || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (tx.category?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
        return matchType && matchSearch;
    });

    return (
        <div className="max-w-5xl mx-auto w-full flex flex-col gap-8">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <ArrowRightLeft className="text-[#2962FF]" size={28} />
                Buku Besar Arus Kas
            </h1>
            <p className="text-[#94A3B8] text-sm mt-2 font-medium tracking-wide">
                Rekam jejak seluruh pergerakan aset Anda.
            </p>
            </div>

            {/* Action Bar (Search & Filter) */}
            <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Box */}
            <div className="relative flex-1 md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-[#94A3B8]" />
                </div>
                <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0A1428] border border-white/5 py-2.5 pl-10 pr-4 rounded-xl text-sm text-white focus:border-[#2962FF] outline-none transition-all placeholder:text-[#94A3B8]/50"
                placeholder="Cari transaksi..."
                />
            </div>
            
            {/* Filter Pills */}
            <div className="flex bg-[#0A1428] border border-white/5 p-1 rounded-xl">
                <button 
                onClick={() => setFilterType('ALL')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-all ${filterType === 'ALL' ? 'bg-white/10 text-white' : 'text-[#94A3B8] hover:text-white'}`}
                >
                Semua
                </button>
                <button 
                onClick={() => setFilterType('INCOME')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-all ${filterType === 'INCOME' ? 'bg-[#00E5FF]/20 text-[#00E5FF]' : 'text-[#94A3B8] hover:text-white'}`}
                >
                (+)
                </button>
                <button 
                onClick={() => setFilterType('EXPENSE')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-all ${filterType === 'EXPENSE' ? 'bg-[#536DFE]/20 text-[#536DFE]' : 'text-[#94A3B8] hover:text-white'}`}
                >
                (-)
                </button>
            </div>
            </div>
        </header>

        {/* FEED DATA SECTION */}
        <div className="bg-[#0A1428]/60 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden">
            {/* Subtle Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-[#2962FF]/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 flex flex-col gap-2">
            {filteredTransactions.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-[#94A3B8]">
                <Filter size={32} className="opacity-50 mb-3" />
                <p className="text-xs font-bold tracking-widest uppercase opacity-50">Tidak Ditemukan Rekam Jejak</p>
                </div>
            ) : (
                filteredTransactions.map((tx) => {
                const isIncome = tx.category?.type === 'INCOME';
                const txDate = new Date(tx.createdAt);
                
                return (
                    <div key={tx.id} className="group relative bg-[#040B16] border border-transparent hover:border-white/5 p-4 rounded-2xl transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    {/* Left Side: Icon & Details */}
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${isIncome ? 'bg-[#00E5FF]/10 border-[#00E5FF]/20 text-[#00E5FF]' : 'bg-[#536DFE]/10 border-[#536DFE]/20 text-[#536DFE]'}`}>
                        {isIncome ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
                        </div>
                        <div>
                        <h3 className="font-bold text-white text-base">{tx.category?.name || 'Uncategorized'}</h3>
                        <p className="text-sm text-[#94A3B8] mt-0.5">{tx.description || '-'}</p>
                        </div>
                    </div>

                    {/* Right Side: Amount & Date */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center pl-16 sm:pl-0">
                        <p className={`font-black font-mono text-lg tracking-tight ${isIncome ? 'text-[#00E5FF]' : 'text-white'}`}>
                        {isIncome ? '+' : '-'} Rp {tx.amount.toLocaleString('id-ID')}
                        </p>
                        <p className="text-xs text-[#94A3B8] font-bold tracking-widest uppercase mt-1">
                        {txDate.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                    
                    </div>
                );
                })
            )}
            </div>
        </div>
        </div>
    );
    }