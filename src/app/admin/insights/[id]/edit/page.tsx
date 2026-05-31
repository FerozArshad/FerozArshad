import { notFound } from "next/navigation";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import {
  getArticleById,
  updateArticle,
  deleteArticle,
  uploadCoverImage,
  type Section,
} from "../../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit Insight" };

export default async function EditInsightPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) notFound();

  // Coerce JSON sections → Section[] (Prisma returns unknown JSON shape)
  let sections: Section[] = [];
  if (article.sections && Array.isArray(article.sections)) {
    sections = (article.sections as unknown as Section[]).filter(
      (s) => s && typeof s === "object" && (s.heading || s.body)
    );
  }
  // Backfill from legacy `content` if no sections yet
  if (sections.length === 0 && article.content) {
    sections = [{ heading: "", body: article.content }];
  }

  async function update(form: Parameters<typeof updateArticle>[0]) {
    "use server";
    return updateArticle({ ...form, id });
  }
  async function destroy() {
    "use server";
    return deleteArticle(id);
  }

  return (
    <div className="max-w-6xl mx-auto px-2">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Edit insight</h1>
        <p className="text-muted-foreground mt-1 font-mono text-sm">/insights/{article.slug}</p>
      </div>
      <ArticleEditor
        initial={{
          id: article.id,
          slug: article.slug,
          title: article.title,
          category: article.category,
          excerpt: article.excerpt ?? "",
          sections,
          coverImage: article.coverImage,
          coverAlt: article.coverAlt,
          authorName: article.authorName,
          authorRole: article.authorRole,
          readTime: article.readTime,
          tags: article.tags,
          publishedAt: article.publishedAt,
        }}
        onSubmit={update}
        onDelete={destroy}
        uploadImage={uploadCoverImage}
      />
    </div>
  );
}
