'use client';

import api from '@/app/lib/api';
import React, { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
  type: 'INCOME' | 'EXPENSE';
}

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Fungsi untuk me-refresh dashboard setelah sukses
}

export default function TransactionModal({ isOpen, onClose, onSuccess }: TransactionModalProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Tarik data kategori saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      api.get('/categories')
        .then((res: { data: { data: any; }; }) => {
          // Asumsi respons Backend: { status: 'success', data: [...] }
          setCategories(res.data.data || []);
        })
        .catch((err) => console.error('Gagal mengambil kategori:', err));
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post('/transactions', {
        amount: Number(amount),
        categoryId: categoryId,
        description: description,
        // targetSheetId sengaja dikosongkan agar API otomatis melempar ke Primary Sheet
      });

      // Reset form dan tutup modal
      setAmount('');
      setCategoryId('');
      setDescription('');
      onSuccess(); 
      onClose();
    } catch (error) {
      console.error('Gagal menyimpan transaksi:', error);
      alert('Terjadi kesalahan saat menyimpan data.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-[#1A1D24] p-6 shadow-2xl border border-gray-800">
        <h2 className="mb-4 text-xl font-bold text-white">Catat Transaksi</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm text-gray-400">Nominal (Rp)</label>
            <input 
              type="number" 
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg bg-[#0F1115] border border-gray-700 p-3 text-white focus:border-blue-500 focus:outline-none"
              placeholder="Contoh: 50000"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-400">Kategori</label>
            <select 
              required
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-lg bg-[#0F1115] border border-gray-700 p-3 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="" disabled>-- Pilih Kategori --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.type === 'INCOME' ? 'Pemasukan' : 'Pengeluaran'})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-400">Deskripsi / Catatan</label>
            <input 
              type="text" 
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg bg-[#0F1115] border border-gray-700 p-3 text-white focus:border-blue-500 focus:outline-none"
              placeholder="Contoh: Beli kopi di minimarket"
            />
          </div>

          <div className="mt-4 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 rounded-lg bg-gray-800 py-3 text-white transition hover:bg-gray-700"
            >
              Batal
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="flex-1 rounded-lg bg-blue-600 py-3 text-white transition hover:bg-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Menyimpan...' : 'Simpan Transaksi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}