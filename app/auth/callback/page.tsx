    'use client';

    import { useEffect } from 'react';
    import { useRouter, useSearchParams } from 'next/navigation';
    import Cookies from 'js-cookie';

    export default function AuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        // 1. Tangkap parameter 'token' dari URL
        const token = searchParams.get('token');

        if (token) {
        // 2. Simpan token ke dalam Cookies (expires dalam 7 hari)
        Cookies.set('access_token', token, { 
        expires: 7, 
        secure: process.env.NODE_ENV === 'production' 
        });        
        // 3. Tendang user masuk ke Dashboard
        router.push('/onboarding');
        } else {
        // Jika token tidak ada, kembalikan ke login
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