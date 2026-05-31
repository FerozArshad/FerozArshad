import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { createArticle, uploadCoverImage } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "New Insight" };

export default function NewInsightPage() {
  return (
    <div className="max-w-6xl mx-auto px-2">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Draft a new insight</h1>
        <p className="text-muted-foreground mt-1">Plain-text sections, cover via Vercel Blob.</p>
      </div>
      <ArticleEditor onSubmit={createArticle} uploadImage={uploadCoverImage} />
    </div>
  );
}
