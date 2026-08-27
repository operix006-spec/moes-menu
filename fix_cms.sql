-- ==========================================
-- Supabase CMS Tables Fix
-- Adds missing columns for Home and About CMS content
-- ==========================================

ALTER TABLE public.home_content
ADD COLUMN IF NOT EXISTS "heroBadge" TEXT,
ADD COLUMN IF NOT EXISTS "heroBadge_ar" TEXT,
ADD COLUMN IF NOT EXISTS "heroTitle" TEXT,
ADD COLUMN IF NOT EXISTS "heroTitle_ar" TEXT,
ADD COLUMN IF NOT EXISTS "heroSubtitle" TEXT,
ADD COLUMN IF NOT EXISTS "heroSubtitle_ar" TEXT,
ADD COLUMN IF NOT EXISTS "heroDesc" TEXT,
ADD COLUMN IF NOT EXISTS "heroDesc_ar" TEXT,
ADD COLUMN IF NOT EXISTS "heroCtaPrimary" TEXT,
ADD COLUMN IF NOT EXISTS "heroCtaPrimary_ar" TEXT,
ADD COLUMN IF NOT EXISTS "heroCtaSecondary" TEXT,
ADD COLUMN IF NOT EXISTS "heroCtaSecondary_ar" TEXT;

ALTER TABLE public.about_content
ADD COLUMN IF NOT EXISTS "heroTitle" TEXT,
ADD COLUMN IF NOT EXISTS "heroTitle_ar" TEXT,
ADD COLUMN IF NOT EXISTS "heroSubtitle" TEXT,
ADD COLUMN IF NOT EXISTS "heroSubtitle_ar" TEXT,
ADD COLUMN IF NOT EXISTS "storyTitle" TEXT,
ADD COLUMN IF NOT EXISTS "storyTitle_ar" TEXT,
ADD COLUMN IF NOT EXISTS "storyText" TEXT,
ADD COLUMN IF NOT EXISTS "storyText_ar" TEXT,
ADD COLUMN IF NOT EXISTS "closingCardTitle" TEXT,
ADD COLUMN IF NOT EXISTS "closingCardTitle_ar" TEXT,
ADD COLUMN IF NOT EXISTS "closingCardText" TEXT,
ADD COLUMN IF NOT EXISTS "closingCardText_ar" TEXT;
