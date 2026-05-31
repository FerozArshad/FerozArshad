"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconDashboard, IconBriefcase, IconArticle, IconSettings, IconLogout, IconTools, IconUsers, IconChartBar } from '@tabler/icons-react';

const navItems = [
    { name: 'Dashboard', href: '/admin', icon: IconDashboard },
    { name: 'Analytics', href: '/admin/analytics', icon: IconChartBar },
    { name: 'Portfolio Leads', href: '/admin/leads', icon: IconUsers },
    { name: 'Case Studies', href: '/admin/portfolios', icon: IconBriefcase },
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
        <div className="flex h-screen bg-background text-foreground transition-colors duration-300">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r border-border flex flex-col transition-colors duration-300">
                <div className="p-6 border-b border-border mb-6">
                    <span className="text-xl font-bold tracking-tight text-foreground block">Admin CMS</span>
                    <span className="text-xs text-primary font-mono mt-1 block">Feroz Arshad</span>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition duration-300 ${isActive ? 'bg-primary/10 text-primary font-bold' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-border">
                    <button onClick={() => { document.cookie = 'admin_session=; Max-Age=0; path=/;'; window.location.href = '/admin/login'; }} className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition duration-300">
                        <IconLogout className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-10 bg-background transition-colors duration-300">
                {children}
            </main>
        </div>
    );
}
