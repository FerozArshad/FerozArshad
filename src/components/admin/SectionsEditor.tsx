"use client";

import { useState } from "react";
import { IconPlus, IconTrash, IconArrowUp, IconArrowDown } from "@tabler/icons-react";

export type Section = { heading: string; body: string };

interface Props {
  value: Section[];
  onChange: (next: Section[]) => void;
}

/**
 * Multi-section editor per Spenzio playbook (`04_BLOG_CMS_ADMIN_PORTAL.md`):
 *  - Plain textarea for body (NOT a rich-text/HTML editor).
 *  - Public page renders sections with `whitespace-pre-line`.
 *  - Add / remove / move up / move down per section.
 *
 * "Article bodies are stored and rendered as plain text. Do NOT use an HTML
 *  rich editor — its output renders as literal tags on the public page."
 */
export function SectionsEditor({ value, onChange }: Props) {
  const sections = value.length > 0 ? value : [{ heading: "", body: "" }];

  function update(i: number, patch: Partial<Section>) {
    onChange(sections.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  }
  function add() {
    onChange([...sections, { heading: "", body: "" }]);
  }
  function remove(i: number) {
    if (sections.length === 1) {
      onChange([{ heading: "", body: "" }]);
      return;
    }
    onChange(sections.filter((_, idx) => idx !== i));
  }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= sections.length) return;
    const next = [...sections];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-bold text-foreground uppercase tracking-wider">
          Sections
        </label>
        <span className="text-xs text-muted-foreground font-mono">
          {sections.length} section{sections.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="space-y-5">
        {sections.map((sec, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-2 bg-muted/40 border-b border-border">
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Section {i + 1}
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={i === 0}
                  onClick={() => move(i, -1)}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move up"
                >
                  <IconArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={i === sections.length - 1}
                  onClick={() => move(i, 1)}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move down"
                >
                  <IconArrowDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                  title="Remove section"
                >
                  <IconTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <input
                type="text"
                value={sec.heading}
                onChange={(e) => update(i, { heading: e.target.value })}
                placeholder="Section heading (optional)"
                className="w-full px-3 py-2 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
              />
              <textarea
                value={sec.body}
                onChange={(e) => update(i, { body: e.target.value })}
                placeholder="Section body — plain text. Line breaks are preserved on the public page. No HTML."
                rows={10}
                className="w-full px-3 py-2 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition font-sans leading-relaxed resize-y"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{sec.body.length} chars · {sec.body.trim() ? sec.body.trim().split(/\s+/).length : 0} words</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md border-2 border-dashed border-border text-muted-foreground hover:text-foreground hover:border-primary hover:bg-primary/5 transition"
      >
        <IconPlus className="w-4 h-4" />
        Add section
      </button>
    </div>
  );
}
