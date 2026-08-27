-- ==========================================
-- Supabase Settings Table Fix
-- Adds missing columns for social media and phone
-- ==========================================

ALTER TABLE public.settings
ADD COLUMN IF NOT EXISTS "phoneDisplay" TEXT,
ADD COLUMN IF NOT EXISTS "phoneCallable" TEXT,
ADD COLUMN IF NOT EXISTS "instagram" TEXT,
ADD COLUMN IF NOT EXISTS "facebook" TEXT,
ADD COLUMN IF NOT EXISTS "workingHours" TEXT,
ADD COLUMN IF NOT EXISTS "lang" TEXT;
