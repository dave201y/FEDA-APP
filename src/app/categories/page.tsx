// src/app/categories/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/** ---------- Types ---------- */
type Prefs = {
  preferred: string[];
  blocked: string[];
  parentalMode: boolean;
  dailyLimitMin?: number; // optional: screen-time control (not enforced here)
};

type Category = {
  key: string;
  label: string;
  description: string;
  gradient: string; // tailwind gradient class
  emoji: string; // quick visual
};

/** ---------- Data ---------- */
const CATEGORIES: Category[] = [
  { key: "educational", label: "Educational", description: "Learn something new every day.", gradient: "from-blue-500 to-blue-600", emoji: "📘" },
  { key: "entertainment", label: "Entertainment", description: "Fun, engaging content.", gradient: "from-purple-500 to-purple-600", emoji: "🎬" },
  { key: "lifestyle", label: "Lifestyle", description: "Daily life inspiration.", gradient: "from-pink-500 to-pink-600", emoji: "💡" },
  { key: "fitness", label: "Fitness", description: "Training and recovery tips.", gradient: "from-green-500 to-green-600", emoji: "🏋️" },
  { key: "cooking", label: "Cooking", description: "Recipes and kitchen hacks.", gradient: "from-orange-500 to-orange-600", emoji: "🍳" },
  { key: "travel", label: "Travel", description: "Explore the world.", gradient: "from-cyan-500 to-cyan-600", emoji: "🗺️" },
  { key: "technology", label: "Technology", description: "Latest tech & how-tos.", gradient: "from-slate-500 to-slate-600", emoji: "💻" },
  { key: "art_creativity", label: "Art & Creativity", description: "Make, design, create.", gradient: "from-indigo-500 to-indigo-600", emoji: "🎨" },
  { key: "music", label: "Music", description: "Performances & lessons.", gradient: "from-violet-500 to-violet-600", emoji: "🎵" },
  { key: "comedy", label: "Comedy", description: "Laughs & sketches.", gradient: "from-yellow-500 to-yellow-600", emoji: "😂" },
  { key: "news", label: "News", description: "Stay informed.", gradient: "from-red-500 to-red-600", emoji: "🗞️" },
  { key: "sports", label: "Sports", description: "Games and highlights.", gradient: "from-emerald-500 to-emerald-600", emoji: "🏆" },
  { key: "gaming", label: "Gaming", description: "Gameplay & reviews.", gradient: "from-fuchsia-500 to-fuchsia-600", emoji: "🎮" },
  { key: "business", label: "Business", description: "Markets, startups, ops.", gradient: "from-amber-500 to-amber-600", emoji: "💼" },
];

const LS_KEY = "feda_prefs";

/** ---------- Helpers ---------- */
function loadPrefs(): Prefs {
  if (typeof window === "undefined") return { preferred: [], blocked: [], parentalMode: false };
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { preferred: [], blocked: [], parentalMode: false };
    const parsed = JSON.parse(raw) as Prefs;
    // guard for shape
    return {
      preferred: Array.isArray(parsed.preferred) ? parsed.preferred : [],
      blocked: Array.isArray(parsed.blocked) ? parsed.blocked : [],
      parentalMode: Boolean(parsed.parentalMode),
      dailyLimitMin: parsed.dailyLimitMin ?? 60,
    };
  } catch {
    return { preferred: [], blocked: [], parentalMode: false, dailyLimitMin: 60 };
  }
}

function savePrefs(p: Prefs) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_KEY, JSON.stringify(p));
}

