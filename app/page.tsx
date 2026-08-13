'use client';

import { ArrowRight, Shield, Zap, Database } from 'lucide-react';

export default function LoginPage() {
  const handleGoogleLogin = () => {
    // Menembak endpoint Google OAuth di backend NestJS Anda
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <div className="relative min-h-screen bg-[#040B16] flex items-center justify-center overflow-hidden font-sans text-white selection:bg-[#00E5FF]/30">
      
      {/* ENVIRONMENTAL EFFECTS (Abyssal Depth) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay z-10"></div>
      
      {/* Dynamic Light Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[#2962FF]/10 blur-[120px] rounded-full pointer-events-none animate-pulse duration-1000"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#00E5FF]/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* KIRI: Tipografi & Value Proposition */}
        <div className="flex-1 text-center lg:text-left pt-12 lg:pt-0">
          <div className="inline-flex items-center gap-2 bg-[#00E5FF]/10 border border-[#00E5FF]/20 px-4 py-2 rounded-full mb-8">
            <Zap size={16} className="text-[#00E5FF]" />
            <span className="text-xs font-bold text-[#00E5FF] tracking-widest uppercase">Mesin Finansial Generasi Baru</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-6 leading-[1.1]">
            Kendalikan <br className="hidden lg:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#00E5FF] to-[#2962FF]">
              Arus Kas Anda.
            </span>
          </h1>
          
          <p className="text-[#94A3B8] text-lg max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            Platform intelijen finansial yang merestrukturisasi cara Anda memantau, mengalokasikan, dan memproyeksikan aset digital Anda secara seketika (*real-time*).
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start text-sm font-bold text-[#94A3B8] tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-[#536DFE]" /> Enkripsi Lapis Baja
            </div>
            <div className="flex items-center gap-2">
              <Database size={18} className="text-[#00E5FF]" /> Sinkronisasi Sheets
            </div>
          </div>
        </div>

        {/* KANAN: Modul Otentikasi (Glassmorphic) */}
        <div className="w-full max-w-md">
          <div className="bg-[#0A1428]/60 backdrop-blur-2xl border border-white/5 p-10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-white/10 transition-colors">
            
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#536DFE]/20 blur-3xl rounded-full pointer-events-none"></div>

            <div className="text-center mb-10 relative z-10">
              <div className="font-black text-4xl tracking-tighter mb-2">
                o<span className="text-[#00E5FF]">Duit</span>
              </div>
              <p className="text-xs font-bold text-[#94A3B8] tracking-widest uppercase">Otorisasi Akses Sistem</p>
            </div>

            <button 
              onClick={handleGoogleLogin}
              className="relative w-full group/btn overflow-hidden rounded-2xl p-[1px]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#2962FF] via-[#00E5FF] to-[#536DFE] opacity-70 group-hover/btn:opacity-100 transition-opacity duration-500 rounded-2xl animate-gradient-xy"></span>
              
              <div className="relative flex items-center justify-center gap-3 bg-[#040B16] px-8 py-4 rounded-2xl transition-all duration-300 group-hover/btn:bg-opacity-0">
                <svg className="w-5 h-5 group-hover/btn:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="font-bold tracking-wide text-white">Masuk dengan Google</span>
                <ArrowRight size={18} className="text-white opacity-0 -ml-4 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all duration-300" />
              </div>
            </button>

            <p className="mt-8 text-center text-[10px] text-[#94A3B8] font-medium leading-relaxed">
              Dengan mengotorisasi akses, Anda menyetujui protokol enkripsi<br />dan manajemen aset digital kami.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}