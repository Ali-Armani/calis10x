import type { Locale } from "@/i18n/config";

export type Level = "beginner" | "intermediate" | "advanced" | "elite";
export type Category = "push" | "pull" | "core" | "legs" | "skill";
type L10n = Record<Locale, string>;
type L10nList = Record<Locale, string[]>;

export type Exercise = {
  slug: string;
  name: L10n;
  summary: L10n;
  level: Level;
  category: Category;
  muscles: L10nList;
  cues: L10nList;
  mistakes: L10nList;
  progression: string[]; // slugs, easiest to hardest
};

export const EXERCISES: Exercise[] = [
  {
    slug: "push-up",
    name: { en: "Push-up", fa: "شنا سوئدی" },
    summary: { en: "The foundation of all pushing strength.", fa: "پایه تمام قدرت فشاری." },
    level: "beginner", category: "push",
    muscles: { en: ["Chest", "Triceps", "Front delts"], fa: ["سینه", "پشت بازو", "سرشانه جلو"] },
    cues: { en: ["Hands under shoulders", "Body in one straight line", "Elbows ~45° from torso"], fa: ["دست‌ها زیر شانه‌ها", "بدن در یک خط صاف", "آرنج‌ها حدود ۴۵ درجه از بدن"] },
    mistakes: { en: ["Sagging hips", "Flared elbows", "Partial range"], fa: ["افتادن لگن", "باز شدن بیش از حد آرنج", "دامنه حرکتی ناقص"] },
    progression: ["push-up", "dip", "planche-lean"],
  },
  {
    slug: "pull-up",
    name: { en: "Pull-up", fa: "بارفیکس" },
    summary: { en: "The king of upper-body pulling.", fa: "پادشاه حرکات کششی بالاتنه." },
    level: "beginner", category: "pull",
    muscles: { en: ["Lats", "Biceps", "Rear delts"], fa: ["زیربغل", "جلو بازو", "سرشانه عقب"] },
    cues: { en: ["Start from a dead hang", "Pull shoulders down first", "Chin clears the bar"], fa: ["شروع از آویزان کامل", "ابتدا شانه‌ها را پایین بکش", "چانه از میله بالاتر برود"] },
    mistakes: { en: ["Kipping", "Half reps", "Shrugged shoulders"], fa: ["تاب خوردن", "تکرارهای نیمه", "بالا آمدن شانه‌ها"] },
    progression: ["pull-up", "muscle-up", "front-lever"],
  },
  {
    slug: "dip",
    name: { en: "Parallel bar dip", fa: "دیپ پارالل" },
    summary: { en: "Builds pressing power for advanced skills.", fa: "قدرت فشاری برای مهارت‌های پیشرفته." },
    level: "intermediate", category: "push",
    muscles: { en: ["Triceps", "Chest", "Front delts"], fa: ["پشت بازو", "سینه", "سرشانه جلو"] },
    cues: { en: ["Lock out at the top", "Lower to 90° elbows", "Slight forward lean"], fa: ["قفل کامل در بالا", "پایین تا زاویه ۹۰ درجه آرنج", "کمی تمایل به جلو"] },
    mistakes: { en: ["Going too deep too soon", "Shoulders rolling forward"], fa: ["پایین رفتن بیش از حد زودهنگام", "چرخش شانه‌ها به جلو"] },
    progression: ["push-up", "dip", "planche-lean"],
  },
  {
    slug: "hollow-hold",
    name: { en: "Hollow body hold", fa: "هالو هولد" },
    summary: { en: "Core tension behind every skill.", fa: "کشش مرکز بدن، پشتوانه هر مهارت." },
    level: "beginner", category: "core",
    muscles: { en: ["Abs", "Hip flexors"], fa: ["شکم", "خم‌کننده‌های لگن"] },
    cues: { en: ["Lower back pressed to floor", "Arms by ears", "Point toes"], fa: ["کمر چسبیده به زمین", "بازوها کنار گوش", "پنجه‌ها کشیده"] },
    mistakes: { en: ["Arching the lower back", "Holding breath"], fa: ["قوس دادن کمر", "حبس کردن نفس"] },
    progression: ["hollow-hold", "l-sit"],
  },
  {
    slug: "l-sit",
    name: { en: "L-sit", fa: "ال‌سیت" },
    summary: { en: "Compression strength and shoulder depression.", fa: "قدرت فشردگی و پایین نگه داشتن شانه." },
    level: "intermediate", category: "core",
    muscles: { en: ["Abs", "Hip flexors", "Triceps"], fa: ["شکم", "خم‌کننده‌های لگن", "پشت بازو"] },
    cues: { en: ["Push the floor away", "Legs straight and together", "Toes pointed"], fa: ["زمین را به پایین هل بده", "پاها صاف و کنار هم", "پنجه‌ها کشیده"] },
    mistakes: { en: ["Bent knees", "Shrugged shoulders"], fa: ["خم شدن زانو", "بالا آمدن شانه‌ها"] },
    progression: ["hollow-hold", "l-sit"],
  },
  {
    slug: "pistol-squat",
    name: { en: "Pistol squat", fa: "اسکات تک‌پا" },
    summary: { en: "Single-leg strength, balance and mobility.", fa: "قدرت تک‌پا، تعادل و تحرک." },
    level: "advanced", category: "legs",
    muscles: { en: ["Quads", "Glutes", "Core"], fa: ["چهارسر ران", "سرینی", "مرکز بدن"] },
    cues: { en: ["Heel stays down", "Arms forward for balance", "Control the descent"], fa: ["پاشنه روی زمین بماند", "دست‌ها جلو برای تعادل", "پایین آمدن کنترل‌شده"] },
    mistakes: { en: ["Knee caving in", "Bouncing out of the bottom"], fa: ["چرخش زانو به داخل", "پرش از پایین حرکت"] },
    progression: ["pistol-squat"],
  },
  {
    slug: "muscle-up",
    name: { en: "Muscle-up", fa: "ماسل‌آپ" },
    summary: { en: "Explosive pull transitioning into a dip.", fa: "کشش انفجاری که به دیپ تبدیل می‌شود." },
    level: "advanced", category: "skill",
    muscles: { en: ["Lats", "Chest", "Triceps"], fa: ["زیربغل", "سینه", "پشت بازو"] },
    cues: { en: ["Pull to the lower chest", "Fast transition over the bar", "False grip helps"], fa: ["تا پایین سینه بکش", "عبور سریع از روی میله", "گریپ کاذب کمک می‌کند"] },
    mistakes: { en: ["Chicken-winging one arm", "Pulling too low"], fa: ["بالا رفتن یک دست جلوتر", "کشش ناکافی"] },
    progression: ["pull-up", "muscle-up"],
  },
  {
    slug: "front-lever",
    name: { en: "Front lever", fa: "فرانت لیور" },
    summary: { en: "Horizontal hold demanding elite pulling strength.", fa: "نگه‌داشت افقی با قدرت کششی بالا." },
    level: "elite", category: "skill",
    muscles: { en: ["Lats", "Core", "Rear delts"], fa: ["زیربغل", "مرکز بدن", "سرشانه عقب"] },
    cues: { en: ["Straight arms", "Posterior pelvic tilt", "Depress the scapula"], fa: ["دست‌های صاف", "تیلت خلفی لگن", "پایین کشیدن کتف‌ها"] },
    mistakes: { en: ["Bent arms", "Piked hips"], fa: ["خم شدن آرنج", "شکستن لگن"] },
    progression: ["pull-up", "front-lever"],
  },
  {
    slug: "planche-lean",
    name: { en: "Planche lean", fa: "پلانچ لین" },
    summary: { en: "First step toward the full planche.", fa: "اولین قدم به سوی پلانچ کامل." },
    level: "intermediate", category: "skill",
    muscles: { en: ["Front delts", "Chest", "Wrists"], fa: ["سرشانه جلو", "سینه", "مچ‌ها"] },
    cues: { en: ["Protract the shoulders", "Fingers turned out", "Lean until shoulders pass hands"], fa: ["کتف‌ها را باز کن", "انگشتان به بیرون", "تمایل تا جلو رفتن شانه از دست"] },
    mistakes: { en: ["Bent elbows", "Skipping wrist warm-up"], fa: ["خم شدن آرنج", "گرم نکردن مچ"] },
    progression: ["push-up", "planche-lean"],
  },
];

export const getExercise = (slug: string) => EXERCISES.find((e) => e.slug === slug);
