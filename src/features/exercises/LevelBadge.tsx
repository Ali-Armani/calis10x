import { useI18n } from "@/i18n/I18nProvider";
import type { Level } from "./types";

const BARS: Record<Level, number> = { beginner: 1, intermediate: 2, advanced: 3, elite: 4 };

export function LevelBadge({ level }: { level: Level }) {
  const { t } = useI18n();
  return (
    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
      <span className="flex gap-0.5">
        {[1, 2, 3, 4].map((i) => (
          <span key={i} className={i <= BARS[level] ? "h-3 w-1 bg-primary" : "h-3 w-1 bg-muted"} />
        ))}
      </span>
      {t.levels[level]}
    </span>
  );
}
