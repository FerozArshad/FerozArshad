import { prisma } from "@/lib/prisma";
import { IconArticle, IconPlus, IconEdit } from "@tabler/icons-react";

export const dynamic = "force-dynamic";

export default async function InsightsPage() {
    const insights = await prisma.insight.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Technical Insights</h1>
                    <p className="text-neutral-400 text-lg">Manage blog posts, thought leadership, and technical deep dives.</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-3 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl transition shadow-lg shadow-primary/20">
                    <IconPlus className="w-5 h-5" />
                    Draft Insight
                </button>
            </div>

            <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/5 text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                                <th className="p-6">Article Title</th>
                                <th className="p-6">Category</th>
                                <th className="p-6 hidden md:table-cell">Status</th>
                                <th className="p-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {insights.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-10 text-center text-neutral-500">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                                            <IconArticle className="w-8 h-8 opacity-50" />
                                        </div>
                                        <p className="text-lg font-medium text-white mb-1">No insights published</p>
                                        <p>Start writing to dramatically boost your SEO footprint.</p>
                                    </td>
                                </tr>
                            ) : (
                                insights.map((insight) => (
                                    <tr key={insight.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="p-6 align-middle font-bold text-white">
                                            {insight.title}
                                        </td>
                                        <td className="p-6 align-middle text-neutral-400">
                                            {insight.category}
                                        </td>
                                        <td className="p-6 align-middle hidden md:table-cell">
                                            {insight.publishedAt ? (
                                                <span className="px-2 py-1 rounded-md bg-green-500/10 text-green-500 text-xs font-semibold">Live</span>
                                            ) : (
                                                <span className="px-2 py-1 rounded-md bg-neutral-800 text-neutral-400 text-xs font-semibold">Draft</span>
                                            )}
                                        </td>
                                        <td className="p-6 align-middle text-right flex items-center justify-end gap-3">
                                            <button className="p-2 text-neutral-500 hover:text-primary hover:bg-primary/10 rounded-lg transition">
                                                <IconEdit className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
