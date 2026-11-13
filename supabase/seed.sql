-- Seed data for the Calis10x exercise catalog.
-- Run in the Supabase SQL Editor AFTER schema.sql.
-- Safe to re-run: uses upserts.

begin;

-- Muscles: parents first, then children
insert into public.muscles (id, parent_id, name_en, name_fa, aliases_en, aliases_fa) values
  ('shoulders', null, 'Shoulders', 'سرشانه', array['shoulder', 'delts', 'deltoids'], array['شانه', 'شانه‌ها', 'دلتوئید', 'دلتا']),
  ('chest', null, 'Chest', 'سینه', array['pecs', 'pectorals', 'pec'], array['پکتورال', 'سینه‌ای']),
  ('back', null, 'Back', 'پشت', array['upper back'], array['پشت بدن']),
  ('arms', null, 'Arms', 'بازو', array['arm'], array['بازوها']),
  ('core', null, 'Core', 'مرکز بدن', array['midsection', 'trunk'], array['میان‌تنه', 'کور']),
  ('legs', null, 'Legs', 'پا', array['leg', 'lower body'], array['پاها', 'پایین‌تنه']),
  ('front-delts', 'shoulders', 'Front delts', 'سرشانه جلو', array['anterior deltoid', 'anterior delts', 'front deltoid'], array['دلتوئید قدامی', 'دلتوئید جلو', 'سرشانه قدامی', 'سرشانه جلویی']),
  ('lateral-delts', 'shoulders', 'Lateral delts', 'سرشانه میانی', array['middle delts', 'side delts', 'medial deltoid', 'lateral deltoid'], array['دلتوئید میانی', 'دلتوئید جانبی', 'سرشانه جانبی', 'سرشانه کناری', 'سرشانه وسط']),
  ('rear-delts', 'shoulders', 'Rear delts', 'سرشانه عقب', array['posterior deltoid', 'posterior delts', 'back delts'], array['دلتوئید خلفی', 'دلتوئید عقب', 'سرشانه خلفی', 'سرشانه پشتی']),
  ('lats', 'back', 'Lats', 'زیربغل', array['latissimus dorsi', 'lat'], array['لت', 'پشت پهن', 'لاتیسیموس']),
  ('traps', 'back', 'Traps', 'ذوزنقه', array['trapezius'], array['تراپ', 'کول', 'عضله ذوزنقه‌ای']),
  ('lower-back', 'back', 'Lower back', 'کمر', array['erector spinae', 'lumbar'], array['فیله کمر', 'لومبار']),
  ('biceps', 'arms', 'Biceps', 'جلو بازو', array['bicep', 'biceps brachii'], array['دوسر بازویی', 'بای‌سپس', 'عضله دوسر']),
  ('triceps', 'arms', 'Triceps', 'پشت بازو', array['tricep', 'triceps brachii'], array['سه‌سر بازویی', 'تری‌سپس', 'عضله سه‌سر']),
  ('wrists', 'arms', 'Wrists', 'مچ‌ها', array['wrist', 'forearms', 'forearm'], array['مچ', 'ساعد', 'ساعدها']),
  ('abs', 'core', 'Abs', 'شکم', array['abdominals', 'abdominal', 'six pack', 'rectus abdominis'], array['عضلات شکم', 'سیکس‌پک', 'راست شکمی']),
  ('obliques', 'core', 'Obliques', 'پهلو', array['side abs', 'oblique'], array['عضلات پهلو', 'مایل شکمی']),
  ('quads', 'legs', 'Quads', 'چهارسر ران', array['quadriceps', 'quad'], array['چهارسر', 'جلو ران', 'کوادریسپس']),
  ('hamstrings', 'legs', 'Hamstrings', 'همسترینگ', array['hamstring', 'hams'], array['پشت ران', 'همستر']),
  ('glutes', 'legs', 'Glutes', 'سرینی', array['glute', 'butt', 'gluteus maximus'], array['باسن', 'عضله سرینی', 'گلوت']),
  ('calves', 'legs', 'Calves', 'ساق پا', array['calf', 'gastrocnemius', 'soleus'], array['ساق', 'ماهیچه ساق']),
  ('hip-flexors', 'legs', 'Hip flexors', 'خم‌کننده‌های لگن', array['hip flexor', 'iliopsoas', 'psoas'], array['خم‌کننده لگن', 'ایلیوپسواس', 'پسواس'])
