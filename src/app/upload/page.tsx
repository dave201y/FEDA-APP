// src/app/upload/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

/** Keep the same shape used by the Feed */
type VideoItem = {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  category: string;
  likes: number;
  views: number;
  ageSafe?: boolean;
  tags?: string[];
  createdAt: string;
};

const LS_KEY = "feda_videos";
const CATEGORY_OPTIONS = [
  "educational",
  "entertainment",
  "lifestyle",
  "fitness",
  "cooking",
  "travel",
  "technology",
  "art_creativity",
  "music",
  "comedy",
  "news",
  "sports",
  "gaming",
  "business",
] as const;

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORY_OPTIONS)[number]>("educational");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState(""); // comma-separated
  const [ageSafe, setAgeSafe] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);

  const isMp4 = useMemo(() => /\.mp4(\?|$)/i.test(videoUrl.trim()), [videoUrl]);
  const canSubmit = title.trim() && videoUrl.trim() && isMp4;

  useEffect(() => {
    // Clear success message when user edits
    setOkMsg(null);
  }, [title, videoUrl, category, description, tags, ageSafe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!canSubmit) {
      setError("Please provide a title and a direct .mp4 URL.");
      return;
    }

    setSubmitting(true);
    try {
      const raw = (typeof window !== "undefined" && localStorage.getItem(LS_KEY)) || "[]";
      const current: VideoItem[] = JSON.parse(raw);

      const newVideo: VideoItem = {
        id: `v${current.length + 1}-${Date.now()}`,
        title: title.trim(),
        description: description.trim() || undefined,
        videoUrl: videoUrl.trim(),
        category,
        likes: 0,
        views: 0,
        ageSafe,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        createdAt: new Date().toISOString(),
      };

      const updated = [newVideo, ...current];
      localStorage.setItem(LS_KEY, JSON.stringify(updated));

      setOkMsg("Video added! Go to the Feed to preview it.");
      setTitle("");
      setVideoUrl("");
      setDescription("");
      setTags("");
      setCategory("educational");
      setAgeSafe(true);
    } catch (err) {
      setError("Could not save the video. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="mx-auto w-full max-w-3xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Upload (Demo)</h1>
            <p className="text-sm text-slate-300/80">
              Paste a direct <span className="font-mono">.mp4</span> URL to append a video to your local feed.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/20 transition"
          >
            Back to Feed
          </Link>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-4"
        >
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              className="w-full rounded-lg bg-black/30 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-white/20"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., CRISPR in 60 Seconds"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Video URL (<span className="font-mono">.mp4</span>)
            </label>
            <input
              className="w-full rounded-lg bg-black/30 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-white/20"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://example.com/video.mp4"
              required
            />
            {!videoUrl ? null : isMp4 ? (
              <p className="mt-1 text-xs text-emerald-300/90">Looks good.</p>
            ) : (
              <p className="mt-1 text-xs text-red-300/90">Must be a direct .mp4 URL.</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Category</label>
              <select
                className="w-full rounded-lg bg-black/30 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-white/20"
                value={category}
                onChange={(e) => setCategory(e.target.value as (typeof CATEGORY_OPTIONS)[number])}
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Tags (comma-separated)</label>
              <input
                className="w-full rounded-lg bg-black/30 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-white/20"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="genetics, biology"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              className="w-full rounded-lg bg-black/30 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-white/20"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short caption or context (optional)"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={ageSafe}
                onChange={(e) => setAgeSafe(e.target.checked)}
                className="h-4 w-4 accent-purple-500"
              />
            </label>
            <span className="text-sm">Family Safe</span>

            <button
              type="submit"
              disabled={!canSubmit || submitting}
              className="ml-auto rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition disabled:opacity-60"
            >
              {submitting ? "Adding…" : "Add Video"}
            </button>
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/20 border border-red-500/40 text-red-100 text-sm px-3 py-2">
              {error}
            </div>
          )}
          {okMsg && (
            <div className="rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-100 text-sm px-3 py-2">
              {okMsg} <Link href="/" className="underline">Open Feed</Link>
            </div>
          )}
        </form>

        {/* Tip */}
        <p className="mt-3 text-xs text-slate-400">
          This page writes to <span className="font-mono">{LS_KEY}</span> in <em>localStorage</em>.  
          In production you’ll replace this with Appwrite (storage + DB).
        </p>
      </div>
    </div>
  );
}
