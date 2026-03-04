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
                    <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Case Studies</h1>
                    <p className="text-neutral-400 text-lg">Manage the high-conversion projects displayed on your public portfolio.</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-3 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl transition shadow-lg shadow-primary/20">
                    <IconPlus className="w-5 h-5" />
                    New Project
                </button>
            </div>

            <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/5 text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                                <th className="p-6">Project Title</th>
                                <th className="p-6">Category</th>
                                <th className="p-6 hidden md:table-cell">Outcome</th>
                                <th className="p-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {projects.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-10 text-center text-neutral-500">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                                            <IconBriefcase className="w-8 h-8 opacity-50" />
                                        </div>
                                        <p className="text-lg font-medium text-white mb-1">No case studies found</p>
                                        <p>Add your first successful project to the database.</p>
                                    </td>
                                </tr>
                            ) : (
                                projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="p-6 align-middle font-bold text-white">
                                            {project.title}
                                            {project.featured && <span className="ml-3 px-2 py-0.5 rounded text-[10px] uppercase tracking-wide bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">Featured</span>}
                                        </td>
                                        <td className="p-6 align-middle text-neutral-400">
                                            {project.category}
                                        </td>
                                        <td className="p-6 align-middle text-neutral-400 hidden md:table-cell max-w-[200px] truncate">
                                            {project.outcome}
                                        </td>
                                        <td className="p-6 align-middle text-right flex items-center justify-end gap-3">
                                            <Link href={`/portfolio/${project.slug}`} target="_blank" className="p-2 text-neutral-500 hover:text-white hover:bg-white/10 rounded-lg transition">
                                                <IconExternalLink className="w-5 h-5" />
                                            </Link>
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
