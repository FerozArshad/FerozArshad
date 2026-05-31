import { prisma } from "@/lib/prisma";
import { IconArticle, IconPlus, IconEdit, IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function InsightsAdminPage() {
    const insights = await prisma.insight.findMany({
        orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }]
    });

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-2">Technical Insights</h1>
                    <p className="text-muted-foreground text-lg">Manage blog posts, thought leadership, and technical deep dives.</p>
                </div>
                <Link
                    href="/admin/insights/new"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl transition shadow-lg shadow-primary/20"
                >
                    <IconPlus className="w-5 h-5" />
                    Draft insight
                </Link>
            </div>

            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-muted/30 border-b border-border text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                                <th className="p-6">Article</th>
                                <th className="p-6">Category</th>
                                <th className="p-6 hidden md:table-cell">Status</th>
                                <th className="p-6 hidden lg:table-cell">Updated</th>
                                <th className="p-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border text-sm">
                            {insights.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center text-muted-foreground">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                                            <IconArticle className="w-8 h-8 opacity-50" />
                                        </div>
                                        <p className="text-lg font-medium text-foreground mb-1">No insights yet</p>
                                        <p>Start writing to dramatically boost your SEO footprint.</p>
                                    </td>
                                </tr>
                            ) : (
                                insights.map((insight) => (
                                    <tr key={insight.id} className="hover:bg-muted/10 transition-colors group">
                                        <td className="p-6 align-middle">
                                            <Link
                                                href={`/admin/insights/${insight.id}/edit`}
                                                className="font-bold text-foreground hover:text-primary"
                                            >
                                                {insight.title}
                                            </Link>
                                            <div className="text-xs font-mono text-muted-foreground mt-1">
                                                /insights/{insight.slug}
                                            </div>
                                        </td>
                                        <td className="p-6 align-middle text-muted-foreground">
                                            {insight.category}
                                        </td>
                                        <td className="p-6 align-middle hidden md:table-cell">
                                            {insight.publishedAt ? (
                                                <span className="px-2 py-1 rounded-md bg-green-500/10 text-green-600 dark:text-green-500 text-xs font-semibold">Live</span>
                                            ) : (
                                                <span className="px-2 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-500 text-xs font-semibold">Draft</span>
                                            )}
                                        </td>
                                        <td className="p-6 align-middle hidden lg:table-cell text-xs text-muted-foreground font-mono">
                                            {new Date(insight.updatedAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-6 align-middle">
                                            <div className="flex items-center justify-end gap-2">
                                                {insight.publishedAt && (
                                                    <Link
                                                        href={`/insights/${insight.slug}`}
                                                        target="_blank"
                                                        className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition"
                                                        title="View on site"
                                                    >
                                                        <IconExternalLink className="w-5 h-5" />
                                                    </Link>
                                                )}
                                                <Link
                                                    href={`/admin/insights/${insight.id}/edit`}
                                                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition"
                                                    title="Edit"
                                                >
                                                    <IconEdit className="w-5 h-5" />
                                                </Link>
                                            </div>
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
