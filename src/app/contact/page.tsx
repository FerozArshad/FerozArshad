import { Navbar } from "@/components/Navbar";
import { LeadForm } from "@/components/LeadForm";

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                    <h1 className="text-5xl font-bold mb-6">Start a Project</h1>
                    <p className="text-xl text-neutral-400 mb-8">
                        Whether you need a massive E-Commerce overhaul or an autonomous n8n pipeline, let's discuss your architecture.
                    </p>
                    <div className="space-y-6 text-neutral-400">
                        <div className="flex items-center gap-4">
                            <span className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </span>
                            <span>info@ferozarshad.com</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-white text-xs font-bold">
                                24/7
                            </span>
                            <span>Global Support & Monitoring</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 w-full">
                    <LeadForm />
                </div>
            </div>
        </>
    );
}