/** ---------- Page ---------- */
export default function CategoriesPage() {
  const [prefs, setPrefs] = useState<Prefs>(() => loadPrefs());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // sync on mount in case other tabs changed it
    setPrefs(loadPrefs());
  }, []);

  const togglePreferred = (key: string) => {
    setPrefs((prev) => {
      const preferred = prev.preferred.includes(key)
        ? prev.preferred.filter((k) => k !== key)
        : [...prev.preferred, key];
      const blocked = prev.blocked.filter((k) => k !== key); // cannot be both
      return { ...prev, preferred, blocked };
    });
  };

  const toggleBlocked = (key: string) => {
    setPrefs((prev) => {
      const blocked = prev.blocked.includes(key)
        ? prev.blocked.filter((k) => k !== key)
        : [...prev.blocked, key];
      const preferred = prev.preferred.filter((k) => k !== key); // cannot be both
      return { ...prev, blocked, preferred };
    });
  };

  const toggleParental = () => {
    setPrefs((prev) => ({ ...prev, parentalMode: !prev.parentalMode }));
  };

  const onSave = async () => {
    setSaving(true);
    try {
      savePrefs(prefs);
      // Optional: toast/UX feedback could be added later
    } finally {
      setSaving(false);
    }
  };

  const summaryText = useMemo(() => {
    const p = prefs.preferred.length ? `${prefs.preferred.length} preferred` : "no preferred";
    const b = prefs.blocked.length ? `${prefs.blocked.length} blocked` : "no blocked";
    const pm = prefs.parentalMode ? "Parental Mode: ON" : "Parental Mode: OFF";
    return `${p} · ${b} · ${pm}`;
  }, [prefs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Customize Your Feed
            </span>
          </h1>
          <p className="mt-2 text-slate-300/90">
            Choose what you want to see. Block what you don’t. Enable parental controls for kid-friendly use.
          </p>
          <p className="mt-1 text-slate-400 text-sm">{summaryText}</p>
        </motion.div>

        {/* Parental mode */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mb-6 rounded-xl border border-emerald-500/30 bg-white/5 p-4 sm:p-5"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-emerald-300">Parental Mode</p>
              <p className="text-sm text-slate-300/80">
                Filters to family-safe content only in supported categories.
              </p>
            </div>
            <button
              onClick={toggleParental}
              className={`rounded-lg px-4 py-2 text-sm transition ${
                prefs.parentalMode
                  ? "bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {prefs.parentalMode ? "On" : "Off"}
            </button>
          </div>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => {
            const isPreferred = prefs.preferred.includes(cat.key);
            const isBlocked = prefs.blocked.includes(cat.key);

            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.03 * i }}
                className={`relative overflow-hidden rounded-xl border p-5 transition-all
                  ${
                    isPreferred
                      ? "border-green-500/50 bg-gradient-to-br from-green-500/15 to-emerald-500/15"
                      : isBlocked
                      ? "border-red-500/50 bg-gradient-to-br from-red-500/15 to-pink-500/15"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
              >
                <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${cat.gradient}`} />

                <div className="relative flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`grid h-12 w-12 place-items-center rounded-xl text-lg font-semibold text-white bg-gradient-to-br ${cat.gradient}`}
                    >
                      <span>{cat.emoji}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{cat.label}</h3>
                      <p className="text-sm text-slate-300/90">{cat.description}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {isPreferred && (
                      <span className="rounded-full border border-green-400/40 bg-green-400/10 px-2 py-0.5 text-xs text-green-200">
                        Preferred
                      </span>
                    )}
                    {isBlocked && (
                      <span className="rounded-full border border-red-400/40 bg-red-400/10 px-2 py-0.5 text-xs text-red-200">
                        Blocked
                      </span>
                    )}
                  </div>
                </div>

                <div className="relative mt-4 flex gap-2">
                  <button
                    onClick={() => togglePreferred(cat.key)}
                    className={`rounded-lg px-3 py-2 text-sm transition ${
                      isPreferred
                        ? "bg-green-500/30 text-white hover:bg-green-500/40"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {isPreferred ? "Preferred" : "Prefer"}
                  </button>
                  <button
                    onClick={() => toggleBlocked(cat.key)}
                    className={`rounded-lg px-3 py-2 text-sm transition ${
                      isBlocked
                        ? "bg-red-500/30 text-white hover:bg-red-500/40"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {isBlocked ? "Blocked" : "Block"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-slate-300/80">
            Your choices shape your **For You** feed.
          </div>
          <div className="flex gap-2">
            <Link
              href="/"
              className="rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/20 transition"
            >
              Back to Feed
            </Link>
            <button
              onClick={onSave}
              disabled={saving}
              className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save Preferences"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
