import { Navbar } from "@/components/Navbar";
import { portfolioData } from "@/data/portfolioData";
import { notFound } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

export const dynamic = "force-static";

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
    const study = portfolioData.find((p) => p.slug === params.slug);

    if (!study) {
        notFound();
    }

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-12">
                <Link href="/portfolio" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-12">
                    <IconArrowLeft size={20} />
                    <span>Back to Portfolio</span>
                </Link>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 relative">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8">
                        <span className="text-primary text-sm font-bold tracking-widest uppercase mb-4 block">{study.category}</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight">{study.title}</h1>

                        {/* Hero Abstract Image */}
                        <div className="w-full h-[40vh] md:h-[50vh] rounded-[2rem] bg-muted mb-16 flex items-center justify-center relative overflow-hidden border border-border">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                            <span className="text-muted-foreground font-mono tracking-widest uppercase">[Visual abstract: {study.slug}]</span>
                        </div>

                        <div className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground">
                            <h2 className="text-2xl font-bold mt-12 mb-6">1. The Problem</h2>
                            <p className="text-muted-foreground leading-relaxed mb-12">
                                {study.problem}
                            </p>

                            <h2 className="text-2xl font-bold mt-12 mb-6">2. The Solution & Architecture</h2>
                            <p className="text-muted-foreground leading-relaxed mb-12">
                                {study.solution}
                            </p>

                            <div className="w-full py-24 bg-muted rounded-[2rem] mb-12 flex items-center justify-center border border-border">
                                <span className="text-muted-foreground font-mono">[Technical Architecture Diagram]</span>
                            </div>

                            <h2 className="text-2xl font-bold mt-12 mb-6 text-primary">3. The Outcome & ROI</h2>
                            <p className="text-foreground text-xl leading-relaxed max-w-3xl font-medium border-l-4 border-primary pl-6 py-2">
                                {study.outcome}
                            </p>
                        </div>
                    </div>

                    {/* Sticky Sidebar */}
                    <div className="lg:col-span-4 mt-12 lg:mt-0">
                        <div className="sticky top-32 p-8 rounded-[2rem] bg-card border border-border shadow-2xl">
                            <h3 className="text-xl font-bold mb-8 border-b border-border pb-4">Project Details</h3>

                            <div className="space-y-6">
                                <div>
                                    <span className="block text-muted-foreground text-sm mb-1 uppercase tracking-wider">Role</span>
                                    <span className="font-semibold text-foreground">{study.role}</span>
                                </div>
                                <div>
                                    <span className="block text-muted-foreground text-sm mb-1 uppercase tracking-wider">Timeline</span>
                                    <span className="font-semibold text-foreground">{study.timeline}</span>
                                </div>
                                <div>
                                    <span className="block text-muted-foreground text-sm mb-3 uppercase tracking-wider">Tech Stack</span>
                                    <div className="flex flex-wrap gap-2">
                                        {study.techStack.map(tech => (
                                            <span key={tech} className="px-3 py-1 rounded-lg bg-muted border border-border text-sm text-muted-foreground">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-border">
                                <p className="text-sm text-muted-foreground mb-4">Want something similar for your business?</p>
                                <Link href="/contact" className="block w-full text-center bg-foreground text-background font-bold py-3 rounded-xl hover:bg-neutral-200 transition">
                                    Discuss Architecture
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// Generate static params for 100% PageSpeed
export async function generateStaticParams() {
    return portfolioData.map((study) => ({
        slug: study.slug,
    }));
}
