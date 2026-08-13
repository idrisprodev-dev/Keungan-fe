    import Link from 'next/link';
    import { usePathname } from 'next/navigation';
    import { ReactNode } from 'react';

    interface SidebarItemProps {
    label: string;
    href: string;
    icon: ReactNode;
    }

    export default function SidebarItem({ label, href, icon }: SidebarItemProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link 
        href={href}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive 
            ? 'bg-slate-800 text-emerald-400 font-bold' 
            : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
        }`}
        >
        <div className={`${isActive ? 'text-emerald-400' : 'text-slate-500'}`}>
            {icon}
        </div>
        <span className="text-sm">{label}</span>
        </Link>
    );
    }