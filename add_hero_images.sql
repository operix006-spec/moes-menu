ALTER TABLE home_content
ADD COLUMN IF NOT EXISTS "heroImageBg" TEXT,
ADD COLUMN IF NOT EXISTS "heroImageSecondary" TEXT;

ALTER TABLE about_content
ADD COLUMN IF NOT EXISTS "heroImage" TEXT;

NOTIFY pgrst, 'reload schema';
