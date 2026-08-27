-- ==========================================
-- Supabase CMS Tables Fix (V2)
-- Adds the ACTUAL missing columns for Home CMS
-- ==========================================

ALTER TABLE public.home_content
ADD COLUMN IF NOT EXISTS "heroDescription" TEXT,
ADD COLUMN IF NOT EXISTS "heroDescription_ar" TEXT,
ADD COLUMN IF NOT EXISTS "heroCtaText" TEXT,
ADD COLUMN IF NOT EXISTS "heroCtaText_ar" TEXT,
ADD COLUMN IF NOT EXISTS "promiseSubtitle" TEXT,
ADD COLUMN IF NOT EXISTS "promiseSubtitle_ar" TEXT,
ADD COLUMN IF NOT EXISTS "promiseTitle" TEXT,
ADD COLUMN IF NOT EXISTS "promiseTitle_ar" TEXT,
ADD COLUMN IF NOT EXISTS "promiseText" TEXT,
ADD COLUMN IF NOT EXISTS "promiseText_ar" TEXT;
