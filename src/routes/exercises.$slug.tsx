import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { getExercise } from "@/features/exercises/data";
import { LevelBadge } from "@/features/exercises/LevelBadge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/exercises/$slug")({
  loader: ({ params }) => {
    const ex = getExercise(params.slug);
    if (!ex) throw notFound();
    return ex;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name.en} — Technique Guide | Calis10x` },
          { name: "description", content: loaderData.summary.en },
          { property: "og:title", content: `${loaderData.name.en} — Calis10x` },
          { property: "og:description", content: loaderData.summary.en },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary" },
        ]
      : [{ title: "Unavailable — Calis10x" }, { name: "robots", content: "noindex" }],
  }),
  component: ExerciseDetail,
});

function ExerciseDetail() {
  const ex = Route.useLoaderData();
  const { t, locale } = useI18n();
  const section = (title: string, items: string[]) => (
    <div className="rounded-md border border-border bg-card p-5">
      <h2 className="eyebrow">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 bg-primary" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link
        to="/exercises"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {t.exercises.back}
      </Link>
      <p className="eyebrow mt-8">{t.categories[ex.category]}</p>
      <h1 className="mt-2 text-4xl font-bold md:text-5xl">{ex.name[locale]}</h1>
      <p className="mt-3 text-muted-foreground">{ex.summary[locale]}</p>
      <div className="mt-4">
        <LevelBadge level={ex.level} />
      </div>
      <div className="mt-10 grid gap-3 md:grid-cols-3">
        {section(t.exercises.muscles, ex.muscles[locale])}
        {section(t.exercises.cues, ex.cues[locale])}
        {section(t.exercises.mistakes, ex.mistakes[locale])}
      </div>
      {ex.progression.length > 1 && (
        <div className="mt-10">
          <h2 className="eyebrow">{t.exercises.progression}</h2>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {ex.progression.map((s, i) => {
              const step = getExercise(s)!;
              return (
                <div key={s} className="flex items-center gap-2">
                  {i > 0 && <span className="h-px w-6 bg-border" />}
                  <Link
                    to="/exercises/$slug"
                    params={{ slug: s }}
                    className={cn(
                      "rounded-md border px-3 py-1.5 text-sm",
                      s === ex.slug
                        ? "border-primary text-primary"
                        : "border-border text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {step.name[locale]}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
