import type { Category, Exercise, Level, Muscle } from "./types";

export type Filters = {
  query: string;
  category: Category | "all";
  level: Level | "all";
};

// Makes Persian/Arabic/English text comparable: unifies letter variants and digits,
// drops diacritics, and treats half-spaces and hyphens as spaces.
export function normalizeText(input: string): string {
  return input
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/[\u064A\u0649]/g, "\u06CC")
    .replace(/\u0643/g, "\u06A9")
    .replace(/[\u0623\u0625\u0622\u0671]/g, "\u0627")
    .replace(/\u0629/g, "\u0647")
    .replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/\u200C|\u200D|\u200E|\u200F|_|-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Matches at the start of a word, so "ab" finds "abs" but not "lab".
function matchesWordStart(term: string, query: string): boolean {
  return term.startsWith(query) || term.includes(` ${query}`);
}

// Muscle ids matching the query by name or alias, plus everything under a matched group.
export function findMatchingMuscleIds(query: string, muscles: Muscle[]): Set<string> {
  const q = normalizeText(query);
  const matched = new Set<string>();
  if (q.length < 2) return matched;

  for (const muscle of muscles) {
    const terms = [muscle.name.en, muscle.name.fa, ...muscle.aliases.en, ...muscle.aliases.fa];
    if (terms.some((term) => matchesWordStart(normalizeText(term), q))) matched.add(muscle.id);
  }

  let grew = true;
  while (grew) {
    grew = false;
    for (const muscle of muscles) {
      if (muscle.parentId && matched.has(muscle.parentId) && !matched.has(muscle.id)) {
        matched.add(muscle.id);
        grew = true;
      }
    }
  }
  return matched;
}

export function searchExercises(
  exercises: Exercise[],
  muscles: Muscle[],
  { query, category, level }: Filters,
): Exercise[] {
  const q = normalizeText(query);
  const muscleIds = findMatchingMuscleIds(query, muscles);

  return exercises.filter((exercise) => {
    if (category !== "all" && exercise.category !== category) return false;
    if (level !== "all" && exercise.level !== level) return false;
    if (q === "") return true;

    const nameMatch = [exercise.name.en, exercise.name.fa].some((name) =>
      normalizeText(name).includes(q),
    );
    const muscleMatch = exercise.muscleIds.some((id) => muscleIds.has(id));
    return nameMatch || muscleMatch;
  });
}
