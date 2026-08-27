-- =================================================================================
-- Moe's PureBite - Ultimate Fix for Admin CMS & Saving (Disable RLS)
-- =================================================================================

-- 1. Disable Row Level Security (RLS) on all tables so Admin saves never get blocked
ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_content DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content DISABLE ROW LEVEL SECURITY;

-- 2. Drop any restrictive policies and allow full public access if RLS is ever re-enabled
DROP POLICY IF EXISTS "Allow authenticated full access on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow authenticated full access on products" ON public.products;
DROP POLICY IF EXISTS "Allow authenticated full access on settings" ON public.settings;
DROP POLICY IF EXISTS "Allow authenticated full access on home_content" ON public.home_content;
DROP POLICY IF EXISTS "Allow authenticated full access on about_content" ON public.about_content;

DROP POLICY IF EXISTS "Allow all on categories" ON public.categories;
CREATE POLICY "Allow all on categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on products" ON public.products;
CREATE POLICY "Allow all on products" ON public.products FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on settings" ON public.settings;
CREATE POLICY "Allow all on settings" ON public.settings FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on home_content" ON public.home_content;
CREATE POLICY "Allow all on home_content" ON public.home_content FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on about_content" ON public.about_content;
CREATE POLICY "Allow all on about_content" ON public.about_content FOR ALL USING (true) WITH CHECK (true);

-- 3. Grant full table permissions to anon & authenticated roles
GRANT ALL ON TABLE public.categories TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.products TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.settings TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.home_content TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.about_content TO anon, authenticated, service_role;
