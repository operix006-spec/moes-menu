ALTER TABLE products
ADD COLUMN IF NOT EXISTS "order" INT DEFAULT 0;

NOTIFY pgrst, 'reload schema';
