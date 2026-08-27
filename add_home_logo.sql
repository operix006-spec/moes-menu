ALTER TABLE home_content
ADD COLUMN IF NOT EXISTS "heroLogo" TEXT;

NOTIFY pgrst, 'reload schema';
