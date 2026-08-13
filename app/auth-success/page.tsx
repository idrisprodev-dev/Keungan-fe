'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function AuthInterceptor() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. Menangkap token JWT rahasia dari URL yang dikirim oleh backend
    const token = searchParams.get('token');
    
    if (token) {
      // 2. Mengamankan token ke dalam brankas lokal browser
      localStorage.setItem('ohduit_jwt', token);
      
      // 3. Langsung melempar pengguna ke ruang kendali (Dasbor)
      router.push('/dashboard');
    } else {
      // Jika ada penyusup yang mengakses rute ini tanpa token, tendang ke halaman awal
      router.push('/');
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-emerald-400">
      <svg className="animate-spin h-10 w-10 mb-4 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p className="text-xl font-bold animate-pulse">Mengamankan Sesi Anda...</p>
    </div>
  );
}

// Suspense wajib digunakan di Next.js saat kita membaca URL Parameter agar tidak terjadi galat saat Build
export default function AuthSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">
        Memuat...
      </div>
    }>
      <AuthInterceptor />
    </Suspense>
  );
}