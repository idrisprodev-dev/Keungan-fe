'use client';

import { useState, useEffect } from 'react';
import { Search, Calendar, ArrowDownRight, ArrowUpRight, Filter, MoreHorizontal, Loader2 } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  color?: string;
}

interface Transaction {
  id: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  date: string;
  note: string | null;
  category: Category;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function TransactionsPage() {
  // Secara otomatis mendeteksi bulan saat ini untuk Time Matrix
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth()); 
  const [searchQuery, setSearchQuery] = useState('');
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const res = await fetch(`${API_URL}/transactions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (res.ok) {
        setTransactions(data);
      }
    } catch (error) {
      console.error('Gagal memuat rekam jejak transaksi:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Eksekusi Filter Ganda: Berdasarkan Bulan & Kata Kunci
  const filteredTransactions = transactions.filter((trx) => {
    const trxMonth = new Date(trx.date).getMonth();
    const matchesMonth = trxMonth === activeMonth;
    
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      trx.category.name.toLowerCase().includes(searchLower) ||
      (trx.note && trx.note.toLowerCase().includes(searchLower));

    return matchesMonth && matchesSearch;
  });

  return (
    <div className="p-6 md:p-10 min-h-screen">
      
      {/* Header & Navigasi Temporal */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter mb-2">Buku Besar</h1>
          <p className="text-[#94A3B8] text-sm">Rekam jejak komputasi finansial Anda.</p>
        </div>

        {/* Time Matrix Selector */}
        <div className="w-full md:w-auto overflow-x-auto custom-scrollbar pb-2 md:pb-0">
          <div className="flex bg-[#0A1428]/80 backdrop-blur-md border border-white/5 p-1.5 rounded-2xl w-max">
            {MONTHS.map((month, index) => (
              <button
                key={month}
                onClick={() => setActiveMonth(index)}
                className={`px-5 py-2 text-xs font-bold rounded-xl transition-all duration-300 ${
                  activeMonth === index 
                    ? 'bg-[#2962FF] text-white shadow-[0_0_15px_rgba(41,98,255,0.4)]' 
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Control Panel (Pencarian & Filter) */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-[#94A3B8] group-focus-within:text-[#00E5FF] transition-colors" />
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0A1428]/60 backdrop-blur-md border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-[#00E5FF] transition-colors placeholder:text-white/20"
            placeholder="Dekripsi transaksi (cari nama kategori atau catatan)..."
          />
        </div>
        <button className="flex items-center justify-center gap-2 bg-[#0A1428]/60 backdrop-blur-md border border-white/5 hover:border-white/20 text-white px-6 py-4 rounded-2xl text-sm font-bold transition-all">
          <Filter size={18} className="text-[#00E5FF]" />
          Filter
        </button>
      </div>

      {/* Area Render Transaksi */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-[#00E5FF]" size={40} />
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="text-center py-20 bg-[#0A1428]/40 border border-white/5 rounded-3xl">
          <p className="text-[#94A3B8] text-sm">Tidak ada rekam jejak finansial di matriks waktu ini.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTransactions.map((trx) => {
            // Gunakan warna kategori dari database, fallback ke biru jika kosong
            const glowColor = trx.category.color || '#2962FF';
            
            return (
              <div 
                key={trx.id} 
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#040B16] border border-white/5 p-5 rounded-2xl hover:border-white/20 transition-all duration-300 relative overflow-hidden"
              >
                {/* Latar Belakang Glow */}
                <div 
                  className="absolute -left-10 w-24 h-full blur-[40px] opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none"
                  style={{ backgroundColor: glowColor }}
                ></div>

                <div className="flex items-center gap-5 relative z-10 w-full sm:w-auto mb-4 sm:mb-0">
                  {/* Ikon Indikator */}
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center border"
                    style={{ 
                      backgroundColor: `${glowColor}15`, 
                      borderColor: `${glowColor}40`, 
                      color: glowColor 
                    }}
                  >
                    {trx.type === 'INCOME' ? <ArrowDownRight size={24} /> : <ArrowUpRight size={24} />}
                  </div>

                  {/* Meta Data */}
                  <div>
                    <h3 className="text-white font-bold text-base mb-1">{trx.category.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
                      <span className="flex items-center gap-1">
                        <Calendar size={12}/> 
                        {new Date(trx.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      {trx.note && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-white/20"></span>
                          <span className="truncate max-w-[150px]">{trx.note}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Area Nominal & Aksi */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 relative z-10 pl-17 sm:pl-0">
                  <div className="text-right">
                    <p className={`font-black tracking-wider ${trx.type === 'INCOME' ? 'text-[#00E5FF]' : 'text-white'}`}>
                      {trx.type === 'INCOME' ? '+' : '-'} Rp {trx.amount.toLocaleString('id-ID')}
                    </p>
                    <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mt-1">Volume</p>
                  </div>
                  <button className="p-2 text-[#94A3B8] hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}