import { Link } from "@tanstack/react-router";
import { LOCALES } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { t, locale, setLocale } = useI18n();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4">
        <Link to="/" className="font-display text-lg font-bold tracking-tight" dir="ltr">
          CALIS<span className="text-primary">10X</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-foreground" }}
            className="hover:text-foreground"
          >
            {t.nav.home}
          </Link>
          <Link
            to="/exercises"
            activeProps={{ className: "text-foreground" }}
            className="hover:text-foreground"
          >
            {t.nav.exercises}
          </Link>
        </nav>
        <div
          className="ms-auto flex rounded-md border border-border p-0.5"
          aria-label={t.nav.language}
        >
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => setLocale(l.code)}
              title={l.label}
              className={cn(
                "rounded px-2 py-1 text-xs font-semibold transition-colors",
                locale === l.code
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {l.short}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { t, locale } = useI18n();
  const year = new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
    useGrouping: false,
  }).format(new Date().getFullYear());
  return (
    <footer className="border-t border-border py-8 text-center text-muted-foreground">
      <p className="text-xs uppercase tracking-[0.2em]">{t.footer}</p>
      <p className="mt-3 text-xs">{t.copyright.replace("{year}", year)}</p>
    </footer>
  );
}
