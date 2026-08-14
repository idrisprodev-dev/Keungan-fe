'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Zap, LayoutDashboard, MessageSquare, FileSpreadsheet, Shield, Smartphone, PiggyBank, Users, Cpu, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <div className="min-h-screen bg-[#040B16] text-white font-sans selection:bg-[#00E5FF] selection:text-[#040B16] overflow-x-hidden">
      {/* Efek Latar Belakang */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#2962FF]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#00E5FF]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

      {/* NAVBAR */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2962FF] to-[#00E5FF] flex items-center justify-center font-black text-white">
            oD
          </div>
          <span className="text-xl font-black tracking-tighter">ohDuit<span className="text-[#00E5FF]">.id</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-[#94A3B8]">
          <Link href="#fitur" className="hover:text-white transition-colors">Fitur</Link>
          <Link href="#harga" className="hover:text-white transition-colors">Harga</Link>
          <button onClick={handleGoogleLogin} className="text-white hover:text-[#00E5FF] transition-colors">Masuk</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative z-10 px-6 md:px-12 pt-20 pb-32 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/10 text-[#00E5FF] text-xs font-bold tracking-widest uppercase mb-8">
            <Zap size={14} /> Mesin Finansial Generasi Baru
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-6">
            Kendalikan <br className="hidden md:block"/>
            Arus Kas <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2962FF] to-[#00E5FF]">Anda.</span>
          </h1>
          <p className="text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            Platform intelijen finansial yang merestrukturisasi cara Anda memantau, mengalokasikan, dan memproyeksikan aset digital Anda langsung ke Google Sheets.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm font-bold text-[#94A3B8]">
            <span className="flex items-center gap-2"><Shield size={16} className="text-[#00E5FF]"/> Enkripsi Lapis Baja</span>
            <span className="flex items-center gap-2"><FileSpreadsheet size={16} className="text-[#00E5FF]"/> Sinkronisasi Sheets</span>
          </div>
        </div>

        {/* LOGIN CARD */}
        <div className="w-full max-w-md bg-[#0A1428]/80 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-[0_0_50px_rgba(41,98,255,0.15)] relative">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#00E5FF]/20 blur-[30px] rounded-full pointer-events-none"></div>
          
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2962FF] to-[#00E5FF] flex items-center justify-center font-black text-white mx-auto mb-4 text-xl">
              oD
            </div>
            <h3 className="text-xs font-bold tracking-widest text-[#94A3B8] uppercase">Otorisasi Akses Sistem</h3>
          </div>

          <button 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-[#040B16] border border-white/10 hover:border-[#00E5FF]/50 text-white font-bold py-4 rounded-xl transition-all group"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 41.939 C -8.804 40.009 -11.514 38.989 -14.754 38.989 C -19.444 38.989 -23.494 41.689 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            Masuk dengan Google
          </button>
          <p className="text-[10px] text-center text-[#94A3B8] mt-6 px-4">
            Dengan mengotorisasi akses, Anda menyetujui protokol enkripsi dan manajemen aset digital kami.
          </p>
        </div>
      </section>

      {/* FEATURE HIGHLIGHTS */}
      <section id="fitur" className="relative z-10 bg-[#0A1428] border-y border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">Otomatisasi Tanpa Batas.</h2>
            <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">Kami tidak hanya mencatat. Kami mengelola, memisahkan, dan memproyeksikan keuangan Anda secara otonom.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#040B16] border border-white/5 p-8 rounded-3xl hover:border-[#00E5FF]/30 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#10B981] flex items-center justify-center text-white mb-6 shadow-[0_10px_20px_rgba(16,185,129,0.2)]">
                  <FileSpreadsheet size={28} />
                </div>
                <h3 className="text-xl font-black text-white mb-3">Google Sheets = Pusat Data</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">
                  Semua data di Sheets kamu, bukan server kami. Olah, filter, dashboard sesuka hati.
                </p>
              </div>
            </div>

            <div className="bg-[#040B16] border border-white/5 p-8 rounded-3xl hover:border-[#00E5FF]/30 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2962FF] to-[#00E5FF] flex items-center justify-center text-white mb-6 shadow-[0_10px_20px_rgba(41,98,255,0.2)]">
                <FileSpreadsheet size={28} />
              </div>
              <h3 className="text-xl font-black text-white mb-3">Multi-Sheet Routing</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Kelola bisnis dan pribadi tanpa tercampur. Arahkan transaksi ke Google Sheets "Toko Baju" atau "Pribadi" dalam satu ketukan.</p>
            </div>
            
            <div className="bg-[#040B16] border border-white/5 p-8 rounded-3xl hover:border-[#00E5FF]/30 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#B388FF] flex items-center justify-center text-white mb-6 shadow-[0_10px_20px_rgba(0,229,255,0.2)]">
                <MessageSquare size={28} />
              </div>
              <h3 className="text-xl font-black text-white mb-3">Input Cepat WhatsApp</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Ketik "Grab 15k transport" di WhatsApp, dan biarkan AI kami mengkategorikan dan menyuntikkannya ke Spreadsheet Anda.</p>
            </div>

            <div className="bg-[#040B16] border border-white/5 p-8 rounded-3xl hover:border-[#00E5FF]/30 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#3B82F6] flex items-center justify-center text-white mb-6 shadow-[0_10px_20px_rgba(16,185,129,0.2)]">
                <PiggyBank size={28} />
              </div>
              <h3 className="text-xl font-black text-white mb-3">Tabungan Pintar (Auto-Sweep)</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Potong otomatis sekian persen dari pemasukan baru dan proyeksikan tanggal pasti tercapainya target tabungan Anda.</p>
            </div>

            <div className="bg-[#040B16] border border-white/5 p-8 rounded-3xl hover:border-[#00E5FF]/30 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#EF4444] flex items-center justify-center text-white mb-6 shadow-[0_10px_20px_rgba(245,158,11,0.2)]">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-black text-white mb-3">Role-Based Access</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Berikan akses khusus kepada staf untuk mencatat transaksi harian tanpa bisa melihat total saldo rahasia perusahaan.</p>
            </div>

            <div className="bg-[#040B16] border border-white/5 p-8 rounded-3xl hover:border-[#00E5FF]/30 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white mb-6 shadow-[0_10px_20px_rgba(139,92,246,0.2)]">
                <Cpu size={28} />
              </div>
              <h3 className="text-xl font-black text-white mb-3">Magic Formula Sync</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Aplikasi membaca rumus VLOOKUP/SUMIFS custom buatan Anda di Google Sheets dan menampilkannya langsung di Dashboard.</p>
            </div>

          </div>
        </div>
      </section>

      {/* PRICING SECTION DENGAN TOGGLE BULANAN/TAHUNAN & INFO HARGA NORMAL */}
      <section id="harga" className="relative z-10 py-24">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          
          {/* Header & Toggle Switcher */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles size={14}/> Fase 1: Early Bird (Khusus 500 Pengguna Pertama)
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">Investasi Terjangkau.</h2>
            <p className="text-[#94A3B8] text-lg mb-8">Harga otomatis naik ke tarif normal setelah kuota 500 pengguna terpenuhi.</p>
            
            {/* Tombol Pemisah Bulanan & Tahunan */}
            <div className="inline-flex p-1.5 bg-[#0A1428] border border-white/10 rounded-2xl">
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${billingCycle === 'monthly' ? 'bg-[#00E5FF] text-[#040B16] shadow-[0_0_20px_rgba(0,229,255,0.4)]' : 'text-[#94A3B8] hover:text-white'}`}
              >
                Bulanan
              </button>
              <button 
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${billingCycle === 'yearly' ? 'bg-[#00E5FF] text-[#040B16] shadow-[0_0_20px_rgba(0,229,255,0.4)]' : 'text-[#94A3B8] hover:text-white'}`}
              >
                Tahunan <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full ml-1">Hemat 2 Bln</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* PRO TIER */}
            <div className="bg-[#0A1428] border border-white/10 rounded-[2rem] p-8 md:p-10 flex flex-col relative overflow-hidden">
              <h3 className="text-2xl font-black mb-2 text-white">Pro</h3>
              <p className="text-[#94A3B8] text-sm mb-6 h-10">Kecepatan pencatatan maksimal untuk individu & pekerja lepas.</p>
              
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-black">
                  {billingCycle === 'monthly' ? 'Rp 10.000' : 'Rp 100.000'}
                </span>
                <span className="text-[#94A3B8]">/{billingCycle === 'monthly' ? 'bulan' : 'tahun'}</span>
              </div>
              
              {/* Info Harga Normal (Akan naik ke Rp 20rb/bln atau Rp 199rb/thn setelah kuota habis) */}
              <p className="text-xs text-amber-400 font-semibold mb-8">
                ⚠️ Harga Normal setelah 500 pengguna: <span className="line-through">{billingCycle === 'monthly' ? 'Rp 20.000/bln' : 'Rp 199.000/thn'}</span> (Anda hemat 50%!)
              </p>
              
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-start gap-3 text-sm text-[#94A3B8]"><CheckCircle2 size={18} className="text-[#00E5FF] shrink-0"/> Koneksi 1 File Google Sheets</li>
                <li className="flex items-start gap-3 text-sm text-[#94A3B8]"><CheckCircle2 size={18} className="text-[#00E5FF] shrink-0"/> Smart Rules (Auto-Kategori)</li>
                <li className="flex items-start gap-3 text-sm text-[#94A3B8]"><CheckCircle2 size={18} className="text-[#00E5FF] shrink-0"/> Tabungan Terfokus (Maks 3 Tujuan)</li>
                <li className="flex items-start gap-3 text-sm text-[#94A3B8]"><CheckCircle2 size={18} className="text-[#00E5FF] shrink-0"/> Custom Widget Dashboard</li>
              </ul>
              <button onClick={handleGoogleLogin} className="w-full py-4 rounded-xl border border-white/20 hover:bg-white/5 font-bold transition-colors">
                Mulai Pro
              </button>
            </div>

            {/* PLATINUM TIER */}
            <div className="bg-gradient-to-b from-[#0A1428] to-[#040B16] border border-[#00E5FF]/50 rounded-[2rem] p-8 md:p-10 flex flex-col relative overflow-hidden shadow-[0_0_40px_rgba(0,229,255,0.15)]">
              <div className="absolute top-0 right-0 bg-[#00E5FF] text-[#040B16] text-[10px] font-black uppercase tracking-widest py-1.5 px-4 rounded-bl-xl">Pilihan Pebisnis</div>
              
              <h3 className="text-2xl font-black mb-2 text-[#00E5FF]">Platinum</h3>
              <p className="text-[#94A3B8] text-sm mb-6 h-10">Mini-ERP lengkap untuk UMKM dan Pengelola Dana.</p>
              
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-black text-white">
                  {billingCycle === 'monthly' ? 'Rp 29.000' : 'Rp 290.000'}
                </span>
                <span className="text-[#94A3B8]">/{billingCycle === 'monthly' ? 'bulan' : 'tahun'}</span>
              </div>

              {/* Info Harga Normal (Akan naik ke Rp 35rb/bln atau Rp 349rb/thn setelah kuota habis) */}
              <p className="text-xs text-amber-400 font-semibold mb-8">
                ⚠️ Harga Normal setelah 500 pengguna: <span className="line-through">{billingCycle === 'monthly' ? 'Rp 35.000/bln' : 'Rp 349.000/thn'}</span>
              </p>
              
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-start gap-3 text-sm text-white"><CheckCircle2 size={18} className="text-[#00E5FF] shrink-0"/> Multi-Sheet Routing (Maks 3 Sheets)</li>
                <li className="flex items-start gap-3 text-sm text-white"><CheckCircle2 size={18} className="text-[#00E5FF] shrink-0"/> Input via WhatsApp Bot</li>
                <li className="flex items-start gap-3 text-sm text-white"><CheckCircle2 size={18} className="text-[#00E5FF] shrink-0"/> Tabungan Pintar (Auto-Sweep & Proyeksi)</li>
                <li className="flex items-start gap-3 text-sm text-white"><CheckCircle2 size={18} className="text-[#00E5FF] shrink-0"/> Role-Based Access (Akun Karyawan)</li>
                <li className="flex items-start gap-3 text-sm text-white"><CheckCircle2 size={18} className="text-[#00E5FF] shrink-0"/> Magic Formula Sync (Baca Rumus Kustom)</li>
              </ul>
              <button onClick={handleGoogleLogin} className="w-full py-4 rounded-xl bg-gradient-to-r from-[#2962FF] to-[#00E5FF] hover:opacity-90 text-white font-bold transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                Ambil Platinum
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 text-center text-sm text-[#94A3B8]">
        <p>&copy; {new Date().getFullYear()} ohDuit.id. Merestrukturisasi Arus Kas Anda.</p>
      </footer>
    </div>
  );
}