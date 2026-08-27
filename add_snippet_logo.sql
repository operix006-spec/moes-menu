ALTER TABLE home_content
ADD COLUMN IF NOT EXISTS "snippetLogo" TEXT;

NOTIFY pgrst, 'reload schema';
