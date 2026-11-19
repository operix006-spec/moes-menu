-- =================================================================================
-- Moe's PureBite - Immediate Delivery Flag Setup
-- Instructions: Copy and run this script in your Supabase SQL Editor.
-- =================================================================================

-- 1. Add the isImmediateDelivery column to public.products if it does not already exist
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS "isImmediateDelivery" BOOLEAN DEFAULT false;

-- 2. Set isImmediateDelivery = true for snacks, burgers, shawerma, chicken boxes, salads
UPDATE public.products
SET "isImmediateDelivery" = true
WHERE category IN ('burgers', 'sandwiches-quesadilla', 'chicken-boxes', 'salads')
  AND ("isPreOrder24h" IS NOT TRUE);

-- 3. Notify PostgREST to reload schema cache immediately
NOTIFY pgrst, 'reload schema';
