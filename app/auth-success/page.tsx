'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // 1. Simpan token ke localStorage
      localStorage.setItem('accessToken', token);
      
      // 2. Langsung cek status user dengan token tersebut
      checkUserStatus(token);
    } else {
      router.push('/');
    }
  }, [searchParams, router]);

  const checkUserStatus = async (token: string) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      // Menggunakan fetch biasa agar token PASTI terkirim
      const res = await fetch(`${API_URL}/categories`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) throw new Error('Gagal mengecek kategori');

      const categories = await res.json();

      // Logika Redirect
      if (categories && categories.length > 0) {
        router.push('/dashboard'); // User Lama (Sudah punya kategori)
      } else {
        router.push('/onboarding'); // User Baru (Belum punya kategori)
      }
      
    } catch (error) {
      console.error('Error saat cek status user:', error);
      // Fallback: Jika error jaringan, amankan user ke onboarding daripada tersangkut
      router.push('/onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-[#040B16] flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-5">
        <div className="w-12 h-12 border-4 border-[#00E5FF]/20 border-t-[#00E5FF] rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-[#94A3B8]">Memproses otentikasi...</p>
      </div>
    </div>
  );
}