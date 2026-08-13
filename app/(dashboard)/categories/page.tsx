'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Coffee, Bus, Zap, Home, ShoppingCart, Briefcase, Heart, Monitor, X, Loader2 } from 'lucide-react';
// import { fetchAPI } from '@/lib/api'; // Pastikan Anda mengimpor utilitas API Anda

// Peta Ikon Lucide untuk dirender secara dinamis
const ICON_MAP: Record<string, React.ElementType> = {
  Coffee, Bus, Zap, Home, ShoppingCart, Briefcase, Heart, Monitor
};

// Palet Warna Abyssal Tech (Neon)
const COLOR_PALETTE = [
  '#00E5FF', '#2962FF', '#536DFE', '#B388FF', '#FF4081', '#1DE9B6', '#FFC400', '#F50057'
];

interface Category {
  id: string;
  name: string;
  type: 'INCOME' | 'EXPENSE';
  icon?: string;
  color?: string;
  isDefault: boolean;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State untuk Modal Tambah/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // State Formulir
  const [formData, setFormData] = useState({
    name: '',
    type: 'EXPENSE' as 'INCOME' | 'EXPENSE',
    icon: 'Coffee',
    color: '#00E5FF'
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      // MOCK: Ganti dengan await fetchAPI('/categories');
      // const res = await fetchAPI('/categories');
      // setCategories(res.data);
      
      // Data simulasi sementara untuk menguji UI
      setCategories([
        { id: '1', name: 'Makan & Minum', type: 'EXPENSE', icon: 'Coffee', color: '#2962FF', isDefault: true },
        { id: '2', name: 'Gaji / Upah', type: 'INCOME', icon: 'Briefcase', color: '#00E5FF', isDefault: true },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (category?: Category) => {
    if (category) {
      setEditingId(category.id);
      setFormData({
        name: category.name,
        type: category.type,
        icon: category.icon || 'Zap',
        color: category.color || '#00E5FF'
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', type: 'EXPENSE', icon: 'Zap', color: '#00E5FF' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        // MOCK: await fetchAPI(`/categories/${editingId}`, { method: 'PATCH', body: JSON.stringify(formData) });
        console.log('Update:', editingId, formData);
      } else {
        // MOCK: await fetchAPI('/categories', { method: 'POST', body: JSON.stringify(formData) });
        console.log('Create:', formData);
      }
      setIsModalOpen(false);
      fetchCategories(); // Muat ulang data
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, isDefault: boolean) => {
    if (isDefault) return alert('Otorisasi ditolak: Kategori bawaan sistem tidak dapat dihapus.');
    if (!confirm('Apakah Anda yakin ingin menghapus modul ini?')) return;
    
    try {
      // MOCK: await fetchAPI(`/categories/${id}`, { method: 'DELETE' });
      console.log('Delete:', id);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 md:p-10 min-h-screen">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter mb-2">Manajemen Matriks</h1>
          <p className="text-[#94A3B8] text-sm">Konfigurasi parameter klasifikasi arus kas Anda.</p>
        </div>
        
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-[#2962FF] hover:bg-[#00E5FF] text-white px-5 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(41,98,255,0.3)] hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] text-sm"
        >
          <Plus size={18} /> Modul Baru
        </button>
      </div>

      {/* Categories Grid */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-[#00E5FF]" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => {
            const IconComponent = ICON_MAP[cat.icon || 'Zap'] || Zap;
            
            return (
              <div 
                key={cat.id} 
                className="group bg-[#0A1428]/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 hover:border-white/20 transition-all duration-300 relative overflow-hidden"
              >
                {/* Latar Belakang Pendaran Dinamis */}
                <div 
                  className="absolute -top-10 -right-10 w-32 h-32 blur-[60px] rounded-full opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: cat.color || '#00E5FF' }}
                ></div>

                <div className="relative flex justify-between items-start mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center border bg-[#040B16]"
                    style={{ borderColor: `${cat.color}40`, color: cat.color || '#00E5FF' }}
                  >
                    <IconComponent size={24} />
                  </div>
                  <div className="flex items-center gap-2">
                    {cat.isDefault && (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8] bg-white/5 px-2 py-1 rounded-md">
                        Sistem
                      </span>
                    )}
                    <button onClick={() => openModal(cat)} className="p-1.5 text-[#94A3B8] hover:text-white transition-colors bg-white/5 rounded-lg">
                      <Edit2 size={14} />
                    </button>
                    {!cat.isDefault && (
                      <button onClick={() => handleDelete(cat.id, cat.isDefault)} className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors bg-white/5 rounded-lg">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-white font-bold text-lg mb-1">{cat.name}</h3>
                  <p className="text-xs font-mono text-[#94A3B8]">TIPE: {cat.type === 'INCOME' ? 'PEMASUKAN' : 'PENGELUARAN'}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL INJEKSI (Glassmorphic) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040B16]/80 backdrop-blur-sm">
          <div className="bg-[#0A1428] border border-white/10 rounded-[2rem] w-full max-w-md overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-300">
            
            <div className="flex justify-between items-center p-6 border-b border-white/5 bg-white/5">
              <h2 className="text-xl font-bold text-white">
                {editingId ? 'Kalibrasi Modul' : 'Injeksi Modul Baru'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#94A3B8] hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
              
              {/* Input Nama & Tipe */}
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest mb-2 block">Identitas Modul</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="w-full bg-[#040B16] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] transition-colors"
                    placeholder="Contoh: Langganan Server"
                  />
                </div>

                <div className="flex bg-[#040B16] rounded-xl p-1 border border-white/10">
                  <button type="button" onClick={() => setFormData({...formData, type: 'EXPENSE'})} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${formData.type === 'EXPENSE' ? 'bg-[#536DFE] text-white shadow-lg' : 'text-[#94A3B8] hover:text-white'}`}>PENGELUARAN</button>
                  <button type="button" onClick={() => setFormData({...formData, type: 'INCOME'})} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${formData.type === 'INCOME' ? 'bg-[#00E5FF] text-[#040B16] shadow-lg' : 'text-[#94A3B8] hover:text-white'}`}>PEMASUKAN</button>
                </div>
              </div>

              {/* Pemilih Ikon (Icon Selector) */}
              <div>
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest mb-3 block">Indikator Visual (Ikon)</label>
                <div className="grid grid-cols-4 gap-3">
                  {Object.entries(ICON_MAP).map(([key, Icon]) => (
                    <button
                      key={key} type="button" onClick={() => setFormData({...formData, icon: key})}
                      className={`flex justify-center items-center p-3 rounded-xl border transition-all ${formData.icon === key ? 'border-[#00E5FF] bg-[#00E5FF]/10 text-[#00E5FF]' : 'border-white/5 bg-[#040B16] text-[#94A3B8] hover:border-white/20 hover:text-white'}`}
                    >
                      <Icon size={20} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Pemilih Warna (Color Picker) */}
              <div>
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest mb-3 block">Spektrum Pendaran (Warna)</label>
                <div className="flex flex-wrap gap-3">
                  {COLOR_PALETTE.map((hex) => (
                    <button
                      key={hex} type="button" onClick={() => setFormData({...formData, color: hex})}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${formData.color === hex ? 'scale-110 shadow-[0_0_15px_rgba(255,255,255,0.4)] border-2 border-white' : 'hover:scale-110 opacity-70 hover:opacity-100'}`}
                      style={{ backgroundColor: hex }}
                    >
                      {formData.color === hex && <div className="w-2 h-2 bg-[#040B16] rounded-full"></div>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tombol Aksi */}
              <button 
                type="submit" disabled={isSubmitting}
                className="w-full bg-white text-[#040B16] hover:bg-gray-200 font-bold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 mt-2 flex justify-center items-center gap-2"
              >
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Otorisasi Penyimpanan'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}