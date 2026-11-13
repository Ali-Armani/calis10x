import { describe, expect, it } from "vitest";
import { mapCatalog, type ExerciseRow, type MuscleRow } from "./mapCatalog";

const muscles: MuscleRow[] = [
  {
    id: "chest",
    parent_id: null,
    name_en: "Chest",
    name_fa: "سینه",
    aliases_en: [],
    aliases_fa: [],
  },
  {
    id: "triceps",
    parent_id: "arms",
    name_en: "Triceps",
    name_fa: "پشت بازو",
    aliases_en: [],
    aliases_fa: [],
  },
];

const row = (slug: string, level: ExerciseRow["level"], nameEn: string): ExerciseRow => ({
  slug,
  name_en: nameEn,
  name_fa: nameEn,
  summary_en: "",
  summary_fa: "",
  level,
  category: "push",
  cues_en: [],
  cues_fa: [],
  mistakes_en: [],
  mistakes_fa: [],
  progression: [slug],
  exercise_muscles: [
    { muscle_id: "triceps", position: 1 },
    { muscle_id: "chest", position: 0 },
    { muscle_id: "unknown-muscle", position: 2 },
  ],
});

describe("mapCatalog", () => {
  it("orders muscles by position and ignores unknown muscle ids", () => {
    const { exercises } = mapCatalog([row("push-up", "beginner", "Push-up")], muscles);

    expect(exercises[0]?.muscleIds).toEqual(["chest", "triceps"]);
    expect(exercises[0]?.muscles.fa).toEqual(["سینه", "پشت بازو"]);
  });

  it("sorts exercises by level, then by English name", () => {
    const { exercises } = mapCatalog(
      [row("b", "advanced", "B"), row("c", "beginner", "C"), row("a", "beginner", "A")],
      muscles,
    );

    expect(exercises.map((e) => e.slug)).toEqual(["a", "c", "b"]);
  });
});
