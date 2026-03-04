import { prisma } from "@/lib/prisma";
import { IconMail, IconClock, IconUser, IconBriefcase } from "@tabler/icons-react";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
    const leads = await prisma.lead.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Portfolio Leads</h1>
                <p className="text-neutral-400 text-lg">Manage and review direct inquiries gathered from your architecture funnel.</p>
            </div>

            <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/5 text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                                <th className="p-6">Client / Date</th>
                                <th className="p-6 hidden md:table-cell">Contact</th>
                                <th className="p-6">Requested Service</th>
                                <th className="p-6 w-1/3">Message Context</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {leads.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-10 text-center text-neutral-500">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                                            <IconMail className="w-8 h-8 opacity-50" />
                                        </div>
                                        <p className="text-lg font-medium text-white mb-1">No leads yet</p>
                                        <p>Your database is watching for incoming transmissions.</p>
                                    </td>
                                </tr>
                            ) : (
                                leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="p-6 align-top">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                                                    {lead.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white mb-1">{lead.name}</div>
                                                    <div className="flex items-center text-xs text-neutral-500 gap-1 mt-1">
                                                        <IconClock className="w-3 h-3" />
                                                        {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                        {" • "}
                                                        {new Date(lead.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 align-top hidden md:table-cell">
                                            <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-neutral-300 hover:text-primary transition-colors mb-2 w-max">
                                                <IconMail className="w-4 h-4" />
                                                {lead.email}
                                            </a>
                                        </td>
                                        <td className="p-6 align-top">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#171717] border border-white/5 text-xs font-semibold text-neutral-300">
                                                <IconBriefcase className="w-3 h-3 text-primary" />
                                                {lead.service}
                                            </span>
                                            {/* Mobile Email Fallback */}
                                            <div className="mt-4 md:hidden">
                                                <a href={`mailto:${lead.email}`} className="text-primary hover:underline flex items-center gap-1"><IconMail className="w-4 h-4" /> Reply</a>
                                            </div>
                                        </td>
                                        <td className="p-6 align-top text-neutral-400">
                                            <div className="bg-[#111] p-4 rounded-xl border border-white/[0.03] text-sm leading-relaxed max-h-32 overflow-y-auto custom-scrollbar">
                                                {lead.message}
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