on conflict (id) do update set
  parent_id = excluded.parent_id, name_en = excluded.name_en, name_fa = excluded.name_fa,
  aliases_en = excluded.aliases_en, aliases_fa = excluded.aliases_fa;

-- Exercises
insert into public.exercises
  (slug, name_en, name_fa, summary_en, summary_fa, level, category, cues_en, cues_fa, mistakes_en, mistakes_fa, progression)
values
  ('push-up', 'Push-up', 'شنا سوئدی', 'The foundation of all pushing strength.', 'پایه تمام قدرت فشاری.', 'beginner', 'push',
   array['Hands under shoulders', 'Body in one straight line', 'Elbows ~45° from torso'], array['دست‌ها زیر شانه‌ها', 'بدن در یک خط صاف', 'آرنج‌ها حدود ۴۵ درجه از بدن'],
   array['Sagging hips', 'Flared elbows', 'Partial range'], array['افتادن لگن', 'باز شدن بیش از حد آرنج', 'دامنه حرکتی ناقص'],
   array['push-up', 'dip', 'planche-lean']),
  ('pull-up', 'Pull-up', 'بارفیکس', 'The king of upper-body pulling.', 'پادشاه حرکات کششی بالاتنه.', 'beginner', 'pull',
   array['Start from a dead hang', 'Pull shoulders down first', 'Chin clears the bar'], array['شروع از آویزان کامل', 'ابتدا شانه‌ها را پایین بکش', 'چانه از میله بالاتر برود'],
   array['Kipping', 'Half reps', 'Shrugged shoulders'], array['تاب خوردن', 'تکرارهای نیمه', 'بالا آمدن شانه‌ها'],
   array['pull-up', 'muscle-up', 'front-lever']),
  ('dip', 'Parallel bar dip', 'دیپ پارالل', 'Builds pressing power for advanced skills.', 'قدرت فشاری برای مهارت‌های پیشرفته.', 'intermediate', 'push',
   array['Lock out at the top', 'Lower to 90° elbows', 'Slight forward lean'], array['قفل کامل در بالا', 'پایین تا زاویه ۹۰ درجه آرنج', 'کمی تمایل به جلو'],
   array['Going too deep too soon', 'Shoulders rolling forward'], array['پایین رفتن بیش از حد زودهنگام', 'چرخش شانه‌ها به جلو'],
   array['push-up', 'dip', 'planche-lean']),
  ('hollow-hold', 'Hollow body hold', 'هالو هولد', 'Core tension behind every skill.', 'کشش مرکز بدن، پشتوانه هر مهارت.', 'beginner', 'core',
   array['Lower back pressed to floor', 'Arms by ears', 'Point toes'], array['کمر چسبیده به زمین', 'بازوها کنار گوش', 'پنجه‌ها کشیده'],
   array['Arching the lower back', 'Holding breath'], array['قوس دادن کمر', 'حبس کردن نفس'],
   array['hollow-hold', 'l-sit']),
  ('l-sit', 'L-sit', 'ال‌سیت', 'Compression strength and shoulder depression.', 'قدرت فشردگی و پایین نگه داشتن شانه.', 'intermediate', 'core',
   array['Push the floor away', 'Legs straight and together', 'Toes pointed'], array['زمین را به پایین هل بده', 'پاها صاف و کنار هم', 'پنجه‌ها کشیده'],
   array['Bent knees', 'Shrugged shoulders'], array['خم شدن زانو', 'بالا آمدن شانه‌ها'],
   array['hollow-hold', 'l-sit']),
  ('pistol-squat', 'Pistol squat', 'اسکات تک‌پا', 'Single-leg strength, balance and mobility.', 'قدرت تک‌پا، تعادل و تحرک.', 'advanced', 'legs',
   array['Heel stays down', 'Arms forward for balance', 'Control the descent'], array['پاشنه روی زمین بماند', 'دست‌ها جلو برای تعادل', 'پایین آمدن کنترل‌شده'],
   array['Knee caving in', 'Bouncing out of the bottom'], array['چرخش زانو به داخل', 'پرش از پایین حرکت'],
   array['pistol-squat']),
  ('muscle-up', 'Muscle-up', 'ماسل‌آپ', 'Explosive pull transitioning into a dip.', 'کشش انفجاری که به دیپ تبدیل می‌شود.', 'advanced', 'skill',
   array['Pull to the lower chest', 'Fast transition over the bar', 'False grip helps'], array['تا پایین سینه بکش', 'عبور سریع از روی میله', 'گریپ کاذب کمک می‌کند'],
   array['Chicken-winging one arm', 'Pulling too low'], array['بالا رفتن یک دست جلوتر', 'کشش ناکافی'],
   array['pull-up', 'muscle-up']),
  ('front-lever', 'Front lever', 'فرانت لیور', 'Horizontal hold demanding elite pulling strength.', 'نگه‌داشت افقی با قدرت کششی بالا.', 'elite', 'skill',
   array['Straight arms', 'Posterior pelvic tilt', 'Depress the scapula'], array['دست‌های صاف', 'تیلت خلفی لگن', 'پایین کشیدن کتف‌ها'],
   array['Bent arms', 'Piked hips'], array['خم شدن آرنج', 'شکستن لگن'],
   array['pull-up', 'front-lever']),
  ('planche-lean', 'Planche lean', 'پلانچ لین', 'First step toward the full planche.', 'اولین قدم به سوی پلانچ کامل.', 'intermediate', 'skill',
   array['Protract the shoulders', 'Fingers turned out', 'Lean until shoulders pass hands'], array['کتف‌ها را باز کن', 'انگشتان به بیرون', 'تمایل تا جلو رفتن شانه از دست'],
   array['Bent elbows', 'Skipping wrist warm-up'], array['خم شدن آرنج', 'گرم نکردن مچ'],
   array['push-up', 'planche-lean'])
