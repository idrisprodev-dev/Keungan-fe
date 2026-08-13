'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Plus, Coffee, Bus, Zap, Home, ShoppingCart, Briefcase, Heart, Monitor, Trash2, Edit2, X, ArrowRight, FileSpreadsheet } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = { Coffee, Bus, Zap, Home, ShoppingCart, Briefcase, Heart, Monitor };
const COLOR_PALETTE = ['#00E5FF', '#2962FF', '#536DFE', '#B388FF', '#FF4081', '#1DE9B6', '#FFC400', '#F50057'];

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const DEFAULT_TEMPLATES: Category[] = [
  { id: 'def_1', name: 'Makanan', icon: 'Coffee', color: '#00E5FF' },
  { id: 'def_2', name: 'Transportasi', icon: 'Bus', color: '#2962FF' },
  { id: 'def_3', name: 'Tagihan', icon: 'Zap', color: '#536DFE' },
  { id: 'def_4', name: 'Pendidikan', icon: 'Briefcase', color: '#1DE9B6' },
];

export default function OnboardingPage() {
  const router = useRouter();
  
  // State Alur Onboarding
  const [step, setStep] = useState<1 | 2>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // State Step 1: Spreadsheet
  const [spreadsheetTitle, setSpreadsheetTitle] = useState('Buku Besar Keuangan');
  const [spreadsheetId, setSpreadsheetId] = useState<string | null>(null);

  // State Step 2: Kategori
  const [categories, setCategories] = useState<Category[]>(DEFAULT_TEMPLATES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', icon: 'Zap', color: '#00E5FF' });

  // --- LOGIKA STEP 1: INTEGRASI SPREADSHEET ---
  const handleCreateSpreadsheet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spreadsheetTitle.trim()) return;
    
    setIsProcessing(true);
    try {
      // TODO: Sesuaikan URL ini dengan endpoint Google Sheets integrasi Anda yang sudah ada
      /* 
      const res = await fetch('/api/sheets/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: spreadsheetTitle })
      });
      const data = await res.json();
      setSpreadsheetId(data.spreadsheetId); // Simpan ID dari Google Sheets
      */
      
      // Simulasi sukses pembuatan Spreadsheet untuk UI
      setTimeout(() => {
        setSpreadsheetId('mock_spreadsheet_id_123');
        setStep(2); // Lanjut ke Setup Kategori
        setIsProcessing(false);
      }, 1500);

    } catch (error) {
      console.error(error);
      alert('Gagal mengintegrasikan Google Spreadsheet.');
      setIsProcessing(false);
    }
  };

  // --- LOGIKA STEP 2: SETUP KATEGORI ---
  const openModal = (cat?: Category) => {
    if (cat) {
      setEditingId(cat.id);
      setFormData({ name: cat.name, icon: cat.icon, color: cat.color });
    } else {
      setEditingId(null);
      setFormData({ name: '', icon: 'Zap', color: '#00E5FF' });
    }
    setIsModalOpen(true);
  };

  const handleSaveCategoryModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setCategories(categories.map(c => c.id === editingId ? { ...c, ...formData } : c));
    } else {
      setCategories([...categories, { ...formData, id: `custom_${Date.now()}` }]);
    }
    setIsModalOpen(false);
  };

  const handleFinalizeToSpreadsheet = async () => {
    if (categories.length === 0) return alert('Silakan tambahkan minimal satu kategori.');
    setIsProcessing(true);
    
    try {
      // TODO: Sesuaikan URL ini dengan endpoint Anda untuk menyimpan tab 'Categories' di Spreadsheet
      /*
      await fetch('/api/sheets/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spreadsheetId, categories })
      });
      */

      // Simulasi sukses penyimpanan ke Spreadsheet
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);

    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan kategori ke Spreadsheet.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#040B16] font-sans text-white overflow-hidden flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay z-0 pointer-events-none"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#00E5FF]/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-4xl px-6 py-12">
        
        {/* Indikator Alur */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-colors ${step >= 1 ? 'bg-[#00E5FF] text-[#040B16] shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'bg-white/10 text-white/50'}`}>1</div>
          <div className={`h-1 w-16 rounded-full transition-colors ${step >= 2 ? 'bg-[#00E5FF]' : 'bg-white/10'}`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-colors ${step >= 2 ? 'bg-[#00E5FF] text-[#040B16] shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'bg-white/10 text-white/50'}`}>2</div>
        </div>

        {/* STEP 1: PEMBUATAN JUDUL SPREADSHEET */}
        {step === 1 && (
          <div className="bg-[#0A1428]/80 backdrop-blur-md border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#2962FF]/20 text-[#00E5FF] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileSpreadsheet size={32} />
              </div>
              <h1 className="text-3xl font-black mb-4">Integrasi Basis Data</h1>
              <p className="text-[#94A3B8]">Tentukan nama dokumen Google Spreadsheet yang akan menjadi pusat kendali keuangan Anda.</p>
            </div>

            <form onSubmit={handleCreateSpreadsheet} className="space-y-6">
              <div>
                <label className="text-xs font-bold text-[#94A3B8] block mb-2 uppercase tracking-widest">Judul Dokumen Spreadsheet</label>
                <input 
                  type="text" 
                  required 
                  value={spreadsheetTitle} 
                  onChange={(e) => setSpreadsheetTitle(e.target.value)} 
                  className="w-full bg-[#040B16] border border-white/10 rounded-xl px-4 py-4 text-white text-lg font-bold focus:outline-none focus:border-[#00E5FF] focus:shadow-[0_0_20px_rgba(0,229,255,0.1)] transition-all" 
                />
              </div>
              <button 
                type="submit" 
                disabled={isProcessing} 
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#2962FF] to-[#00E5FF] hover:opacity-90 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(0,229,255,0.3)] disabled:opacity-50"
              >
                {isProcessing ? <Loader2 size={20} className="animate-spin"/> : <><span className="tracking-widest uppercase">Buat & Integrasikan</span><ArrowRight size={18}/></>}
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: SETUP KATEGORI */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-black tracking-tighter mb-4">Setup Kategori</h1>
              <p className="text-[#94A3B8] max-w-xl mx-auto">
                Kategori ini akan disimpan ke dalam Spreadsheet Anda sebagai referensi saat mencatat transaksi.
              </p>
            </div>

            <div className="bg-[#0A1428]/80 backdrop-blur-md border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h2 className="text-xl font-bold">Kategori Tersimpan ({categories.length})</h2>
                <button onClick={() => openModal()} className="flex items-center gap-2 bg-[#2962FF]/20 hover:bg-[#2962FF]/40 text-[#00E5FF] px-4 py-2.5 rounded-xl text-sm font-bold transition-colors border border-[#2962FF]/30">
                  <Plus size={16} /> Tambah Kategori
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => {
                  const IconComp = ICON_MAP[cat.icon] || Zap;
                  return (
                    <div key={cat.id} className="flex items-center justify-between p-4 bg-[#040B16] border border-white/5 rounded-2xl group hover:border-white/10 transition-colors">
                      <div className="flex items-center gap-4 overflow-hidden">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                          <IconComp size={18} />
                        </div>
                        <p className="font-bold text-sm truncate">{cat.name}</p>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openModal(cat)} className="p-2 text-[#94A3B8] hover:text-white bg-white/5 rounded-lg"><Edit2 size={14}/></button>
                        <button onClick={() => setCategories(categories.filter(c => c.id !== cat.id))} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={14}/></button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button onClick={handleFinalizeToSpreadsheet} disabled={isProcessing || categories.length === 0} className="w-full md:w-auto mx-auto flex items-center justify-center gap-3 bg-gradient-to-r from-[#2962FF] to-[#00E5FF] hover:opacity-90 text-white font-bold py-4 px-12 rounded-2xl transition-all shadow-[0_0_30px_rgba(0,229,255,0.3)] disabled:opacity-50">
              {isProcessing ? <Loader2 size={20} className="animate-spin"/> : <><span className="tracking-widest uppercase">Simpan ke Spreadsheet & Lanjut</span><ArrowRight size={18}/></>}
            </button>
          </div>
        )}
      </div>

      {/* MODAL KATEGORI CUSTOM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040B16]/80 backdrop-blur-sm">
          <div className="bg-[#0A1428] border border-white/10 rounded-[2rem] w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">{editingId ? 'Edit Kategori' : 'Kategori Baru'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#94A3B8] hover:text-white"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSaveCategoryModal} className="space-y-6">
              <div>
                <label className="text-xs font-bold text-[#94A3B8] block mb-2 uppercase tracking-widest">Nama Kategori</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#040B16] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF]" placeholder="Misal: Gaming" />
              </div>

              <div>
                <label className="text-xs font-bold text-[#94A3B8] block mb-2 uppercase tracking-widest">Ikon</label>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(ICON_MAP).map(([key, Icon]) => (
                    <button key={key} type="button" onClick={() => setFormData({...formData, icon: key})} className={`p-3 flex justify-center rounded-xl border transition-all ${formData.icon === key ? 'border-[#00E5FF] bg-[#00E5FF]/10 text-[#00E5FF]' : 'border-white/5 bg-[#040B16] text-[#94A3B8] hover:border-white/20'}`}><Icon size={18}/></button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#94A3B8] block mb-2 uppercase tracking-widest">Warna</label>
                <div className="flex flex-wrap gap-3">
                  {COLOR_PALETTE.map((hex) => (
                    <button key={hex} type="button" onClick={() => setFormData({...formData, color: hex})} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${formData.color === hex ? 'scale-125 border-2 border-white' : 'opacity-40 hover:opacity-100'}`} style={{ backgroundColor: hex }}>
                      {formData.color === hex && <div className="w-2 h-2 bg-[#040B16] rounded-full"></div>}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full bg-white text-[#040B16] font-bold py-3 rounded-xl mt-4 hover:bg-gray-200 transition-colors">Simpan Kategori</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}