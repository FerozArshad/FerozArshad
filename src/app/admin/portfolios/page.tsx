import { prisma } from "@/lib/prisma";
import { IconBriefcase, IconPlus, IconExternalLink, IconEdit } from "@tabler/icons-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PortfoliosPage() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-2">Case Studies</h1>
                    <p className="text-muted-foreground text-lg">Manage the high-conversion projects displayed on your public portfolio.</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-3 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl transition shadow-lg shadow-primary/20">
                    <IconPlus className="w-5 h-5" />
                    New Project
                </button>
            </div>

            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-muted/30 border-b border-border text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                                <th className="p-6">Project Title</th>
                                <th className="p-6">Category</th>
                                <th className="p-6 hidden md:table-cell">Outcome</th>
                                <th className="p-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border text-sm">
                            {projects.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-10 text-center text-muted-foreground">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                                            <IconBriefcase className="w-8 h-8 opacity-50" />
                                        </div>
                                        <p className="text-lg font-medium text-foreground mb-1">No case studies found</p>
                                        <p>Add your first successful project to the database.</p>
                                    </td>
                                </tr>
                            ) : (
                                projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-muted/10 transition-colors group">
                                        <td className="p-6 align-middle font-bold text-foreground">
                                            {project.title}
                                            {project.featured && <span className="ml-3 px-2 py-0.5 rounded text-[10px] uppercase tracking-wide bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border border-yellow-500/20">Featured</span>}
                                        </td>
                                        <td className="p-6 align-middle text-muted-foreground">
                                            {project.category}
                                        </td>
                                        <td className="p-6 align-middle text-muted-foreground hidden md:table-cell max-w-[200px] truncate">
                                            {project.outcome}
                                        </td>
                                        <td className="p-6 align-middle text-right flex items-center justify-end gap-3">
                                            <Link href={`/portfolio/${project.slug}`} target="_blank" className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition">
                                                <IconExternalLink className="w-5 h-5" />
                                            </Link>
                                            <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition">
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
