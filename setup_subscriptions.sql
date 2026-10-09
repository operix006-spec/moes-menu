-- =================================================================================
-- Moe's PureBite - Subscriptions Supabase Setup
-- Instructions: Copy and run this script in your Supabase SQL Editor.
-- =================================================================================

-- 1. Create the table
CREATE TABLE IF NOT EXISTS public.subscription_config (
    id VARCHAR(50) PRIMARY KEY,
    content JSONB DEFAULT '{}'::jsonb,
    slider JSONB DEFAULT '[]'::jsonb,
    pricing JSONB DEFAULT '{}'::jsonb,
    meal_library JSONB DEFAULT '{}'::jsonb,
    schedules JSONB DEFAULT '{}'::jsonb
);

-- 2. Insert the initial global configuration row
INSERT INTO public.subscription_config (id, content, slider, pricing, meal_library, schedules)
VALUES (
    'global',
    '{
        "hero_badge": "اشتراك الوجبات الشهرية والأسبوعية",
        "hero_badge_en": "Monthly & Weekly Meal Subscriptions",
        "hero_title": "طعام نقي، محضّر خصيصاً لك",
        "hero_title_en": "Pure Food, Planned for You",
        "hero_title_highlight": "محضّر خصيصاً لك",
        "hero_title_highlight_en": "Planned for You",
        "hero_subtitle": "جداول وجبات خالية من الغلوتين ١٠٠٪ ومحضّرة أسبوعياً في مطبخنا المخصص والآمن لمرضى السيلياك.",
        "hero_subtitle_en": "100% gluten-free, chef-crafted weekly meal schedules prepared fresh in our dedicated celiac-safe kitchen.",
        "hero_trust_celiac": "آمن للسيلياك ١٠٠٪",
        "hero_trust_celiac_en": "100% Celiac Safe",
        "hero_trust_kitchen": "مطبخ مخصص وآمن",
        "hero_trust_kitchen_en": "Dedicated Safe Kitchen",
        "hero_trust_fresh": "جداول متجددة أسبوعياً",
        "hero_trust_fresh_en": "Fresh Weekly Schedules",
        "hero_image": "assets/images/subscription_hero.jpg",
        "delivery_section_eyebrow": "منطقة التوصيل",
        "delivery_section_eyebrow_en": "Delivery Area",
        "delivery_main_statement": "نوصل ضمن نطاق 10 كم من موقع Moe’s PureBite",
        "delivery_main_statement_en": "Delivery is available within a 10 KM radius of Moe’s PureBite.",
        "delivery_subtext": "تشمل التغطية مناطق قريبة من المطبخ، وقد تختلف حسب الموقع الدقيق.",
        "delivery_subtext_en": "Coverage includes areas near our kitchen and may vary based on your exact location.",
        "delivery_areas_ar": "مرج الحمام، السابع، البنيات، الصويفية، دير غبار، عبدون",
        "delivery_areas_en": "Marj Al Hamam, Seventh Circle, Al Bunayyat, Sweifieh, Deir Ghbar, Abdoun",
        "delivery_note_inside": "<strong>ضمن النطاق:</strong> التغطية تعتمد على موقعك الدقيق، يرجى التواصل لتأكيد عنوانك.",
        "delivery_note_inside_en": "<strong>Within standard zone:</strong> Coverage depends on your exact location. Please reach out to confirm your address.",
        "delivery_note_outside": "<strong>خارج النطاق المباشر:</strong> تتوفر إمكانية التنسيق والتوصيل، يرجى التواصل معنا للتأكيد والترتيب المسبق.",
        "delivery_note_outside_en": "<strong>Outside direct zone:</strong> Delivery coordination may be arranged upon request. Please contact us to confirm and arrange.",
        "brochures_badge": "النشرات وقوائم الأسعار الرسمية",
        "brochures_badge_en": "OFFICIAL FLYERS & MENUS",
        "brochures_title": "نشرات وباقات الوجبات",
        "brochures_title_en": "Official Menu & Plan Posters",
        "brochures_subtitle": "تصفح النشرات الرسمية للوجبات، الأسعار، وتفاصيل المطبخ المعتمد (اسحب أو اضغط للتكبير)",
        "brochures_subtitle_en": "Browse our official flyers for weekly menus, pricing, and dedicated kitchen details",
        "schedule_toggle_eyebrow": "الجدول الأسبوعي الكامل",
        "schedule_toggle_eyebrow_en": "COMPLETE WEEKLY SCHEDULE",
        "schedule_toggle_btn_show": "عرض خطة وجبات الأسابيع التفصيلية",
        "schedule_toggle_btn_show_en": "Show Detailed Weekly Meal Plans",
        "schedule_toggle_btn_hide": "إخفاء خطة وجبات الأسابيع التفصيلية",
        "schedule_toggle_btn_hide_en": "Hide Detailed Weekly Meal Plans",
        "schedule_toggle_hint": "اضغط هنا لاستعراض وجبات الأيام وخياراتها المتنوعة بالتفصيل",
        "schedule_toggle_hint_en": "Click here to view daily dishes and diverse meal options in detail",
        "schedule_title": "خطة وجبات الشهر",
        "schedule_title_en": "Meal Plan",
        "schedule_hint": "اضغط على أي وجبة لمعرفة التفاصيل والمكونات",
        "schedule_hint_en": "Tap any meal to view details",
        "options_title": "خيارات الاشتراك",
        "options_title_en": "Customize Your Subscription",
        "options_subtitle": "اختر المدة وعدد الوجبات الأسبوعية المناسبة لك",
        "options_subtitle_en": "Select your duration and weekly meal schedule",
        "summary_note": "لا يتطلب دفع إلكتروني • يتم التأكيد والتنسيق مباشرة عبر واتساب",
        "summary_note_en": "No online payment • Confirmed directly on WhatsApp"
    }'::jsonb,
    '[
        {"url": "assets/images/slides/slide_1.jpg"},
        {"url": "assets/images/slides/slide_2.jpg"},
        {"url": "assets/images/slides/slide_6.jpg"},
        {"url": "assets/images/slides/slide_3.jpg"},
        {"url": "assets/images/slides/slide_4.jpg"}
    ]'::jsonb,
    '{
        "mix": {
            "14_days": { "5_meals": "85", "6_meals": "98" },
            "monthly": { "5_meals": "160", "6_meals": "185" }
        }
    }'::jsonb,
    '{}'::jsonb,
    '{}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- 3. Set up RLS (Row Level Security) - allow public read, but restrict writes to authenticated or disable for now
ALTER TABLE public.subscription_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.subscription_config;
DROP POLICY IF EXISTS "Enable all access for all users" ON public.subscription_config;

CREATE POLICY "Enable read access for all users" ON public.subscription_config FOR SELECT USING (true);
CREATE POLICY "Enable all access for all users" ON public.subscription_config FOR ALL USING (true) WITH CHECK (true);
