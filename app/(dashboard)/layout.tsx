import Navigation from '@/components/layout/Navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#040B16] text-white font-sans">
      {/* Sidebar Navigation */}
      <Navigation />
      
      {/* 
        Area Konten Utama 
        md:pl-28 berfungsi untuk mendorong konten ke kanan sejauh lebar sidebar di layar desktop.
        pb-24 berfungsi memberi ruang di bawah agar tidak tertutup navigasi mobile.
      */}
      <main className="flex-1 w-full md:pl-28 pb-24 md:pb-0 overflow-x-hidden relative">
        {children}
      </main>
    </div>
  );
}