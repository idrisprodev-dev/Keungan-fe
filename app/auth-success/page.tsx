'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiClient } from '@/app/lib/api';

export default function AuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Simpan JWT ke local storage
      localStorage.setItem('accessToken', token);
      checkUserStatus();
    } else {
      router.replace('/'); // Kembali ke login jika tidak ada token
    }
  }, [searchParams, router]);

  const checkUserStatus = async () => {
    try {
      // Menggunakan apiClient tersentralisasi untuk menarik data kategori user.
      // Jika array kosong, berarti user belum melewati onboarding.
      const categories = await apiClient<any[]>('/categories');

      if (categories && categories.length > 0) {
        router.replace('/dashboard'); // User lama
      } else {
        router.replace('/onboarding'); // User baru
      }
    } catch (err: any) {
      console.error('Gagal memverifikasi status user:', err);
      // Bersihkan token yang rusak dan tampilkan error
      localStorage.removeItem('accessToken');
      setError(err.message || 'Sesi otentikasi tidak valid. Silakan login kembali.');
      
      // Kembalikan ke halaman login setelah 3 detik
      setTimeout(() => {
        router.replace('/');
      }, 3000);
    }
  };

  // State: Jika otentikasi ditolak oleh BE
  if (error) {
    return (
      <div className="min-h-screen bg-[#040B16] flex items-center justify-center text-white p-6 text-center font-sans">
        <div className="bg-red-500/10 border border-red-500/50 p-6 rounded-3xl max-w-md animate-in zoom-in-95 duration-300">
          <h2 className="text-red-400 font-bold mb-2">Otentikasi Gagal</h2>
          <p className="text-[#94A3B8] text-sm mb-4">{error}</p>
          <div className="w-5 h-5 border-2 border-red-400/20 border-t-red-400 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  // State: Proses loading verifikasi token
  return (
    <div className="min-h-screen bg-[#040B16] flex items-center justify-center text-white font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay z-0 pointer-events-none"></div>
      
      <div className="flex flex-col items-center gap-6 relative z-10">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-16 h-16 bg-[#00E5FF]/20 blur-[20px] rounded-full"></div>
          <div className="w-12 h-12 border-4 border-[#00E5FF]/20 border-t-[#00E5FF] rounded-full animate-spin relative z-10 shadow-[0_0_15px_rgba(0,229,255,0.4)]"></div>
        </div>
        <p className="text-xs font-bold text-[#94A3B8] tracking-widest uppercase animate-pulse">
          Memverifikasi Kredensial...
        </p>
      </div>
    </div>
  );
}