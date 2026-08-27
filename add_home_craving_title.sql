ALTER TABLE home_content
ADD COLUMN IF NOT EXISTS "cravingTitle" TEXT,
ADD COLUMN IF NOT EXISTS "cravingTitle_ar" TEXT;

UPDATE home_content
SET 
  "cravingTitle" = 'What Are You Craving?',
  "cravingTitle_ar" = 'ماذا تشتهي اليوم؟'
WHERE id = 'global';

NOTIFY pgrst, 'reload schema';
