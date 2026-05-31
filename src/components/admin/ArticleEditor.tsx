"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { IconUpload, IconDeviceFloppy, IconSend, IconTrash, IconLoader2 } from "@tabler/icons-react";
import { SectionsEditor, type Section } from "./SectionsEditor";

interface Initial {
  id?: string;
  slug?: string;
  title?: string;
  category?: string;
  excerpt?: string;
  sections?: Section[];
  coverImage?: string | null;
  coverAlt?: string | null;
  authorName?: string | null;
  authorRole?: string | null;
  readTime?: string | null;
  tags?: string | null;
  publishedAt?: Date | null;
}

interface Props {
  initial?: Initial;
  onSubmit: (form: {
    id?: string;
    title: string;
    slug?: string;
    category: string;
    excerpt?: string;
    sections: Section[];
    coverImage?: string;
    coverAlt?: string;
    authorName?: string;
    authorRole?: string;
    readTime?: string;
    tags?: string;
    publish: boolean;
  }) => Promise<void>;
  onDelete?: () => Promise<void>;
  uploadImage: (formData: FormData) => Promise<{ url: string }>;
}

export function ArticleEditor({ initial, onSubmit, onDelete, uploadImage }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [category, setCategory] = useState(initial?.category ?? "Engineering");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [sections, setSections] = useState<Section[]>(
    initial?.sections && initial.sections.length > 0
      ? initial.sections
      : [{ heading: "", body: "" }]
  );
  const [coverImage, setCoverImage] = useState(initial?.coverImage ?? "");
  const [coverAlt, setCoverAlt] = useState(initial?.coverAlt ?? "");
  const [authorName, setAuthorName] = useState(initial?.authorName ?? "Feroz Arshad");
  const [authorRole, setAuthorRole] = useState(
    initial?.authorRole ?? "Independent Engineer, Designer & Strategist"
  );
  const [readTime, setReadTime] = useState(initial?.readTime ?? "");
  const [tags, setTags] = useState(initial?.tags ?? "");

  function submit(publish: boolean) {
    setError(null);
    startTransition(async () => {
      try {
        await onSubmit({
          id: initial?.id,
          title: title.trim(),
          slug: slug.trim() || undefined,
          category: category.trim(),
          excerpt: excerpt.trim() || undefined,
          sections,
          coverImage: coverImage.trim() || undefined,
          coverAlt: coverAlt.trim() || undefined,
          authorName: authorName.trim() || undefined,
          authorRole: authorRole.trim() || undefined,
          readTime: readTime.trim() || undefined,
          tags: tags.trim() || undefined,
          publish,
        });
        // onSubmit redirects on success; if it returns we're still here
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Save failed";
        if (msg.includes("NEXT_REDIRECT")) return; // expected — server redirect
        setError(msg);
      }
    });
  }

  async function handleUpload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { url } = await uploadImage(fd);
      setCoverImage(url);
      if (!coverAlt && title) setCoverAlt(title);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function handleDelete() {
    if (!onDelete) return;
    if (!confirm("Delete this insight? This cannot be undone.")) return;
    startTransition(async () => {
      try {
        await onDelete();
        router.push("/admin/insights");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Delete failed");
      }
    });
  }

  return (
    <div className="max-w-4xl mx-auto pb-32">
      <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
        {/* LEFT — main content */}
        <div className="space-y-6">
          <Field label="Title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="The article title"
              className="w-full px-4 py-3 text-xl font-bold rounded-md bg-card border border-border text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            />
          </Field>

          <Field label="Slug" hint="URL path. Auto-generated from title if left blank.">
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="auto-from-title"
              className="w-full px-4 py-2 font-mono text-sm rounded-md bg-card border border-border text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            />
          </Field>

          <Field label="Excerpt" hint="Shown in OG previews and the list page card. Max 280 chars. Auto-generated from first section if blank.">
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              maxLength={500}
              placeholder="Short summary for previews."
              className="w-full px-4 py-2 rounded-md bg-card border border-border text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition resize-y"
            />
          </Field>

          <SectionsEditor value={sections} onChange={setSections} />
        </div>

        {/* RIGHT — sidebar settings */}
        <aside className="space-y-6 lg:sticky lg:top-6 self-start">
          <Field label="Status">
            <div className="px-3 py-2 rounded-md bg-card border border-border text-sm text-muted-foreground">
              {initial?.publishedAt ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Published — {new Date(initial.publishedAt).toLocaleDateString()}
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Draft
                </span>
              )}
            </div>
          </Field>

          <Field label="Category">
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. AI Automation"
              className="w-full px-3 py-2 rounded-md bg-card border border-border text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            />
          </Field>

          <Field label="Cover image" hint="JPG / PNG / WebP. Max 5 MB. Uploaded to Vercel Blob.">
            {coverImage ? (
              <div className="space-y-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImage}
                  alt="cover preview"
                  className="w-full aspect-video object-cover rounded-md border border-border"
                />
                <div className="flex gap-2">
                  <label className="flex-1 cursor-pointer text-center text-sm px-3 py-2 rounded-md border border-border hover:bg-muted transition">
                    Replace
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleUpload(f);
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setCoverImage("")}
                    className="px-3 py-2 rounded-md border border-border text-sm text-muted-foreground hover:text-red-500 hover:border-red-500/40 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <label className="block cursor-pointer">
                <div className="w-full aspect-video rounded-md border-2 border-dashed border-border bg-card hover:border-primary hover:bg-primary/5 transition flex flex-col items-center justify-center gap-2 text-muted-foreground">
                  {uploading ? (
                    <>
                      <IconLoader2 className="w-6 h-6 animate-spin" />
                      <span className="text-sm">Uploading…</span>
                    </>
                  ) : (
                    <>
                      <IconUpload className="w-6 h-6" />
                      <span className="text-sm">Click to upload</span>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleUpload(f);
                  }}
                />
              </label>
            )}
            <input
              value={coverAlt}
              onChange={(e) => setCoverAlt(e.target.value)}
              placeholder="Alt text"
              className="mt-2 w-full px-3 py-2 text-sm rounded-md bg-card border border-border text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            />
          </Field>

          <Field label="Author name">
            <input
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-card border border-border text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            />
          </Field>

          <Field label="Author role">
            <input
              value={authorRole}
              onChange={(e) => setAuthorRole(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-card border border-border text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            />
          </Field>

          <Field label="Read time" hint="e.g. '7 min read'. Auto-calculated if left blank.">
            <input
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              placeholder="auto"
              className="w-full px-3 py-2 rounded-md bg-card border border-border text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            />
          </Field>

          <Field label="Tags" hint="Comma-separated.">
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="ai, automation, n8n"
              className="w-full px-3 py-2 text-sm rounded-md bg-card border border-border text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            />
          </Field>
        </aside>
      </div>

      {/* Action bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 border-t border-border bg-background/90 backdrop-blur-md px-6 py-4 z-30">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          {error && (
            <div className="flex-1 text-sm text-red-500 truncate" title={error}>
              {error}
            </div>
          )}
          <div className={`flex-1 ${error ? "hidden md:block" : ""}`} />
          {onDelete && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={pending}
              className="px-4 py-2 rounded-md border border-border text-sm text-muted-foreground hover:text-red-500 hover:border-red-500/40 transition disabled:opacity-50"
            >
              <IconTrash className="w-4 h-4 inline mr-1" />
              Delete
            </button>
          )}
          <button
            type="button"
            onClick={() => submit(false)}
            disabled={pending || !title.trim()}
            className="px-4 py-2 rounded-md border border-border text-sm font-medium hover:bg-muted transition disabled:opacity-50"
          >
            <IconDeviceFloppy className="w-4 h-4 inline mr-1" />
            Save draft
          </button>
          <button
            type="button"
            onClick={() => submit(true)}
            disabled={pending || !title.trim()}
            className="px-5 py-2 rounded-md bg-primary text-white font-bold hover:bg-blue-600 transition disabled:opacity-50"
          >
            {pending ? <IconLoader2 className="w-4 h-4 inline animate-spin mr-1" /> : <IconSend className="w-4 h-4 inline mr-1" />}
            {initial?.publishedAt ? "Update" : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-foreground uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {hint && <p className="text-xs text-muted-foreground mb-2">{hint}</p>}
      {children}
    </div>
  );
}
