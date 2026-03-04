import { prisma } from "@/lib/prisma";
import { IconBriefcase, IconArticle, IconTools, IconUsers } from "@tabler/icons-react";

export const dynamic = "force-dynamic"; // Ensure dashboard stats are always up to date

export default async function AdminDashboard() {
    // Fetch Quick Stats concurrently to avoid waterfalls
    const [projectCount, serviceCount, insightCount, userCount, leadCount] = await Promise.all([
        prisma.project.count(),
        prisma.service.count(),
        prisma.insight.count(),
        prisma.user.count(),
        prisma.lead.count()
    ]);

    const stats = [
        { title: "Total Case Studies", count: projectCount, icon: IconBriefcase, color: "text-blue-500", bg: "bg-blue-500/10" },
        { title: "Active Services", count: serviceCount, icon: IconTools, color: "text-green-500", bg: "bg-green-500/10" },
        { title: "Portfolio Leads", count: leadCount, icon: IconUsers, color: "text-green-400", bg: "bg-green-400/10" },
        { title: "Published Insights", count: insightCount, icon: IconArticle, color: "text-purple-500", bg: "bg-purple-500/10" }
    ];

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Welcome Back, Feroz.</h1>
            <p className="text-neutral-400 mb-10 text-lg">Here is the current status of your portfolio architecture.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 flex items-center gap-6">
                        <div className={`p-4 rounded-xl ${stat.bg}`}>
                            <stat.icon className={`w-8 h-8 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white mb-1">{stat.count}</p>
                            <p className="text-sm font-medium text-neutral-500 tracking-wide uppercase">{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/5">
                <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
                <p className="text-neutral-400 mb-6">Manage your core data models directly connected to your Hostinger MariaDB server.</p>

                <div className="grid md:grid-cols-3 gap-6">
                    <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl transition font-medium border border-white/10 text-sm tracking-wide">
                        + Create New Case Study
                    </button>
                    <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl transition font-medium border border-white/10 text-sm tracking-wide">
                        + Draft Insight Article
                    </button>
                    <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl transition font-medium border border-white/10 text-sm tracking-wide">
                        + Add New Tech Service
                    </button>
                </div>
            </div>
        </div>
    );
}
