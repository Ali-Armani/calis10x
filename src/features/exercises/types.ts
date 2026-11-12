import type { Locale } from "@/i18n/config";

export type Level = "beginner" | "intermediate" | "advanced" | "elite";
export type Category = "push" | "pull" | "core" | "legs" | "skill";
export type L10n = Record<Locale, string>;
export type L10nList = Record<Locale, string[]>;

export type Muscle = {
  id: string;
  parentId: string | null;
  name: L10n;
  aliases: L10nList;
};

export type Exercise = {
  slug: string;
  name: L10n;
  summary: L10n;
  level: Level;
  category: Category;
  muscleIds: string[]; // ordered as shown on the page
  muscles: L10nList; // display names, same order as muscleIds
  cues: L10nList;
  mistakes: L10nList;
  progression: string[]; // slugs, easiest to hardest
};

export type Catalog = { exercises: Exercise[]; muscles: Muscle[] };
