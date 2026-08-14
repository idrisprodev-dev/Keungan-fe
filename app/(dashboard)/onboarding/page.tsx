'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2 } from 'lucide-react';
import api from '@/app/lib/api';

const COLORS = ['#EF4444', '#F97316', '#F59E0B', '#84CC16', '#10B981', '#06B6D4', '#3B82F6', '#6366F1', '#8B5CF6', '#D946EF', '#F43F5E', '#64748B'];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // State Langkah 1: Google Sheet
  const [sheetName, setSheetName] = useState('Pengeluaran ohDuit');

  // State Langkah 2: Kategori
  const [categories, setCategories] = useState([
    { id: 1, name: 'Makanan', color: '#EF4444' },
    { id: 2, name: 'Transportasi', color: '#F97316' },
    { id: 3, name: 'Tagihan', color: '#8B5CF6' },
  ]);

  // State Langkah 3: Metode Pembayaran
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, name: 'Cash' },
    { id: 2, name: 'BCA' },
    { id: 3, name: 'GoPay' },
  ]);

  const handleFinishSetup = async () => {
    setIsLoading(true);
    try {
      // 1. Buat Google Sheet
      await api.post('/sheets', { title: sheetName });

      // 2. Buat Kategori (Tembak ke endpoint Batch yang pernah kita buat)
      const categoryPayload = categories.map(c => ({
        name: c.name,
        type: 'EXPENSE', // Default onboarding kita set ke pengeluaran
        color: c.color // Asumsi backend menerima field color opsional
      }));
      await api.post('/categories/batch', { categories: categoryPayload });

      // (Metode pembayaran bisa disimpan di state global/local storage untuk sementara waktu jika belum ada tabel khusus)
      localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods.map(p => p.name)));

      // 3. Arahkan ke Dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Gagal setup onboarding:', error);
      alert('Terjadi kesalahan saat menyinkronkan data dengan server.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center justify-center p-6 font-sans">
      
      {/* Header Aplikasi */}
      <div className="w-full max-w-xl flex justify-between items-center mb-12 absolute top-8 px-8">
        <h1 className="text-xl font-bold tracking-tighter">ohDuit<span className="text-[#00E5FF]">.id</span></h1>
        <button onClick={() => router.push('/login')} className="text-sm text-gray-400 hover:text-white">Keluar</button>
      </div>

      <div className="w-full max-w-md">
        <p className="text-[#94A3B8] text-xs font-bold tracking-widest mb-3 uppercase">Langkah {step} dari 3</p>
        
        {/* Konten Langkah 1 */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold mb-4">Hubungkan Google Sheet kamu</h2>
            <p className="text-[#94A3B8] text-sm mb-8">Kami akan buat sheet baru di Drive kamu. Data kamu tetap milik kamu — tidak disimpan di server (Khusus transaksi).</p>
            
            <div className="bg-[#121826] border border-white/5 rounded-2xl p-6 mb-8">
              <h3 className="font-bold mb-2">Buat spreadsheet baru</h3>
              <p className="text-sm text-[#94A3B8] mb-6">ohDuit akan membuat Google Sheet baru di Drive kamu untuk menyimpan pengeluaran.</p>
              
              <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 block">Nama Spreadsheet (Opsional)</label>
              <input 
                type="text" 
                value={sheetName}
                onChange={(e) => setSheetName(e.target.value)}
                className="w-full bg-[#0B0F19] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#00E5FF] transition-colors"
              />
            </div>
          </div>
        )}

        {/* Konten Langkah 2 */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold mb-4">Atur kategori pengeluaran</h2>
            <p className="text-[#94A3B8] text-sm mb-8">Kategori yang sering kamu pakai untuk mencatat pengeluaran.</p>
            
            <div className="bg-[#121826] border border-white/5 rounded-2xl p-6 mb-8 max-h-[50vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-4">
                {categories.map((cat, index) => (
                  <div key={cat.id} className="bg-[#0B0F19] border border-white/10 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-3">
                      <input 
                        type="text" 
                        value={cat.name}
                        onChange={(e) => {
                          const newCats = [...categories];
                          newCats[index].name = e.target.value;
                          setCategories(newCats);
                        }}
                        className="bg-transparent font-bold text-sm outline-none w-full"
                      />
                      <button onClick={() => setCategories(categories.filter(c => c.id !== cat.id))} className="text-gray-500 hover:text-red-400"><Trash2 size={16}/></button>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {COLORS.map(color => (
                        <button 
                          key={color} 
                          onClick={() => {
                            const newCats = [...categories];
                            newCats[index].color = color;
                            setCategories(newCats);
                          }}
                          className={`w-5 h-5 rounded-full ${cat.color === color ? 'ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-100'}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setCategories([...categories, { id: Date.now(), name: 'Kategori Baru', color: COLORS[0] }])}
                className="w-full mt-4 py-3 border border-dashed border-white/20 rounded-xl text-sm text-[#94A3B8] hover:text-white hover:border-white/40 transition-colors"
              >
                + Tambah Kategori
              </button>
            </div>
          </div>
        )}

        {/* Konten Langkah 3 */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold mb-4">Atur metode pembayaran</h2>
            <p className="text-[#94A3B8] text-sm mb-8">Cara kamu biasanya membayar — cash, transfer, e-wallet.</p>
            
            <div className="bg-[#121826] border border-white/5 rounded-2xl p-6 mb-8 max-h-[50vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-3">
                {paymentMethods.map((method, index) => (
                  <div key={method.id} className="bg-[#0B0F19] border border-white/10 rounded-xl p-4 flex justify-between items-center">
                    <input 
                      type="text" 
                      value={method.name}
                      onChange={(e) => {
                        const newMethods = [...paymentMethods];
                        newMethods[index].name = e.target.value;
                        setPaymentMethods(newMethods);
                      }}
                      className="bg-transparent font-bold text-sm outline-none w-full"
                    />
                    <button onClick={() => setPaymentMethods(paymentMethods.filter(m => m.id !== method.id))} className="text-gray-500 hover:text-red-400"><Trash2 size={16}/></button>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setPaymentMethods([...paymentMethods, { id: Date.now(), name: 'Metode Baru' }])}
                className="w-full mt-4 py-3 border border-dashed border-white/20 rounded-xl text-sm text-[#94A3B8] hover:text-white hover:border-white/40 transition-colors"
              >
                + Tambah Metode
              </button>
            </div>
          </div>
        )}

        {/* Navigasi Bawah */}
        <div className="flex gap-4">
          {step > 1 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="flex-1 py-4 rounded-xl border border-white/10 font-bold hover:bg-white/5 transition-colors"
              disabled={isLoading}
            >
              Kembali
            </button>
          )}
          <button 
            onClick={() => step < 3 ? setStep(step + 1) : handleFinishSetup()}
            disabled={isLoading}
            className="flex-1 py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors flex justify-center items-center"
          >
            {isLoading ? <Loader2 className="animate-spin text-black" size={20} /> : (step < 3 ? 'Lanjut' : 'Mulai Gunakan ohDuit')}
          </button>
        </div>

        {/* Indikator Progres */}
        <div className="flex gap-2 mt-8 justify-center">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1 rounded-full transition-all duration-300 ${step >= i ? 'w-8 bg-white' : 'w-4 bg-white/20'}`} />
          ))}
        </div>

      </div>
    </div>
  );
}