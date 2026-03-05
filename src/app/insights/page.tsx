import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { IconBook2 } from "@tabler/icons-react";

export const dynamic = "force-dynamic";

export default async function InsightsPage() {
    const articles = await prisma.insight.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="mb-16">
                    <h1 className="text-5xl font-extrabold mb-6 tracking-tight text-foreground">Insights & Engineering Blog</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                        Technical deep-dives into modern web architecture, AI automation logic, and scaling premium SaaS products.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 pl-2">
                    {articles.length === 0 ? (
                        <div className="col-span-2 text-center py-20">
                            <IconBook2 className="w-16 h-16 opacity-20 mx-auto mb-4 text-foreground" />
                            <h3 className="text-2xl font-bold text-foreground">No Insights Published Yet</h3>
                            <p className="text-muted-foreground mt-2">Check back soon for high-level engineering deep dives.</p>
                        </div>
                    ) : (
                        articles.map((article) => (
                            <Link key={article.id} href={`/insights/${article.slug}`} className="group block h-full">
                                <div className="h-full p-8 rounded-[2rem] bg-card border border-border hover:border-primary/50 hover:bg-accent transition duration-500 relative overflow-hidden flex flex-col">
                                    <div className="flex justify-between items-start mb-6 w-full">
                                        <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/50 transition duration-300">
                                            <IconBook2 className="w-6 h-6 text-muted-foreground group-hover:text-primary transition" />
                                        </div>
                                        <span className="text-muted-foreground text-sm font-mono border border-border px-3 py-1 rounded-full shrink-0 ml-4">
                                            {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <span className="text-primary text-xs font-bold tracking-widest uppercase mb-3 block">{article.category}</span>
                                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition duration-300 mb-4 leading-snug">
                                        {article.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm italic mt-auto pt-4 border-t border-border">
                                        Read Complete Analysis →
                                    </p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
