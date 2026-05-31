import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { IconBook2 } from "@tabler/icons-react";

// ISR — picks up newly published insights within an hour without a redeploy.
// Server-action revalidatePath('/insights') from /admin invalidates immediately.
export const revalidate = 3600;

function plain(s: string): string {
    return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function excerptFor(row: { excerpt: string | null; sections: unknown; content: string }, max = 160): string {
    if (row.excerpt?.trim()) return row.excerpt.trim().slice(0, max);
    if (Array.isArray(row.sections)) {
        const first = (row.sections as { body?: string }[]).find((s) => s?.body)?.body ?? "";
        const p = plain(first);
        if (p) return p.length <= max ? p : p.slice(0, max - 1).trimEnd() + "…";
    }
    if (row.content) {
        const p = plain(row.content);
        return p.length <= max ? p : p.slice(0, max - 1).trimEnd() + "…";
    }
    return "";
}

export default async function InsightsPage() {
    const articles = await prisma.insight
        .findMany({
            where: { publishedAt: { not: null } },
            orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        })
        .catch(() => []);

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

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {articles.length === 0 ? (
                        <div className="col-span-2 text-center py-20">
                            <IconBook2 className="w-16 h-16 opacity-20 mx-auto mb-4 text-foreground" />
                            <h3 className="text-2xl font-bold text-foreground">No insights published yet</h3>
                            <p className="text-muted-foreground mt-2">Check back soon.</p>
                        </div>
                    ) : (
                        articles.map((article) => {
                            const excerpt = excerptFor(article);
                            const date = (article.publishedAt ?? article.createdAt);
                            return (
                                <Link key={article.id} href={`/insights/${article.slug}`} className="group block h-full">
                                    <article className="h-full rounded-[2rem] bg-card border border-border hover:border-primary/50 transition duration-500 overflow-hidden flex flex-col">
                                        {article.coverImage ? (
                                            <div className="relative aspect-video w-full overflow-hidden">
                                                <Image
                                                    src={article.coverImage}
                                                    alt={article.coverAlt || article.title}
                                                    fill
                                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                                                />
                                            </div>
                                        ) : (
                                            <div className="aspect-video w-full bg-gradient-to-br from-primary/10 to-muted flex items-center justify-center">
                                                <IconBook2 className="w-12 h-12 text-primary/40" />
                                            </div>
                                        )}
                                        <div className="p-8 flex-1 flex flex-col">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-primary text-xs font-bold tracking-widest uppercase">
                                                    {article.category}
                                                </span>
                                                <span className="text-muted-foreground text-xs font-mono">
                                                    {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition duration-300 mb-3 leading-snug">
                                                {article.title}
                                            </h3>
                                            {excerpt && (
                                                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                                                    {excerpt}
                                                </p>
                                            )}
                                            <p className="text-muted-foreground text-sm italic mt-auto pt-4 border-t border-border">
                                                Read complete analysis →
                                            </p>
                                        </div>
                                    </article>
                                </Link>
                            );
                        })
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