on conflict (slug) do update set
  name_en = excluded.name_en, name_fa = excluded.name_fa, summary_en = excluded.summary_en,
  summary_fa = excluded.summary_fa, level = excluded.level, category = excluded.category,
  cues_en = excluded.cues_en, cues_fa = excluded.cues_fa, mistakes_en = excluded.mistakes_en,
  mistakes_fa = excluded.mistakes_fa, progression = excluded.progression;

-- Exercise <-> muscle links (position = order shown on the page)
insert into public.exercise_muscles (exercise_slug, muscle_id, position) values
  ('push-up', 'chest', 0),
  ('push-up', 'triceps', 1),
  ('push-up', 'front-delts', 2),
  ('pull-up', 'lats', 0),
  ('pull-up', 'biceps', 1),
  ('pull-up', 'rear-delts', 2),
  ('dip', 'triceps', 0),
  ('dip', 'chest', 1),
  ('dip', 'front-delts', 2),
  ('hollow-hold', 'abs', 0),
  ('hollow-hold', 'hip-flexors', 1),
  ('l-sit', 'abs', 0),
  ('l-sit', 'hip-flexors', 1),
  ('l-sit', 'triceps', 2),
  ('pistol-squat', 'quads', 0),
  ('pistol-squat', 'glutes', 1),
  ('pistol-squat', 'core', 2),
  ('muscle-up', 'lats', 0),
  ('muscle-up', 'chest', 1),
  ('muscle-up', 'triceps', 2),
  ('front-lever', 'lats', 0),
  ('front-lever', 'core', 1),
  ('front-lever', 'rear-delts', 2),
  ('planche-lean', 'front-delts', 0),
  ('planche-lean', 'chest', 1),
  ('planche-lean', 'wrists', 2)
on conflict (exercise_slug, muscle_id) do update set position = excluded.position;

commit;
