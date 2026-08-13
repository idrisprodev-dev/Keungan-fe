'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { X, ArrowRight, Wallet, Calendar, FileText, Loader2 } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface TransactionModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function TransactionModal({ isOpen: propIsOpen, onClose: propOnClose }: TransactionModalProps = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Gunakan props jika disediakan, jika tidak gunakan URL parameter
  const isModalOpen = propIsOpen !== undefined ? propIsOpen : (searchParams.get('modal') === 'transaction');
  
  const handleClose = () => {
    if (propOnClose) {
      propOnClose();
    } else {
      // Update URL untuk menutup modal
      const params = new URLSearchParams(searchParams);
      params.delete('modal');
      const newUrl = params.toString() ? `?${params.toString()}` : '';
      router.replace(newUrl || window.location.pathname);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  
  const [formData, setFormData] = useState({
    amount: '',
    type: 'EXPENSE',
    categoryId: '',
    date: new Date().toISOString().split('T')[0],
    note: ''
  });

  // Tarik data kategori dari Spreadsheet saat modal terbuka
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      fetchCategoriesFromSheets();
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  const fetchCategoriesFromSheets = async () => {
    setIsLoadingCategories(true);
    try {
      // TODO: Ganti ini dengan fetch ke endpoint Next.js Anda (misal: /api/sheets/categories)
      /*
      const res = await fetch('/api/sheets/categories');
      const data = await res.json();
      setCategories(data);
      */

      // MOCK SPREADSHEET DATA (Simulasi waktu tarik data dari Google)
      setTimeout(() => {
        setCategories([
          { id: 'custom_1', name: 'Makanan', icon: 'Coffee', color: '#00E5FF' },
          { id: 'custom_2', name: 'Gaming', icon: 'Monitor', color: '#B388FF' },
          { id: 'custom_3', name: 'Transportasi', icon: 'Bus', color: '#2962FF' },
        ]);
        setIsLoadingCategories(false);
      }, 800);

    } catch (error) {
      console.error('Gagal memuat matriks kategori dari Spreadsheet:', error);
      setIsLoadingCategories(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId) return alert('Silakan pilih kategori terlebih dahulu.');

    setIsSubmitting(true);
    
    try {
      // MOCK SPREADSHEET API: Menyimpan ke LocalStorage sebagai simulasi Spreadsheet agar UI bisa dites
      const newTransaction = {
        id: `trx_${Date.now()}`,
        ...formData,
        amount: Number(formData.amount),
        categoryName: categories.find(c => c.id === formData.categoryId)?.name || 'Uncategorized'
      };

      const existingData = JSON.parse(localStorage.getItem('mock_sheet_transactions') || '[]');
      localStorage.setItem('mock_sheet_transactions', JSON.stringify([newTransaction, ...existingData]));

      // TODO: Nanti ganti baris di atas dengan fetch ke API Google Sheets Anda:
      // await fetch('/api/sheets/transactions', { method: 'POST', body: JSON.stringify(newTransaction) });

      // Beri sinyal ke Dashboard untuk memperbarui data
      window.dispatchEvent(new Event('transaction_updated'));

      setFormData({ ...formData, amount: '', note: '' });
      handleClose();
    } catch (error) {
      console.error(error);
      alert('Gagal mencatat transaksi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:justify-end sm:p-6 bg-[#040B16]/60 backdrop-blur-sm transition-opacity">
      <div className="relative w-full sm:w-[400px] h-[85vh] sm:h-auto bg-[#0A1428] sm:border border-white/10 sm:rounded-[2rem] rounded-t-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in slide-in-from-bottom-full sm:slide-in-from-right-full duration-500">
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2962FF]/10 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="flex justify-between items-center p-6 border-b border-white/5 relative z-10">
          <h2 className="text-xl font-black tracking-tighter text-white">Catat Transaksi</h2>
          <button onClick={handleClose} className="p-2 bg-white/5 rounded-full text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6 overflow-y-auto max-h-[calc(85vh-80px)] sm:max-h-[70vh] custom-scrollbar relative z-10">
          
          <div className="flex bg-[#040B16] rounded-xl p-1.5 border border-white/5 shadow-inner">
            <button 
              type="button" 
              onClick={() => setFormData({...formData, type: 'EXPENSE'})} 
              className={`flex-1 py-2.5 text-xs font-bold tracking-widest rounded-lg transition-all duration-300 ${formData.type === 'EXPENSE' ? 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'text-[#94A3B8] hover:text-white'}`}
            >
              PENGELUARAN
            </button>
            <button 
              type="button" 
              onClick={() => setFormData({...formData, type: 'INCOME'})} 
              className={`flex-1 py-2.5 text-xs font-bold tracking-widest rounded-lg transition-all duration-300 ${formData.type === 'INCOME' ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/50 shadow-[0_0_15px_rgba(0,229,255,0.2)]' : 'text-[#94A3B8] hover:text-white'}`}
            >
              PEMASUKAN
            </button>
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 block">Nominal (Rp)</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-[#94A3B8] font-bold group-focus-within:text-[#00E5FF] transition-colors">Rp</span>
              </div>
              <input 
                type="number" 
                required
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className="w-full bg-[#040B16] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-2xl font-black text-white focus:outline-none focus:border-[#00E5FF] focus:shadow-[0_0_20px_rgba(0,229,255,0.1)] transition-all placeholder:text-white/10"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 block">Kategori Spreadsheet</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                {isLoadingCategories ? (
                  <Loader2 size={16} className="animate-spin text-[#00E5FF]" />
                ) : (
                  <Wallet size={16} className="text-[#94A3B8] group-focus-within:text-[#2962FF] transition-colors" />
                )}
              </div>
              <select 
                required
                disabled={isLoadingCategories}
                value={formData.categoryId}
                onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                className="w-full bg-[#040B16] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#2962FF] appearance-none transition-all cursor-pointer disabled:opacity-50"
              >
                <option value="" disabled>
                  {isLoadingCategories ? 'Menarik data dari Spreadsheet...' : 'Pilih Kategori...'}
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 block">Tanggal</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={14} className="text-[#94A3B8] group-focus-within:text-white transition-colors" />
                </div>
                <input 
                  type="date" 
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-[#040B16] border border-white/10 rounded-xl pl-9 pr-3 py-3 text-xs text-white focus:outline-none focus:border-white/30 transition-all [color-scheme:dark]"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 block">Catatan</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText size={14} className="text-[#94A3B8] group-focus-within:text-white transition-colors" />
                </div>
                <input 
                  type="text" 
                  value={formData.note}
                  onChange={(e) => setFormData({...formData, note: e.target.value})}
                  className="w-full bg-[#040B16] border border-white/10 rounded-xl pl-9 pr-3 py-3 text-xs text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-white/20"
                  placeholder="Opsional..."
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting || isLoadingCategories}
            className="group relative w-full mt-4 flex items-center justify-center gap-3 bg-gradient-to-r from-[#2962FF] to-[#1E40AF] hover:from-[#00E5FF] hover:to-[#2962FF] text-white font-bold py-4 rounded-xl transition-all duration-500 shadow-[0_0_20px_rgba(41,98,255,0.3)] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] disabled:opacity-50 overflow-hidden"
          >
            {isSubmitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                <span className="tracking-widest uppercase text-xs">Simpan Transaksi</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}