-- Muscles: hierarchical (group -> specific muscle)
create table public.muscles (
  id text primary key,
  parent_id text references public.muscles (id) on delete restrict,
  name_en text not null,
  name_fa text not null,
  aliases_en text[] not null default '{}',
  aliases_fa text[] not null default '{}'
);

create table public.exercises (
  slug text primary key,
  name_en text not null,
  name_fa text not null,
  summary_en text not null,
  summary_fa text not null,
  level text not null
    check (level in ('beginner', 'intermediate', 'advanced', 'elite')),
  category text not null
    check (category in ('push', 'pull', 'core', 'legs', 'skill')),
  cues_en text[] not null default '{}',
  cues_fa text[] not null default '{}',
  mistakes_en text[] not null default '{}',
  mistakes_fa text[] not null default '{}',
  progression text[] not null default '{}'
);

create table public.exercise_muscles (
  exercise_slug text not null
    references public.exercises (slug) on delete cascade,
  muscle_id text not null
    references public.muscles (id) on delete restrict,
  position smallint not null default 0,
  primary key (exercise_slug, muscle_id)
);

create index exercise_muscles_muscle_id_idx
  on public.exercise_muscles (muscle_id);

-- Row Level Security: public read-only catalog
alter table public.muscles enable row level security;
alter table public.exercises enable row level security;
alter table public.exercise_muscles enable row level security;

create policy "Public can read muscles"
  on public.muscles for select to anon, authenticated using (true);

create policy "Public can read exercises"
  on public.exercises for select to anon, authenticated using (true);

create policy "Public can read exercise_muscles"
  on public.exercise_muscles for select to anon, authenticated using (true);

-- No insert/update/delete policies: writes are denied for anon and
-- authenticated users. Data is changed only from the SQL Editor
-- (or with the service role key on a trusted server, never in the browser).