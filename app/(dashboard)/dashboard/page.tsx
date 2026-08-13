'use client';

import { useState, useEffect } from 'react';
import { Activity, ArrowDownRight, ArrowUpRight, Zap } from 'lucide-react';

interface Transaction {
  id: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  date: string;
  categoryName: string;
}

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totals, setTotals] = useState({ balance: 0, income: 0, expense: 0 });

  // Fungsi untuk menarik data dari Spreadsheet
  const loadDashboardData = () => {
    // TODO: Ganti ini dengan fetch API Google Sheets Anda (GET /api/sheets/transactions)
    const storedData = JSON.parse(localStorage.getItem('mock_sheet_transactions') || '[]');
    
    setTransactions(storedData);

    let income = 0;
    let expense = 0;

    storedData.forEach((trx: Transaction) => {
      if (trx.type === 'INCOME') income += trx.amount;
      if (trx.type === 'EXPENSE') expense += trx.amount;
    });

    setTotals({
      income,
      expense,
      balance: income - expense
    });
  };

  useEffect(() => {
    // Muat data saat pertama kali halaman dibuka
    loadDashboardData();

    // Dengarkan sinyal dari TransactionModal (agar auto-update saat nambah data)
    window.addEventListener('transaction_updated', loadDashboardData);
    
    return () => {
      window.removeEventListener('transaction_updated', loadDashboardData);
    };
  }, []);

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 md:p-8 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-12 gap-4">
        <div>
          <p className="text-xs font-bold text-[#94A3B8] tracking-widest uppercase mb-2">Status Enkripsi Aktif</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tighter">Selamat datang, Komandan</h1>
        </div>
        <button className="flex items-center gap-2 bg-[#00E5FF]/10 text-[#00E5FF] px-4 py-2 rounded-full text-xs font-bold border border-[#00E5FF]/30 hover:bg-[#00E5FF]/20 transition-colors whitespace-nowrap">
          <div className="w-2 h-2 bg-[#00E5FF] rounded-full animate-pulse"></div>
          SINKRON
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Kolom Kiri (Aset & Ringkasan) */}
        <div className="xl:col-span-2 space-y-8">
          {/* Total Aset */}
          <div className="mb-4">
            <p className="flex items-center gap-2 text-xs font-bold text-[#00E5FF] tracking-widest uppercase mb-3">
              <Zap size={16} /> Total Aset Likuid
            </p>
            <div className="flex items-baseline gap-3">
              <span className="text-xl sm:text-2xl text-[#94A3B8] font-bold">Rp</span>
              <span className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter">
                {totals.balance.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Kartu Pemasukan & Pengeluaran */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-gradient-to-b from-[#0A1428] to-[#040B16] backdrop-blur-md border border-white/5 rounded-2xl md:rounded-3xl p-6 hover:border-[#00E5FF]/20 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <p className="text-xs font-bold text-[#94A3B8] tracking-widest uppercase">Pemasukan</p>
                <div className="w-8 h-8 rounded-xl bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF]">
                  <ArrowDownRight size={16} />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white">Rp {totals.income.toLocaleString('id-ID')}</p>
            </div>

            <div className="bg-gradient-to-b from-[#0A1428] to-[#040B16] backdrop-blur-md border border-white/5 rounded-2xl md:rounded-3xl p-6 hover:border-[#536DFE]/20 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <p className="text-xs font-bold text-[#94A3B8] tracking-widest uppercase">Pengeluaran</p>
                <div className="w-8 h-8 rounded-xl bg-[#536DFE]/10 flex items-center justify-center text-[#536DFE]">
                  <ArrowUpRight size={16} />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white">Rp {totals.expense.toLocaleString('id-ID')}</p>
            </div>
          </div>
        </div>

        {/* Kolom Kanan (Log Aktivitas) */}
        <div className="bg-gradient-to-b from-[#0A1428] to-[#040B16] backdrop-blur-md border border-white/5 rounded-2xl md:rounded-3xl p-6 flex flex-col min-h-[400px] md:min-h-[500px]">
          <div className="flex justify-between items-center mb-6">
            <p className="flex items-center gap-2 text-xs font-bold text-[#00E5FF] tracking-widest uppercase">
              <Activity size={16} /> Log Aktivitas
            </p>
            <span className="text-xs font-bold text-[#94A3B8] tracking-widest uppercase cursor-pointer hover:text-[#00E5FF] transition-colors">Semua</span>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-3 space-y-3">
            {transactions.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-[#94A3B8] opacity-50">
                <Activity size={40} className="mb-3" />
                <p className="text-xs font-bold tracking-widest uppercase">Log Kosong</p>
              </div>
            ) : (
              transactions.slice(0, 10).map((trx) => (
                <div key={trx.id} className="flex justify-between items-center pb-4 border-b border-white/5 last:border-0 hover:bg-white/5 rounded-lg p-2 transition-colors">
                  <div>
                    <p className="font-bold text-sm text-white">{trx.categoryName}</p>
                    <p className="text-xs text-[#94A3B8] mt-1">{trx.date}</p>
                  </div>
                  <p className={`font-bold text-sm whitespace-nowrap ml-4 ${trx.type === 'INCOME' ? 'text-[#00E5FF]' : 'text-white'}`}>
                    {trx.type === 'INCOME' ? '+' : '-'} Rp {trx.amount.toLocaleString('id-ID')}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}