import { describe, expect, it } from "vitest";
import { findMatchingMuscleIds, normalizeText, searchExercises } from "./search";
import type { Exercise, Level, Muscle } from "./types";

const muscle = (
  id: string,
  parentId: string | null,
  en: string,
  fa: string,
  aliasesEn: string[] = [],
  aliasesFa: string[] = [],
): Muscle => ({
  id,
  parentId,
  name: { en, fa },
  aliases: { en: aliasesEn, fa: aliasesFa },
});

const muscles: Muscle[] = [
  muscle("shoulders", null, "Shoulders", "سرشانه", ["delts"], ["شانه", "دلتوئید"]),
  muscle("front-delts", "shoulders", "Front delts", "سرشانه جلو", [], ["دلتوئید قدامی"]),
  muscle("rear-delts", "shoulders", "Rear delts", "سرشانه عقب", [], ["دلتوئید خلفی"]),
  muscle("chest", null, "Chest", "سینه", ["pecs"], []),
  muscle("core", null, "Core", "مرکز بدن", [], []),
  muscle("abs", "core", "Abs", "شکم", ["abdominals"], []),
];

const exercise = (slug: string, level: Level, muscleIds: string[]): Exercise => ({
  slug,
  name: { en: slug, fa: slug },
  summary: { en: "", fa: "" },
  level,
  category: "push",
  muscleIds,
  muscles: { en: [], fa: [] },
  cues: { en: [], fa: [] },
  mistakes: { en: [], fa: [] },
  progression: [slug],
});

const exercises: Exercise[] = [
  exercise("push-up", "beginner", ["chest", "front-delts"]),
  exercise("pull-up", "intermediate", ["rear-delts"]),
  exercise("l-sit", "advanced", ["abs"]),
];

const slugs = (query: string, level: Level | "all" = "all") =>
  searchExercises(exercises, muscles, { query, category: "all", level }).map((e) => e.slug);

describe("normalizeText", () => {
  it("unifies Arabic letter variants, digits and half-spaces", () => {
    expect(normalizeText("دلتوئيد")).toBe(normalizeText("دلتوئید"));
    expect(normalizeText("مهارت\u200Cها")).toBe("مهارت ها");
    expect(normalizeText("۱۰ برابر")).toBe("10 برابر");
  });
});

describe("findMatchingMuscleIds", () => {
  it("expands a group to all of its sub-muscles", () => {
    expect([...findMatchingMuscleIds("سرشانه", muscles)].sort()).toEqual([
      "front-delts",
      "rear-delts",
      "shoulders",
    ]);
  });

  it("does not match in the middle of a word", () => {
    expect(findMatchingMuscleIds("ab", muscles).has("abs")).toBe(true);
    expect(findMatchingMuscleIds("bs", muscles).size).toBe(0);
  });
});

describe("searchExercises", () => {
  it("finds exercises by a general muscle group", () => {
    expect(slugs("سرشانه")).toEqual(["push-up", "pull-up"]);
  });

  it("finds exercises by a specific muscle and its alias", () => {
    expect(slugs("دلتوئید قدامی")).toEqual(["push-up"]);
    expect(slugs("posterior")).toEqual([]);
  });

  it("finds exercises by name", () => {
    expect(slugs("pull")).toEqual(["pull-up"]);
  });

  it("combines text search with the level filter", () => {
    expect(slugs("shoulders", "beginner")).toEqual(["push-up"]);
    expect(slugs("", "advanced")).toEqual(["l-sit"]);
  });
});
