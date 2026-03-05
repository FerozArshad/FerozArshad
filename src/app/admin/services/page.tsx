import { prisma } from "@/lib/prisma";
import { IconTools, IconPlus, IconEdit } from "@tabler/icons-react";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
    const services = await prisma.service.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-2">Services Architecture</h1>
                    <p className="text-muted-foreground text-lg">Define the core SaaS and AI automation offerings presented to prospects.</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-3 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl transition shadow-lg shadow-primary/20">
                    <IconPlus className="w-5 h-5" />
                    Add Service
                </button>
            </div>

            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-muted/30 border-b border-border text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                                <th className="p-6">Service Title</th>
                                <th className="p-6 hidden md:table-cell w-1/2">Description</th>
                                <th className="p-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border text-sm">
                            {services.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="p-10 text-center text-muted-foreground">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                                            <IconTools className="w-8 h-8 opacity-50" />
                                        </div>
                                        <p className="text-lg font-medium text-foreground mb-1">No services defined</p>
                                        <p>Create service cards to populate your funnel.</p>
                                    </td>
                                </tr>
                            ) : (
                                services.map((service) => (
                                    <tr key={service.id} className="hover:bg-muted/10 transition-colors group">
                                        <td className="p-6 align-middle font-bold text-foreground">
                                            {service.title}
                                        </td>
                                        <td className="p-6 align-middle text-muted-foreground hidden md:table-cell">
                                            <div className="max-w-lg truncate">{service.description}</div>
                                        </td>
                                        <td className="p-6 align-middle text-right flex items-center justify-end gap-3">
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
