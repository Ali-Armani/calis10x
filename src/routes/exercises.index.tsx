import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n/I18nProvider";
import { EXERCISES, type Category } from "@/features/exercises/data";
import { LevelBadge } from "@/features/exercises/LevelBadge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/exercises/")({
  head: () => ({
    meta: [
      { title: "Exercise Library — Calis10x" },
      {
        name: "description",
        content:
          "Foundation calisthenics movements with technique cues, common mistakes and progressions.",
      },
      { property: "og:title", content: "Exercise Library — Calis10x" },
      {
        property: "og:description",
        content: "Foundation calisthenics movements with technique cues and progressions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ExercisesPage,
});

const CATS: (Category | "all")[] = ["all", "push", "pull", "core", "legs", "skill"];

function ExercisesPage() {
  const { t, locale } = useI18n();
  const [cat, setCat] = useState<Category | "all">("all");
  const [q, setQ] = useState("");
  const list = EXERCISES.filter(
    (e) =>
      (cat === "all" || e.category === cat) &&
      (e.name[locale] + e.name.en).toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-bold">{t.exercises.title}</h1>
      <p className="mt-2 text-muted-foreground">{t.exercises.sub}</p>
      <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.exercises.search}
          className="md:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-sm transition-colors",
                cat === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {t.categories[c]}
            </button>
          ))}
        </div>
      </div>
      {list.length === 0 ? (
        <p className="mt-12 text-muted-foreground">{t.exercises.empty}</p>
      ) : (
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((e) => (
            <Link
              key={e.slug}
              to="/exercises/$slug"
              params={{ slug: e.slug }}
              className="group rounded-md border border-border bg-card p-5 transition-all hover:border-primary/60 hover:shadow-glow"
            >
              <span className="eyebrow">{t.categories[e.category]}</span>
              <h2 className="mt-2 text-xl font-semibold group-hover:text-primary">
                {e.name[locale]}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{e.summary[locale]}</p>
              <div className="mt-4">
                <LevelBadge level={e.level} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
