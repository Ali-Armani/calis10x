import type { Catalog, Category, Exercise, Level, Muscle } from "./types";

export type MuscleRow = {
  id: string;
  parent_id: string | null;
  name_en: string;
  name_fa: string;
  aliases_en: string[];
  aliases_fa: string[];
};

export type ExerciseRow = {
  slug: string;
  name_en: string;
  name_fa: string;
  summary_en: string;
  summary_fa: string;
  level: Level;
  category: Category;
  cues_en: string[];
  cues_fa: string[];
  mistakes_en: string[];
  mistakes_fa: string[];
  progression: string[];
  exercise_muscles: { muscle_id: string; position: number }[];
};

const LEVEL_ORDER: Record<Level, number> = { beginner: 0, intermediate: 1, advanced: 2, elite: 3 };

// Pure function: turns database rows into the shapes the UI uses.
export function mapCatalog(exerciseRows: ExerciseRow[], muscleRows: MuscleRow[]): Catalog {
  const muscles: Muscle[] = muscleRows.map((m) => ({
    id: m.id,
    parentId: m.parent_id,
    name: { en: m.name_en, fa: m.name_fa },
    aliases: { en: m.aliases_en, fa: m.aliases_fa },
  }));
  const byId = new Map(muscles.map((m) => [m.id, m]));

  const exercises: Exercise[] = exerciseRows.map((row) => {
    const linked = [...row.exercise_muscles]
      .sort((a, b) => a.position - b.position)
      .flatMap((link) => {
        const muscle = byId.get(link.muscle_id);
        return muscle ? [muscle] : [];
      });

    return {
      slug: row.slug,
      name: { en: row.name_en, fa: row.name_fa },
      summary: { en: row.summary_en, fa: row.summary_fa },
      level: row.level,
      category: row.category,
      muscleIds: linked.map((m) => m.id),
      muscles: { en: linked.map((m) => m.name.en), fa: linked.map((m) => m.name.fa) },
      cues: { en: row.cues_en, fa: row.cues_fa },
      mistakes: { en: row.mistakes_en, fa: row.mistakes_fa },
      progression: row.progression,
    };
  });

  exercises.sort(
    (a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level] || a.name.en.localeCompare(b.name.en),
  );

  return { exercises, muscles };
}
