'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Activity, Zap } from 'lucide-react';
import { fetchAPI } from '@/app/lib/api';

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [profileRes, txRes] = await Promise.all([
          fetchAPI('/auth/me').catch(() => null),
          fetchAPI('/transactions')
        ]);
        
        if (profileRes) setUserProfile(profileRes);
        setTransactions(txRes.data || []);
      } catch (error) {
        console.error('Galat sinkronisasi:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const totalIncome = transactions
    .filter(tx => tx.category?.type === 'INCOME')
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  const totalExpense = transactions
    .filter(tx => tx.category?.type === 'EXPENSE')
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  const currentBalance = totalIncome - totalExpense;

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#00E5FF]/20 border-t-[#00E5FF] rounded-full animate-spin"></div>
          <p className="text-xs text-[#94A3B8] font-bold tracking-widest uppercase animate-pulse">Menyelaraskan Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0A1428] via-[#040B16] to-[#050A14] p-6 md:p-8">
      <div className="max-w-[1400px] mx-auto w-full flex flex-col xl:flex-row gap-8 xl:gap-12">
        
        {/* 
          ZONA KIRI: THE HUB (60%) 
          Fokus pada tipografi raksasa dan visualisasi arus kas.
        */}
        <div className="flex-1 flex flex-col gap-12 pt-4">
        
        {/* Header Personal */}
        <header className="flex items-center justify-between">
          <div>
            <p className="text-[#94A3B8] text-sm font-semibold tracking-widest uppercase mb-1">Status Enkripsi Aktif</p>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Selamat datang, {userProfile?.name?.split(' ')[0] || 'Komandan'}
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-[#00E5FF]/10 border border-[#00E5FF]/20 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 bg-[#00E5FF] rounded-full animate-pulse shadow-[0_0_10px_#00E5FF]"></div>
            <span className="text-[#00E5FF] text-xs font-bold tracking-wider">SINKRON</span>
          </div>
        </header>

        {/* Inline Statistic: Massive Balance Display */}
        <section className="relative group">
          {/* Subtle Glow di belakang angka */}
          <div className="absolute -inset-4 bg-[#2962FF]/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          
          <h2 className="text-[#94A3B8] text-sm font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
            <Zap size={16} className="text-[#00E5FF]" /> Total Aset Likuid
          </h2>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-4xl font-semibold text-[#94A3B8]">Rp</span>
            <span className={`text-6xl md:text-8xl font-black tracking-tighter ${currentBalance >= 0 ? 'bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-[#94A3B8] drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'text-[#FF3B30]'}`}>
              {currentBalance.toLocaleString('id-ID')}
            </span>
          </div>
        </section>

        {/* Supporting Metrics (Glassmorphic Panels) */}
        <section className="grid grid-cols-2 gap-4 md:gap-6 mt-4">
          {/* Pemasukan */}
          <div className="relative overflow-hidden bg-gradient-to-b from-[#0A1428] to-[#040B16] border border-white/5 p-6 rounded-3xl group transition-all duration-300 hover:border-[#00E5FF]/30">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-[#94A3B8] tracking-widest uppercase">Pemasukan</h3>
              <div className="w-8 h-8 rounded-full bg-[#00E5FF]/10 flex items-center justify-center">
                <ArrowDownRight size={16} className="text-[#00E5FF]" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Rp {totalIncome.toLocaleString('id-ID')}
            </p>
          </div>

          {/* Pengeluaran */}
          <div className="relative overflow-hidden bg-gradient-to-b from-[#0A1428] to-[#040B16] border border-white/5 p-6 rounded-3xl group transition-all duration-300 hover:border-[#536DFE]/30">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#536DFE]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-[#94A3B8] tracking-widest uppercase">Pengeluaran</h3>
              <div className="w-8 h-8 rounded-full bg-[#536DFE]/10 flex items-center justify-center">
                <ArrowUpRight size={16} className="text-[#536DFE]" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Rp {totalExpense.toLocaleString('id-ID')}
            </p>
          </div>
        </section>

      </div>

      {/* 
        ZONA KANAN: THE FEED (40%) 
        Panel vertikal melayang untuk aktivitas seketika.
      */}
      <aside className="xl:w-[400px] 2xl:w-[450px] flex flex-col gap-6">
        
        {/* Aktivitas Terkini */}
        <div className="flex-1 bg-[#0A1428]/60 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 md:p-8 flex flex-col relative overflow-hidden">
          {/* Subtle Ambient Light di dalam Feed */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#536DFE]/5 blur-3xl rounded-full pointer-events-none"></div>

          <div className="flex items-center justify-between mb-8 relative z-10">
            <h2 className="text-sm font-bold text-white tracking-widest uppercase flex items-center gap-2">
              <Activity size={16} className="text-[#536DFE]" /> Log Aktivitas
            </h2>
            <button className="text-xs font-bold text-[#00E5FF] hover:text-white transition-colors tracking-widest uppercase">
              Semua
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 relative z-10 space-y-2">
            {transactions.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-[#94A3B8] space-y-2 opacity-50">
                <Activity size={32} />
                <p className="text-xs font-bold tracking-widest uppercase">Log Kosong</p>
              </div>
            ) : (
              transactions.slice(0, 8).map((tx) => {
                const isIncome = tx.category?.type === 'INCOME';
                return (
                  <div key={tx.id} className="group relative p-4 rounded-2xl hover:bg-white/[0.02] transition-colors flex items-center justify-between cursor-default">
                    {/* Hover Indicator Bar */}
                    <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-[#2962FF] rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${isIncome ? 'bg-[#00E5FF]/10 border-[#00E5FF]/20 text-[#00E5FF]' : 'bg-[#536DFE]/10 border-[#536DFE]/20 text-[#536DFE]'}`}>
                        {isIncome ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
                      </div>
                      <div>
                        <p className="font-bold text-[#F8FAFC] text-sm">{tx.category?.name || 'Uncategorized'}</p>
                        <p className="text-xs text-[#94A3B8] mt-0.5 truncate max-w-[120px]">{tx.description || '-'}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`font-black font-mono text-sm tracking-tight ${isIncome ? 'text-[#00E5FF]' : 'text-white'}`}>
                        {isIncome ? '+' : '-'} {tx.amount.toLocaleString('id-ID')}
                      </p>
                      <p className="text-[10px] text-[#94A3B8] mt-1 font-bold tracking-wider uppercase">
                        {new Date(tx.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </aside>

      </div>
    </div>
  );
}