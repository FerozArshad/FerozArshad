"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconDashboard, IconBriefcase, IconArticle, IconSettings, IconLogout, IconTools } from '@tabler/icons-react';

const navItems = [
    { name: 'Dashboard', href: '/admin', icon: IconDashboard },
    { name: 'Portfolios', href: '/admin/portfolios', icon: IconBriefcase },
    { name: 'Services', href: '/admin/services', icon: IconTools },
    { name: 'Insights', href: '/admin/insights', icon: IconArticle },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Do not show sidebar on the login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    return (
        <div className="flex h-screen bg-[#050505] text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-black border-r border-white/5 flex flex-col">
                <div className="p-6 border-b border-white/5 mb-6">
                    <span className="text-xl font-bold tracking-tight text-white block">Admin CMS</span>
                    <span className="text-xs text-primary font-mono mt-1 block">Feroz Arshad</span>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition duration-300 ${isActive ? 'bg-primary/10 text-primary font-bold' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button onClick={() => { document.cookie = 'admin_session=; Max-Age=0; path=/;'; window.location.href = '/admin/login'; }} className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition duration-300">
                        <IconLogout className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-10 bg-[#050505]">
                {children}
            </main>
        </div>
    );
}
