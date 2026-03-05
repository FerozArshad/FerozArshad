import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { IconArrowLeft, IconCalendar, IconFolder } from "@tabler/icons-react";
import Link from "next/link";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const insight = await prisma.insight.findUnique({
        where: { slug: params.slug },
    });

    if (!insight) return {};

    return {
        title: `${insight.title} | Feroz Arshad Insights`,
        description: insight.content.substring(0, 160) + "...",
        openGraph: {
            title: insight.title,
            description: insight.content.substring(0, 160) + "...",
        }
    };
}

export default async function InsightPost({ params }: { params: { slug: string } }) {
    const insight = await prisma.insight.findUnique({
        where: { slug: params.slug }
    });

    if (!insight) {
        notFound();
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-32 pb-20 relative">
                {/* Decorative Background Element */}
                <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-primary/5 to-transparent -z-10 pointer-events-none"></div>

                <div className="max-w-4xl mx-auto px-4">
                    <Link href="/insights" className="inline-flex items-center gap-2 text-primary hover:text-blue-400 transition-colors mb-8 font-semibold text-sm uppercase tracking-wider">
                        <IconArrowLeft className="w-4 h-4" />
                        Back to Engineering Blog
                    </Link>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-8">
                        {insight.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-b border-border pb-8 mb-10">
                        <div className="flex items-center gap-2">
                            <IconCalendar className="w-5 h-5 text-primary" />
                            <span>{new Date(insight.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <IconFolder className="w-5 h-5 text-primary" />
                            <span className="uppercase tracking-wide text-sm font-semibold">{insight.category}</span>
                        </div>
                    </div>

                    <article className="prose prose-invert prose-lg max-w-none text-foreground prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-blue-400 prose-p:leading-relaxed">
                        {/* We are aggressively rendering the DB payload here. */}
                        <div dangerouslySetInnerHTML={{ __html: insight.content.replace(/\n/g, '<br/>') }} />
                    </article>
                </div>
            </main>
            <Footer />
        </>
    );
}
