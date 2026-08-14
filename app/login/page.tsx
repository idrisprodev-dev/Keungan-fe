'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

// Komponen logika utama
function CallbackLogic() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. Tangkap parameter 'token' dari URL yang dikirim Backend
    const token = searchParams.get('token');

    if (token) {
      // 2. Simpan token ke dalam Cookies agar bisa dibaca oleh Axios nanti
      Cookies.set('access_token', token, { expires: 7, secure: true });
      
      // 3. Arahkan user ke halaman Dashboard
      router.push('/dashboard');
    } else {
      // Jika anehnya tidak ada token, tendang kembali ke login
      router.push('/login');
    }
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Mengamankan sesi Anda...</p>
      </div>
    </div>
  );
}

// Komponen pembungkus halaman (Wajib di Next.js App Router)
export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">Memuat...</p>
      </div>
    }>
      <CallbackLogic />
    </Suspense>
  );
}