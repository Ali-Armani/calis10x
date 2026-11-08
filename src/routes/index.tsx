import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import hero from "@/assets/hero-athlete.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Calis10x — Train Smart. Master Skills. Go 10X." },
      { name: "description", content: "Calisthenics skill progressions, technique guides and intelligent training." },
      { property: "og:title", content: "Calis10x — Train Smart. Master Skills. Go 10X." },
      { property: "og:description", content: "Calisthenics skill progressions, technique guides and intelligent training." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useI18n();
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={hero} alt="" width={1024} height={1280} className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center] opacity-70 md:object-right" />
        <div className="absolute inset-0 -z-10 bg-hero-fade md:bg-hero-side rtl:md:-scale-x-100" />
        <div className="mx-auto flex min-h-[86vh] max-w-6xl flex-col justify-end px-4 pb-16 md:justify-center md:pb-0">
          <p className="eyebrow animate-rise">{t.hero.eyebrow}</p>
          <h1 className="mt-4 max-w-xl text-5xl font-bold leading-[0.95] md:text-7xl animate-rise">
            {t.hero.slogan1}
            <br />
            {t.hero.slogan2}
            <br />
            <span className="text-primary">{t.hero.slogan3}</span>
          </h1>
          <p className="mt-6 max-w-md text-muted-foreground animate-rise">{t.hero.sub}</p>
          <div className="mt-8 animate-rise">
            <Button asChild size="lg" className="shadow-glow">
              <Link to="/exercises">
                {t.hero.cta} <ArrowRight className="rtl:rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="max-w-lg text-3xl font-bold">{t.pillars.title}</h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
          {t.pillars.items.map((p, i) => (
            <div key={p.t} className="bg-card p-6">
              <span className="font-display text-sm text-primary" dir="ltr">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
