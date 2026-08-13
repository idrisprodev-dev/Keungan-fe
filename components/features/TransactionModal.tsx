    'use client';

    import { useState, useEffect } from 'react';
    import { useRouter, useSearchParams } from 'next/navigation';
    import { X, Loader2, Zap } from 'lucide-react';
import { fetchAPI } from '@/app/lib/api';

    export default function TransactionModal() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isOpen = searchParams.get('action') === 'add';

    const [categories, setCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');

    useEffect(() => {
        if (isOpen) {
        fetchAPI('/categories')
            .then(res => {
            setCategories(res.data || []);
            if (res.data?.length > 0) setCategoryId(res.data[0].id);
            })
            .catch(console.error);
        }
    }, [isOpen]);

    const closeModal = () => {
        router.push(window.location.pathname, { scroll: false });
        setAmount('');
        setDescription('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !categoryId) return alert('Nominal dan Kategori wajib diisi!');

        setIsLoading(true);
        try {
        await fetchAPI('/transactions', {
            method: 'POST',
            body: JSON.stringify({
            amount: Number(amount),
            description,
            categoryId
            })
        });
        closeModal();
        window.location.reload(); 
        } catch (error: any) {
        alert(`Gagal mencatat: ${error.message}`);
        } finally {
        setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end bg-[#040B16]/60 backdrop-blur-sm transition-all duration-300">
        
        {/* Panel Slide-over - Abyssal Theme */}
        <div className="w-full md:w-[450px] h-full bg-[#0A1428]/95 backdrop-blur-2xl border-l border-white/5 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] p-6 md:p-8 animate-in slide-in-from-right duration-300 flex flex-col relative overflow-hidden">
            
            {/* Ambient Light dalam Modal */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2962FF]/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="flex justify-between items-center mb-10 relative z-10">
            <div>
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <Zap size={20} className="text-[#00E5FF]" /> Inisiasi Data
                </h2>
                <p className="text-xs text-[#94A3B8] font-bold tracking-widest uppercase mt-1">Catat Arus Kas Baru</p>
            </div>
            <button 
                onClick={closeModal} 
                className="p-2 text-[#94A3B8] hover:text-white hover:bg-white/5 rounded-2xl transition-all"
            >
                <X size={24} />
            </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-8 relative z-10">
            
            {/* Input Nominal (Massive & Clean) */}
            <div className="group">
                <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 group-focus-within:text-[#00E5FF] transition-colors">
                Besaran Nominal (Rp)
                </label>
                <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#040B16]/50 border-b-2 border-white/10 py-4 text-4xl font-black text-white focus:border-[#00E5FF] outline-none transition-all placeholder:text-white/10 font-mono tracking-tighter"
                placeholder="0"
                autoFocus
                />
            </div>

            <div>
                <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-3">
                Klasifikasi Kategori
                </label>
                <div className="relative">
                <select 
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-[#040B16] border border-white/5 p-4 rounded-2xl text-sm text-[#F8FAFC] focus:border-[#2962FF] focus:ring-1 focus:ring-[#2962FF] outline-none appearance-none cursor-pointer transition-all shadow-inner"
                >
                    {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name} ({cat.type === 'INCOME' ? '+' : '-'})
                    </option>
                    ))}
                </select>
                {/* Custom Arrow for Select */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#94A3B8]">
                    ▼
                </div>
                </div>
            </div>

            <div>
                <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-3">
                Keterangan Opsional
                </label>
                <input 
                type="text" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#040B16] border border-white/5 p-4 rounded-2xl text-sm text-[#F8FAFC] focus:border-[#2962FF] focus:ring-1 focus:ring-[#2962FF] outline-none transition-all shadow-inner placeholder:text-white/20"
                placeholder="Konteks transaksi..."
                />
            </div>

            <div className="mt-auto pt-6">
                <button 
                type="submit" 
                disabled={isLoading}
                className="group relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#2962FF] to-[#1E40AF] hover:from-[#00E5FF] hover:to-[#2962FF] text-white font-bold py-4 rounded-2xl transition-all duration-500 shadow-[0_0_20px_rgba(41,98,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] disabled:opacity-50 overflow-hidden"
                >
                {isLoading ? (
                    <Loader2 size={20} className="animate-spin" />
                ) : (
                    <>
                    <span className="relative z-10 tracking-wider">OTORISASI DATA</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-2xl"></div>
                    </>
                )}
                </button>
            </div>
            </form>
        </div>
        </div>
    );
    }