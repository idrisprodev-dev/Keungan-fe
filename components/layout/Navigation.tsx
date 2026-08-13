'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wallet, ArrowRightLeft, PieChart, Target, Plus } from 'lucide-react';
import TransactionModal from '../features/TransactionModal';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuItems = [
    { icon: Wallet, href: '/dashboard', label: 'Hub' },
    { icon: ArrowRightLeft, href: '/(dashboard)/transactions', label: 'Tabungan' },
    { icon: PieChart, href: '/(dashboard)/categories', label: 'Kategori' },
    { icon: Target, href: '/(dashboard)/goals', label: 'Target' },
  ];

  return (
    <>
      {/* Modal Transaction */}
      <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* DESKTOP: Floating Capsule */}
      <nav className="hidden md:flex flex-col fixed left-6 top-6 bottom-6 w-20 bg-[#0A1428]/60 backdrop-blur-2xl border border-white/5 rounded-3xl py-8 items-center justify-between z-50 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        
        {/* Logo Murni */}
        <div className="font-black text-2xl text-white tracking-tighter cursor-default">
          o<span className="text-[#00E5FF]">D</span>
        </div>
        
        {/* Rantai Menu */}
        <div className="flex flex-col gap-6 w-full px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="group relative flex justify-center">
                <div className={`relative p-3 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'text-[#00E5FF] scale-110' 
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                }`}>
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  {/* Active Glow Indicator */}
                  {isActive && (
                    <div className="absolute inset-0 bg-[#00E5FF]/20 blur-md rounded-2xl -z-10" />
                  )}
                </div>
                
                {/* Minimalist Tooltip */}
                <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-[#0A1428] border border-[#2962FF]/30 text-white text-xs font-bold tracking-widest uppercase px-3 py-2 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-2xl">
                  {item.label}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Primary Floating Action */}
        <div className="px-3 w-full">
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="w-full relative group flex justify-center items-center p-3 bg-gradient-to-b from-[#2962FF] to-[#1E40AF] text-white rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(41,98,255,0.4)] border border-[#00E5FF]/30"
          >
            <Plus size={24} strokeWidth={3} />
            <div className="absolute inset-0 bg-[#00E5FF] opacity-0 group-hover:opacity-20 blur-md rounded-2xl transition-opacity duration-300" />
          </button>
        </div>
      </nav>

      {/* MOBILE: Holographic Dock */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 bg-[#0A1428]/80 backdrop-blur-2xl border border-white/5 rounded-3xl h-16 z-50 shadow-[0_20px_40px_rgba(0,0,0,0.8)] px-6 flex justify-between items-center">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="relative p-2">
              <Icon 
                size={24} 
                strokeWidth={isActive ? 2.5 : 2} 
                className={`transition-all duration-300 ${isActive ? 'text-[#00E5FF] -translate-y-1' : 'text-[#94A3B8]'}`} 
              />
              {isActive && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#00E5FF] rounded-full shadow-[0_0_10px_#00E5FF]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Modal Transaction */}
      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}