import { queryOptions } from "@tanstack/react-query";
import { getSupabase } from "@/lib/supabase";
import { mapCatalog, type ExerciseRow, type MuscleRow } from "./mapCatalog";
import type { Catalog } from "./types";

async function loadCatalog(): Promise<Catalog> {
  const supabase = getSupabase();
  const [exercises, muscles] = await Promise.all([
    supabase.from("exercises").select("*, exercise_muscles(muscle_id, position)"),
    supabase.from("muscles").select("*"),
  ]);

  if (exercises.error || muscles.error) {
    // Log the details on the server, but never show database error text to visitors.
    console.error("Catalog query failed", exercises.error ?? muscles.error);
    throw new Error("Could not load the exercise catalog. Please try again later.");
  }

  return mapCatalog((exercises.data ?? []) as ExerciseRow[], (muscles.data ?? []) as MuscleRow[]);
}

export const catalogQueryOptions = queryOptions({
  queryKey: ["catalog"],
  queryFn: loadCatalog,
  staleTime: 5 * 60 * 1000,
});
