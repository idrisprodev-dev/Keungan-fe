'use client';

import { useState, useEffect } from 'react';
import { ArrowDownRight, ArrowUpRight, Wallet, Activity, Loader2, Pencil, Trash2 } from 'lucide-react';
import TransactionModal from '@/components/features/TransactionModal';
import api from '@/app/lib/api';

interface Transaction {
  id: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  date: string;
  note: string | null;
  category: { name: string };
}

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totals, setTotals] = useState({ balance: 0, income: 0, expense: 0 });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<any | null>(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // 1. Menggunakan Axios (api.ts). Token diurus otomatis dari Cookies!
      const res = await api.get('/transactions');
      
      const parsedData = res.data;

      // 2. Smart Array Detection
      let transactionsArray: Transaction[] = [];
      if (Array.isArray(parsedData)) {
        transactionsArray = parsedData;
      } else if (parsedData && Array.isArray(parsedData.data)) {
        transactionsArray = parsedData.data;
      } else if (parsedData && Array.isArray(parsedData.transactions)) {
        transactionsArray = parsedData.transactions;
      } else {
        transactionsArray = []; 
      }

      setTransactions(transactionsArray);

      // 3. Kalkulasi Berjalan Normal
      let income = 0;
      let expense = 0;

      transactionsArray.forEach((trx) => {
        if (trx.type === 'INCOME') income += Number(trx.amount);
        if (trx.type === 'EXPENSE') expense += Number(trx.amount);
      });

      setTotals({
        income,
        expense,
        balance: income - expense
      });
    } catch (error) {
      console.error('API Error:', error);
      // api.ts akan otomatis menendang user ke /login jika token expired (Error 401)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // Event listener opsional, tapi onSuccess pada modal jauh lebih reliable
    window.addEventListener('transaction_updated', fetchDashboardData);
    return () => window.removeEventListener('transaction_updated', fetchDashboardData);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) return;
    
    try {
      // Menggunakan Axios untuk Delete, tidak perlu set Header manual
      await api.delete(`/transactions/${id}`);
      fetchDashboardData(); // Refetch data setelah sukses dihapus
    } catch (error) {
      console.error(error);
      alert('Galat sistem saat menghapus. Pastikan Backend menyala.');
    }
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#040B16] text-white font-sans overflow-y-auto relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay z-0 pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <p className="text-[10px] font-bold text-[#94A3B8] tracking-widest uppercase mb-1">STATUS ENKRIPSI AKTIF</p>
            <h1 className="text-3xl font-black tracking-tighter">Dashboard Utama</h1>
          </div>
          <button 
            onClick={() => { setEditingTransaction(null); setIsModalOpen(true); }}
            className="bg-gradient-to-r from-[#2962FF] to-[#00E5FF] hover:opacity-90 px-6 py-3 rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(0,229,255,0.2)] transition-all"
          >
            + Catat Transaksi
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="mb-8">
              <p className="flex items-center gap-2 text-xs font-bold text-[#00E5FF] tracking-widest uppercase mb-2">
                <Wallet size={14} className="text-[#00E5FF]" /> TOTAL ASET LIKUID
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl text-[#94A3B8] font-bold">Rp</span>
                <span className="text-5xl md:text-6xl font-black tracking-tighter break-all">
                  {isLoading ? '...' : totals.balance.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0A1428]/80 backdrop-blur-md border border-white/5 rounded-3xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-[10px] font-bold text-[#94A3B8] tracking-widest uppercase">PEMASUKAN</p>
                  <div className="w-8 h-8 rounded-full bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF]">
                    <ArrowDownRight size={16} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-[#00E5FF]">Rp {isLoading ? '0' : totals.income.toLocaleString('id-ID')}</p>
              </div>

              <div className="bg-[#0A1428]/80 backdrop-blur-md border border-white/5 rounded-3xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-[10px] font-bold text-[#94A3B8] tracking-widest uppercase">PENGELUARAN</p>
                  <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white">Rp {isLoading ? '0' : totals.expense.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0A1428]/80 backdrop-blur-md border border-white/5 rounded-3xl p-6 flex flex-col h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <p className="flex items-center gap-2 text-[10px] font-bold text-[#00E5FF] tracking-widest uppercase">
                <Activity size={14} /> LOG AKTIVITAS
              </p>
              <span className="text-[10px] font-bold text-[#94A3B8] tracking-widest uppercase">TERKINI</span>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-1">
              {isLoading ? (
                <div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#00E5FF]" size={30} /></div>
              ) : transactions.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-[#94A3B8] opacity-50">
                  <Activity size={32} className="mb-2" />
                  <p className="text-xs font-bold tracking-widest uppercase">LOG KOSONG</p>
                </div>
              ) : (
                transactions.slice(0, 10).map((trx) => (
                  <div key={trx.id} className="group flex justify-between items-center p-4 hover:bg-white/5 rounded-2xl transition-colors border-b border-white/5 last:border-0 relative">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${trx.type === 'INCOME' ? 'bg-[#00E5FF]/10 text-[#00E5FF]' : 'bg-white/5 text-[#94A3B8]'}`}>
                        {trx.type === 'INCOME' ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
                      </div>
                      <div className="truncate">
                        <p className="font-bold text-sm truncate">{trx.category?.name || 'Uncategorized'}</p>
                        <p className="text-[10px] text-[#94A3B8]">{new Date(trx.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 shrink-0 pl-2">
                      <p className={`font-bold text-sm ${trx.type === 'INCOME' ? 'text-[#00E5FF]' : 'text-white'}`}>
                        {trx.type === 'INCOME' ? '+' : '-'} Rp {trx.amount.toLocaleString('id-ID')}
                      </p>
                      <div className="hidden group-hover:flex items-center gap-2">
                        <button onClick={() => { setEditingTransaction(trx); setIsModalOpen(true); }} className="p-2 text-[#94A3B8] hover:text-[#00E5FF] bg-white/5 rounded-lg transition-colors"><Pencil size={14} /></button>
                        <button onClick={() => handleDelete(trx.id)} className="p-2 text-[#94A3B8] hover:text-red-400 bg-white/5 rounded-lg transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingTransaction(null); }} 
        initialData={editingTransaction}
        onSuccess={fetchDashboardData} // PENAMBAHAN KRUSIAL: Render ulang dashboard jika modal sukses simpan data
      />
    </div>
  );
}