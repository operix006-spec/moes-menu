-- =================================================================================
-- Moe's PureBite - Supabase Data Migration
-- Instructions: Copy and run this script in your Supabase SQL Editor AFTER the schema script.
-- =================================================================================

-- Categories
INSERT INTO public.categories (id, name, name_ar, icon, "order", enabled) VALUES ('all', 'All', 'الكل', '✨', 1, true);
INSERT INTO public.categories (id, name, name_ar, icon, "order", enabled) VALUES ('burgers-sandwiches', 'Burgers & Sandwiches', 'برجر وساندويشات', '🍔', 2, true);
INSERT INTO public.categories (id, name, name_ar, icon, "order", enabled) VALUES ('chicken-boxes', 'Chicken & Boxes', 'دجاج وبوكسات', '🍗', 3, true);
INSERT INTO public.categories (id, name, name_ar, icon, "order", enabled) VALUES ('salads', 'Salads', 'سلطات', '🥗', 4, true);
INSERT INTO public.categories (id, name, name_ar, icon, "order", enabled) VALUES ('broasted', 'Broasted', 'بروستد', '🍗', 5, true);
INSERT INTO public.categories (id, name, name_ar, icon, "order", enabled) VALUES ('main-dishes', 'Main Dishes', 'أطباق رئيسية', '🍛', 6, true);
INSERT INTO public.categories (id, name, name_ar, icon, "order", enabled) VALUES ('drinks-extras', 'Drinks & Extras', 'مشروبات وإضافات', '🥤', 7, true);

-- Products
-- ==========================================
-- Tawasi Dishes (24h Pre-Order) Migration
-- ==========================================

INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients, "order") VALUES (
    'kabsa',
    'main-dishes',
    'Kabsa',
    'كبسة خليجية',
    'Fragrant basmati rice infused with onions, tomatoes, dried lime, and authentic Khaleeji Kabsa spices. Available with fresh chicken or meat.',
    'أرز بسمتي مبهر غني بنكهة البصل والطماطم ومعجون الطماطم واللومي وبهارات الكبسة الخليجية الخاصة. متوفر بخيار الدجاج أو اللحم الطازج.',
    5.5,
    'assets/images/tawasi_kabsa.jpg',
    true,
    true,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","name_ar":"الخيار والكمية (مطلوب)","required":true,"type":"radio","options":[{"id":"chk-1","name":"1 Chicken","name_ar":"دجاجة","price":0,"default":true},{"id":"chk-2","name":"2 Chickens","name_ar":"دجاجتين","price":7,"default":false},{"id":"meat-1kg","name":"1 KG Meat","name_ar":"1 ك لحم","price":7,"default":false},{"id":"meat-2kg","name":"2 KG Meat","name_ar":"2 ك لحم","price":20,"default":false}]}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","name_ar":"دقوس إضافي","price":0.5,"type":"add"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","name_ar":"لوز ومكسرات محمصة","price":0.5,"type":"add"}]'::jsonb,
    '[{"id":"rice","name":"Basmati Rice","name_ar":"أرز بسمتي","desc":"Premium basmati rice","icon":"assets/images/ing_bun.png","removable":false},{"id":"protein","name":"Chicken or Meat Choice","name_ar":"خيار الدجاج أو اللحم","desc":"Choice of fresh chicken or tender meat","icon":"assets/images/ing_chicken.png","removable":false},{"id":"veggies","name":"Onions, Tomatoes & Tomato Paste","name_ar":"بصل وطماطم ومعجون طماطم","desc":"Cooked fresh vegetables","icon":"assets/images/ing_tomato.png","removable":false},{"id":"spices","name":"Dried Lime & Kabsa Spices","name_ar":"لومي وبهارات كبسة خالية من الغلوتين","desc":"Gluten-free traditional spices","icon":"assets/images/ing_sauce.png","removable":false},{"id":"daqoos","name":"Daqoos Sauce","name_ar":"صلصة دقوس طازجة","desc":"Fresh tomato daqoos","icon":"assets/images/ing_sauce.png","removable":false}]'::jsonb,
    50
  ) ON CONFLICT (id) DO UPDATE SET
    category = EXCLUDED.category, name = EXCLUDED.name, name_ar = EXCLUDED.name_ar,
    description = EXCLUDED.description, description_ar = EXCLUDED.description_ar,
    "basePrice" = EXCLUDED."basePrice", image = EXCLUDED.image, available = EXCLUDED.available,
    "isPreOrder24h" = EXCLUDED."isPreOrder24h", "optionGroups" = EXCLUDED."optionGroups",
    modifiers = EXCLUDED.modifiers, ingredients = EXCLUDED.ingredients, "order" = EXCLUDED."order";

INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients, "order") VALUES (
    'biryani',
    'main-dishes',
    'Biryani',
    'برياني',
    'Fragrant saffron basmati rice with authentic aromatic spices and roasted nuts. Available with fresh chicken or meat.',
    'أرز بسمتي هندي معطر بالزعفران والتوابل العطرية الأصيلة والمكسرات المحمصة. متوفر بخيار الدجاج أو اللحم الطازج.',
    5,
    'assets/images/tawasi_biryani.jpg',
    true,
    false,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","name_ar":"الخيار والكمية (مطلوب)","required":true,"type":"radio","options":[{"id":"chk-1","name":"1 Chicken","name_ar":"دجاجة","price":0,"default":true},{"id":"chk-2","name":"2 Chickens","name_ar":"دجاجتين","price":7,"default":false},{"id":"meat-1kg","name":"1 KG Meat","name_ar":"1 ك لحم","price":7,"default":false},{"id":"meat-2kg","name":"2 KG Meat","name_ar":"2 ك لحم","price":20,"default":false}]}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","name_ar":"دقوس إضافي","price":0.5,"type":"add"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","name_ar":"لوز ومكسرات محمصة","price":0.5,"type":"add"}]'::jsonb,
    '[{"id":"rice","name":"Saffron Basmati Rice","name_ar":"أرز بسمتي بالزعفران","desc":"Saffron spiced rice","icon":"assets/images/ing_bun.png","removable":false},{"id":"protein","name":"Chicken or Meat Choice","name_ar":"خيار الدجاج أو اللحم","desc":"Choice of fresh chicken or tender meat","icon":"assets/images/ing_chicken.png","removable":false},{"id":"aromatics","name":"Onions & Roasted Nuts","name_ar":"بصل ومكسرات محمصة","desc":"Aromatic garnishes","icon":"assets/images/ing_lettuce.png","removable":false},{"id":"spices","name":"Gluten-Free Biryani Spices","name_ar":"بهارات برياني خالية من الغلوتين","desc":"Rich Indian spices","icon":"assets/images/ing_sauce.png","removable":false}]'::jsonb,
    51
  ) ON CONFLICT (id) DO UPDATE SET
    category = EXCLUDED.category, name = EXCLUDED.name, name_ar = EXCLUDED.name_ar,
    description = EXCLUDED.description, description_ar = EXCLUDED.description_ar,
    "basePrice" = EXCLUDED."basePrice", image = EXCLUDED.image, available = EXCLUDED.available,
    "isPreOrder24h" = EXCLUDED."isPreOrder24h", "optionGroups" = EXCLUDED."optionGroups",
    modifiers = EXCLUDED.modifiers, ingredients = EXCLUDED.ingredients, "order" = EXCLUDED."order";

INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients, "order") VALUES (
    'zarb',
    'main-dishes',
    'Zarb',
    'زرب',
    'Traditional underground slow-cooked smoked basmati rice with rich aromatic spices. Available with fresh chicken or meat.',
    'أرز بسمتي مدخن محضر على طريقة الزرب التقليدية مع البهارات الفاخرة لنكهة غنية. متوفر بخيار الدجاج أو اللحم الطازج.',
    4.5,
    'assets/images/tawasi_zarb.jpg',
    true,
    false,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","name_ar":"الخيار والكمية (مطلوب)","required":true,"type":"radio","options":[{"id":"chk-1","name":"1 Chicken","name_ar":"دجاجة","price":0,"default":true},{"id":"chk-2","name":"2 Chickens","name_ar":"دجاجتين","price":7,"default":false},{"id":"meat-1kg","name":"1 KG Meat","name_ar":"1 ك لحم","price":7,"default":false},{"id":"meat-2kg","name":"2 KG Meat","name_ar":"2 ك لحم","price":20,"default":false}]}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","name_ar":"دقوس إضافي","price":0.5,"type":"add"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","name_ar":"لوز ومكسرات محمصة","price":0.5,"type":"add"}]'::jsonb,
    '[{"id":"rice","name":"Smoked Zarb Basmati Rice","name_ar":"أرز بسمتي مدخن","desc":"Slow-cooked smoked rice","icon":"assets/images/ing_bun.png","removable":false},{"id":"protein","name":"Chicken or Meat Choice","name_ar":"خيار الدجاج أو اللحم","desc":"Choice of fresh chicken or tender meat","icon":"assets/images/ing_chicken.png","removable":false},{"id":"aromatics","name":"Onions & Dried Lime","name_ar":"بصل ولومي","desc":"Smoked aromatics","icon":"assets/images/ing_tomato.png","removable":false},{"id":"spices","name":"Gluten-Free Zarb Spices","name_ar":"بهارات زرب خالية من الغلوتين","desc":"Traditional herbs and spices","icon":"assets/images/ing_sauce.png","removable":false}]'::jsonb,
    52
  ) ON CONFLICT (id) DO UPDATE SET
    category = EXCLUDED.category, name = EXCLUDED.name, name_ar = EXCLUDED.name_ar,
    description = EXCLUDED.description, description_ar = EXCLUDED.description_ar,
    "basePrice" = EXCLUDED."basePrice", image = EXCLUDED.image, available = EXCLUDED.available,
    "isPreOrder24h" = EXCLUDED."isPreOrder24h", "optionGroups" = EXCLUDED."optionGroups",
    modifiers = EXCLUDED.modifiers, ingredients = EXCLUDED.ingredients, "order" = EXCLUDED."order";

INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients, "order") VALUES (
    'mandi',
    'main-dishes',
    'Mandi',
    'مندي',
    'Authentic smoked basmati rice infused with onions, dried lime, and signature Mandi spices, served with fresh Daqoos. Available with fresh chicken or meat.',
    'أرز بسمتي مدخن مطبوخ مع البصل واللومي وبهارات المندي الأصيلة مع صلصة الدقوس. متوفر بخيار الدجاج أو اللحم الطازج.',
    4.5,
    'assets/images/tawasi_mandi.jpg',
    true,
    true,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","name_ar":"الخيار والكمية (مطلوب)","required":true,"type":"radio","options":[{"id":"chk-1","name":"1 Chicken","name_ar":"دجاجة","price":0,"default":true},{"id":"chk-2","name":"2 Chickens","name_ar":"دجاجتين","price":7,"default":false},{"id":"meat-1kg","name":"1 KG Meat","name_ar":"1 ك لحم","price":7,"default":false},{"id":"meat-2kg","name":"2 KG Meat","name_ar":"2 ك لحم","price":20,"default":false}]}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","name_ar":"دقوس إضافي","price":0.5,"type":"add"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","name_ar":"لوز ومكسرات محمصة","price":0.5,"type":"add"}]'::jsonb,
    '[{"id":"rice","name":"Smoked Basmati Rice","name_ar":"أرز بسمتي مدخن","desc":"Aromatic smoked rice","icon":"assets/images/ing_bun.png","removable":false},{"id":"protein","name":"Chicken or Meat Choice","name_ar":"خيار الدجاج أو اللحم","desc":"Choice of fresh chicken or tender meat","icon":"assets/images/ing_chicken.png","removable":false},{"id":"aromatics","name":"Onions & Dried Lime","name_ar":"بصل ولومي","desc":"Flavorful aromatic base","icon":"assets/images/ing_tomato.png","removable":false},{"id":"spices","name":"Gluten-Free Mandi Spices","name_ar":"بهارات مندي خالية من الغلوتين","desc":"Authentic spice blend","icon":"assets/images/ing_sauce.png","removable":false},{"id":"daqoos","name":"Fresh Daqoos Sauce","name_ar":"صلصة دقوس طازجة","desc":"Fresh tomato and chili sauce","icon":"assets/images/ing_sauce.png","removable":false}]'::jsonb,
    53
  ) ON CONFLICT (id) DO UPDATE SET
    category = EXCLUDED.category, name = EXCLUDED.name, name_ar = EXCLUDED.name_ar,
    description = EXCLUDED.description, description_ar = EXCLUDED.description_ar,
    "basePrice" = EXCLUDED."basePrice", image = EXCLUDED.image, available = EXCLUDED.available,
    "isPreOrder24h" = EXCLUDED."isPreOrder24h", "optionGroups" = EXCLUDED."optionGroups",
    modifiers = EXCLUDED.modifiers, ingredients = EXCLUDED.ingredients, "order" = EXCLUDED."order";

INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients, "order") VALUES (
    'ouzi',
    'main-dishes',
    'Ouzi',
    'أوزي',
    'Fragrant oriental rice with green peas, sweet carrots, toasted nuts, and warm spices. Available with fresh chicken or meat.',
    'أرز أوزي شرقي فاخر مطبوخ بالبازيلاء والجزر والمكسرات والتوابل الدافئة. متوفر بخيار الدجاج أو اللحم الطازج.',
    4.75,
    'assets/images/tawasi_ouzi.jpg',
    true,
    false,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","name_ar":"الخيار والكمية (مطلوب)","required":true,"type":"radio","options":[{"id":"chk-1","name":"1 Chicken","name_ar":"دجاجة","price":0,"default":true},{"id":"chk-2","name":"2 Chickens","name_ar":"دجاجتين","price":7,"default":false},{"id":"meat-1kg","name":"1 KG Meat","name_ar":"1 ك لحم","price":7,"default":false},{"id":"meat-2kg","name":"2 KG Meat","name_ar":"2 ك لحم","price":20,"default":false}]}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","name_ar":"دقوس إضافي","price":0.5,"type":"add"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","name_ar":"لوز ومكسرات محمصة","price":0.5,"type":"add"}]'::jsonb,
    '[{"id":"rice","name":"Oriental Basmati Rice","name_ar":"أرز شرقي فاخر","desc":"Spiced aromatic rice","icon":"assets/images/ing_bun.png","removable":false},{"id":"protein","name":"Chicken or Meat Choice","name_ar":"خيار الدجاج أو اللحم","desc":"Choice of fresh chicken or tender meat","icon":"assets/images/ing_chicken.png","removable":false},{"id":"veggies","name":"Green Peas & Carrots","name_ar":"بازيلاء وجزر","desc":"Tender sweet vegetables","icon":"assets/images/ing_lettuce.png","removable":false},{"id":"nuts","name":"Toasted Nuts & Special Spices","name_ar":"مكسرات محمصة وتوابل دافئة","desc":"Golden almonds and aromatics","icon":"assets/images/ing_bun.png","removable":false}]'::jsonb,
    54
  ) ON CONFLICT (id) DO UPDATE SET
    category = EXCLUDED.category, name = EXCLUDED.name, name_ar = EXCLUDED.name_ar,
    description = EXCLUDED.description, description_ar = EXCLUDED.description_ar,
    "basePrice" = EXCLUDED."basePrice", image = EXCLUDED.image, available = EXCLUDED.available,
    "isPreOrder24h" = EXCLUDED."isPreOrder24h", "optionGroups" = EXCLUDED."optionGroups",
    modifiers = EXCLUDED.modifiers, ingredients = EXCLUDED.ingredients, "order" = EXCLUDED."order";

INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients, "order") VALUES (
    'zurbian',
    'main-dishes',
    'Zurbian',
    'زربيان',
    'Basmati rice slow-cooked with golden potatoes, onions, tomatoes, and dried lime with special Zurbian spices. Available with fresh chicken or meat.',
    'أرز بسمتي مدخن مطبوخ مع قطع البطاطا الذهبية والبصل والطماطم واللومي بتوابل الزربيان المميزة. متوفر بخيار الدجاج أو اللحم الطازج.',
    4.5,
    'assets/images/zurbian.jpg',
    true,
    false,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","name_ar":"الخيار والكمية (مطلوب)","required":true,"type":"radio","options":[{"id":"chk-1","name":"1 Chicken","name_ar":"دجاجة","price":0,"default":true},{"id":"chk-2","name":"2 Chickens","name_ar":"دجاجتين","price":7,"default":false},{"id":"meat-1kg","name":"1 KG Meat","name_ar":"1 ك لحم","price":7,"default":false},{"id":"meat-2kg","name":"2 KG Meat","name_ar":"2 ك لحم","price":20,"default":false}]}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","name_ar":"دقوس إضافي","price":0.5,"type":"add"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","name_ar":"لوز ومكسرات محمصة","price":0.5,"type":"add"}]'::jsonb,
    '[{"id":"rice","name":"Basmati Rice","name_ar":"أرز بسمتي","desc":"Fragrant basmati rice","icon":"assets/images/ing_bun.png","removable":false},{"id":"protein","name":"Chicken or Meat Choice","name_ar":"خيار الدجاج أو اللحم","desc":"Choice of fresh chicken or tender meat","icon":"assets/images/ing_chicken.png","removable":false},{"id":"potato","name":"Golden Potatoes","name_ar":"بطاطا","desc":"Tender spiced potatoes","icon":"assets/images/ing_bun.png","removable":false},{"id":"veggies","name":"Onions & Tomatoes","name_ar":"بصل وطماطم","desc":"Caramelized onions and tomatoes","icon":"assets/images/ing_tomato.png","removable":false},{"id":"spices","name":"Dried Lime & Zurbian Spices","name_ar":"لومي وبهارات مميزة خالية من الغلوتين","desc":"Gluten-free Yemeni spices","icon":"assets/images/ing_sauce.png","removable":false}]'::jsonb,
    55
  ) ON CONFLICT (id) DO UPDATE SET
    category = EXCLUDED.category, name = EXCLUDED.name, name_ar = EXCLUDED.name_ar,
    description = EXCLUDED.description, description_ar = EXCLUDED.description_ar,
    "basePrice" = EXCLUDED."basePrice", image = EXCLUDED.image, available = EXCLUDED.available,
    "isPreOrder24h" = EXCLUDED."isPreOrder24h", "optionGroups" = EXCLUDED."optionGroups",
    modifiers = EXCLUDED.modifiers, ingredients = EXCLUDED.ingredients, "order" = EXCLUDED."order";

INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients, "order") VALUES (
    'qidreh-khaliliyeh',
    'main-dishes',
    'Qidreh Khaliliyeh',
    'قدرة خليلية',
    'Traditional Hebron rice slow-cooked with pure ghee, whole chickpeas, garlic cloves, onions, and heritage spices. Available with fresh chicken or meat.',
    'أرز فاخر مطبوخ بالسمن البلدي مع حب الحمص وفصوص الثوم والبصل والبهارات التراثية. متوفر بخيار الدجاج أو اللحم الطازج.',
    4.5,
    'assets/images/tawasi_qidreh.jpg',
    true,
    false,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","name_ar":"الخيار والكمية (مطلوب)","required":true,"type":"radio","options":[{"id":"chk-1","name":"1 Chicken","name_ar":"دجاجة","price":0,"default":true},{"id":"chk-2","name":"2 Chickens","name_ar":"دجاجتين","price":7,"default":false},{"id":"meat-1kg","name":"1 KG Meat","name_ar":"1 ك لحم","price":7,"default":false},{"id":"meat-2kg","name":"2 KG Meat","name_ar":"2 ك لحم","price":20,"default":false}]}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","name_ar":"دقوس إضافي","price":0.5,"type":"add"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","name_ar":"لوز ومكسرات محمصة","price":0.5,"type":"add"}]'::jsonb,
    '[{"id":"rice","name":"Ghee-Cooked Rice","name_ar":"أرز مطبوخ بالسمن البلدي","desc":"Cooked with authentic baladi ghee","icon":"assets/images/ing_bun.png","removable":false},{"id":"protein","name":"Chicken or Meat Choice","name_ar":"خيار الدجاج أو اللحم","desc":"Choice of fresh chicken or tender meat","icon":"assets/images/ing_chicken.png","removable":false},{"id":"chickpeas","name":"Whole Chickpeas","name_ar":"حمص حب","desc":"Plump garbanzo beans","icon":"assets/images/ing_bun.png","removable":false},{"id":"garlic-onion","name":"Garlic Cloves & Onions","name_ar":"ثوم وبصل","desc":"Whole garlic cloves and sweet onions","icon":"assets/images/ing_lettuce.png","removable":false},{"id":"spices","name":"Gluten-Free Qidreh Spices","name_ar":"بهارات تراثية خالية من الغلوتين","desc":"Authentic Hebron spice mix","icon":"assets/images/ing_sauce.png","removable":false}]'::jsonb,
    56
  ) ON CONFLICT (id) DO UPDATE SET
    category = EXCLUDED.category, name = EXCLUDED.name, name_ar = EXCLUDED.name_ar,
    description = EXCLUDED.description, description_ar = EXCLUDED.description_ar,
    "basePrice" = EXCLUDED."basePrice", image = EXCLUDED.image, available = EXCLUDED.available,
    "isPreOrder24h" = EXCLUDED."isPreOrder24h", "optionGroups" = EXCLUDED."optionGroups",
    modifiers = EXCLUDED.modifiers, ingredients = EXCLUDED.ingredients, "order" = EXCLUDED."order";

INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients, "order") VALUES (
    'chicken-madghout',
    'main-dishes',
    'Chicken Madghout',
    'دجاج مضغوط',
    'Basmati rice pressure-cooked for a rich concentrated flavor with onions, dried lime, and special spices. Available with fresh chicken or meat.',
    'أرز بسمتي مطبوخ في قدر الضغط لنكهة غنية ومركزة مع البصل واللومي والبهارات الخاصة. متوفر بخيار الدجاج أو اللحم الطازج.',
    4.5,
    'assets/images/tawasi_madghout.jpg',
    true,
    false,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","name_ar":"الخيار والكمية (مطلوب)","required":true,"type":"radio","options":[{"id":"chk-1","name":"1 Chicken","name_ar":"دجاجة","price":0,"default":true},{"id":"chk-2","name":"2 Chickens","name_ar":"دجاجتين","price":7,"default":false},{"id":"meat-1kg","name":"1 KG Meat","name_ar":"1 ك لحم","price":7,"default":false},{"id":"meat-2kg","name":"2 KG Meat","name_ar":"2 ك لحم","price":20,"default":false}]}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","name_ar":"دقوس إضافي","price":0.5,"type":"add"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","name_ar":"لوز ومكسرات محمصة","price":0.5,"type":"add"}]'::jsonb,
    '[{"id":"rice","name":"Pressure-Cooked Basmati Rice","name_ar":"أرز بسمتي مطبوخ بقدر الضغط","desc":"Concentrated savory basmati rice","icon":"assets/images/ing_bun.png","removable":false},{"id":"protein","name":"Chicken or Meat Choice","name_ar":"خيار الدجاج أو اللحم","desc":"Choice of fresh chicken or tender meat","icon":"assets/images/ing_chicken.png","removable":false},{"id":"aromatics","name":"Onions & Dried Lime","name_ar":"بصل ولومي","desc":"Aromatic base","icon":"assets/images/ing_tomato.png","removable":false},{"id":"spices","name":"Special Gluten-Free Spices","name_ar":"بهارات خاصة خالية من الغلوتين","desc":"Signature concentrated spices","icon":"assets/images/ing_sauce.png","removable":false}]'::jsonb,
    57
  ) ON CONFLICT (id) DO UPDATE SET
    category = EXCLUDED.category, name = EXCLUDED.name, name_ar = EXCLUDED.name_ar,
    description = EXCLUDED.description, description_ar = EXCLUDED.description_ar,
    "basePrice" = EXCLUDED."basePrice", image = EXCLUDED.image, available = EXCLUDED.available,
    "isPreOrder24h" = EXCLUDED."isPreOrder24h", "optionGroups" = EXCLUDED."optionGroups",
    modifiers = EXCLUDED.modifiers, ingredients = EXCLUDED.ingredients, "order" = EXCLUDED."order";

INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients, "order") VALUES (
    'uzbekian',
    'main-dishes',
    'Uzbekian',
    'أوزباكيان',
    'Authentic Uzbek pilaf basmati rice with sweet julienned carrots, onions, plump raisins, and special Uzbek spices. Available with fresh chicken or meat.',
    'طبق أوزبكي فاخر بأرز البسمتي مع شرحات الجزر الحلو والبصل والزبيب والبهارات الأوزبكية الخاصة. متوفر بخيار الدجاج أو اللحم الطازج.',
    4.75,
    'assets/images/tawasi_uzbekian.jpg',
    true,
    false,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","name_ar":"الخيار والكمية (مطلوب)","required":true,"type":"radio","options":[{"id":"chk-1","name":"1 Chicken","name_ar":"دجاجة","price":0,"default":true},{"id":"chk-2","name":"2 Chickens","name_ar":"دجاجتين","price":7,"default":false},{"id":"meat-1kg","name":"1 KG Meat","name_ar":"1 ك لحم","price":7,"default":false},{"id":"meat-2kg","name":"2 KG Meat","name_ar":"2 ك لحم","price":20,"default":false}]}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","name_ar":"دقوس إضافي","price":0.5,"type":"add"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","name_ar":"لوز ومكسرات محمصة","price":0.5,"type":"add"}]'::jsonb,
    '[{"id":"rice","name":"Uzbek Basmati Rice","name_ar":"أرز بسمتي فاخر","desc":"Authentic pilaf rice","icon":"assets/images/ing_bun.png","removable":false},{"id":"protein","name":"Chicken or Meat Choice","name_ar":"خيار الدجاج أو اللحم","desc":"Choice of fresh chicken or tender meat","icon":"assets/images/ing_chicken.png","removable":false},{"id":"carrots","name":"Sweet Carrot Slices","name_ar":"شرحات الجزر","desc":"Sweet sliced carrots","icon":"assets/images/ing_tomato.png","removable":false},{"id":"raisins-onions","name":"Raisins & Sliced Onions","name_ar":"زبيب وشرحات بصل","desc":"Golden raisins and caramelized onions","icon":"assets/images/ing_lettuce.png","removable":false},{"id":"spices","name":"Gluten-Free Uzbek Spices","name_ar":"بهارات أوزبكية خاصة خالية من الغلوتين","desc":"Authentic Central Asian spices","icon":"assets/images/ing_sauce.png","removable":false}]'::jsonb,
    58
  ) ON CONFLICT (id) DO UPDATE SET
    category = EXCLUDED.category, name = EXCLUDED.name, name_ar = EXCLUDED.name_ar,
    description = EXCLUDED.description, description_ar = EXCLUDED.description_ar,
    "basePrice" = EXCLUDED."basePrice", image = EXCLUDED.image, available = EXCLUDED.available,
    "isPreOrder24h" = EXCLUDED."isPreOrder24h", "optionGroups" = EXCLUDED."optionGroups",
    modifiers = EXCLUDED.modifiers, ingredients = EXCLUDED.ingredients, "order" = EXCLUDED."order";

INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients, "order") VALUES (
    'dawood-basha',
    'main-dishes',
    'Dawood Basha',
    'داوود باشا',
    'Tender seasoned meatballs with aromatic herbs and olive oil simmered in rich black pepper tomato sauce, served with rice. Available with fresh chicken or meat.',
    'كرات كفتة شهية بالتتبيلة الخاصة والأعشاب العطرية وزيت الزيتون في صلصة الطماطم الغنية بالفلفل الأسود، يقدم مع الأرز. متوفر بخيار الدجاج أو اللحم الطازج.',
    5,
    'assets/images/about_dish.png',
    true,
    false,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","name_ar":"الخيار والكمية (مطلوب)","required":true,"type":"radio","options":[{"id":"chk-1","name":"1 Chicken","name_ar":"دجاجة","price":0,"default":true},{"id":"chk-2","name":"2 Chickens","name_ar":"دجاجتين","price":7,"default":false},{"id":"meat-1kg","name":"1 KG Meat","name_ar":"1 ك لحم","price":7,"default":false},{"id":"meat-2kg","name":"2 KG Meat","name_ar":"2 ك لحم","price":20,"default":false}]}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","name_ar":"دقوس إضافي","price":0.5,"type":"add"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","name_ar":"لوز ومكسرات محمصة","price":0.5,"type":"add"}]'::jsonb,
    '[{"id":"meatballs","name":"Special Seasoned Meatballs","name_ar":"كرات اللحم بالتتبيلة الخاصة","desc":"Handcrafted seasoned kofta meatballs","icon":"assets/images/ing_chicken.png","removable":false},{"id":"herbs-oil","name":"Aromatic Herbs & Olive Oil","name_ar":"أعشاب عطرية وزيت زيتون","desc":"Fresh fragrant herbs and extra virgin olive oil","icon":"assets/images/ing_lettuce.png","removable":false},{"id":"sauce","name":"Black Pepper Tomato Sauce","name_ar":"صلصة الطماطم الخاصة بالفلفل الأسود","desc":"Rich seasoned tomato sauce","icon":"assets/images/ing_sauce.png","removable":false},{"id":"rice","name":"Steamed Rice","name_ar":"أرز فاخر","desc":"Gluten-free steamed rice","icon":"assets/images/ing_bun.png","removable":false}]'::jsonb,
    59
  ) ON CONFLICT (id) DO UPDATE SET
    category = EXCLUDED.category, name = EXCLUDED.name, name_ar = EXCLUDED.name_ar,
    description = EXCLUDED.description, description_ar = EXCLUDED.description_ar,
    "basePrice" = EXCLUDED."basePrice", image = EXCLUDED.image, available = EXCLUDED.available,
    "isPreOrder24h" = EXCLUDED."isPreOrder24h", "optionGroups" = EXCLUDED."optionGroups",
    modifiers = EXCLUDED.modifiers, ingredients = EXCLUDED.ingredients, "order" = EXCLUDED."order";

INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients, "order") VALUES (
    'armenian-kofta',
    'main-dishes',
    'Armenian Kofta',
    'كفتة أرمنية بالبطاطا',
    'Oven-baked seasoned kofta with sliced tomatoes and special Armenian spices, served with rice. Available with fresh chicken or meat.',
    'كفتة مشوية بالفرن مع شرحات الطماطم والبهارات الأرمنية الغنية، تقدم مع الأرز. متوفر بخيار الدجاج أو اللحم الطازج.',
    5.75,
    'assets/images/about_dish.png',
    true,
    false,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","name_ar":"الخيار والكمية (مطلوب)","required":true,"type":"radio","options":[{"id":"chk-1","name":"1 Chicken","name_ar":"دجاجة","price":0,"default":true},{"id":"chk-2","name":"2 Chickens","name_ar":"دجاجتين","price":7,"default":false},{"id":"meat-1kg","name":"1 KG Meat","name_ar":"1 ك لحم","price":7,"default":false},{"id":"meat-2kg","name":"2 KG Meat","name_ar":"2 ك لحم","price":20,"default":false}]}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","name_ar":"دقوس إضافي","price":0.5,"type":"add"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","name_ar":"لوز ومكسرات محمصة","price":0.5,"type":"add"}]'::jsonb,
    '[{"id":"kofta","name":"Grilled Kofta","name_ar":"كفتة مشوية","desc":"Seasoned spiced kofta","icon":"assets/images/ing_chicken.png","removable":false},{"id":"tomatoes","name":"Tomato Slices","name_ar":"شرحات الطماطم","desc":"Fresh oven-roasted tomatoes","icon":"assets/images/ing_tomato.png","removable":false},{"id":"spices","name":"Gluten-Free Armenian Spices","name_ar":"بهارات أرمنية خالية من الغلوتين","desc":"Traditional herbs and seasonings","icon":"assets/images/ing_sauce.png","removable":false},{"id":"rice","name":"Steamed Rice","name_ar":"أرز فاخر","desc":"Gluten-free rice","icon":"assets/images/ing_bun.png","removable":false}]'::jsonb,
    60
  ) ON CONFLICT (id) DO UPDATE SET
    category = EXCLUDED.category, name = EXCLUDED.name, name_ar = EXCLUDED.name_ar,
    description = EXCLUDED.description, description_ar = EXCLUDED.description_ar,
    "basePrice" = EXCLUDED."basePrice", image = EXCLUDED.image, available = EXCLUDED.available,
    "isPreOrder24h" = EXCLUDED."isPreOrder24h", "optionGroups" = EXCLUDED."optionGroups",
    modifiers = EXCLUDED.modifiers, ingredients = EXCLUDED.ingredients, "order" = EXCLUDED."order";

INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients, "order") VALUES (
    'tahini-kofta',
    'main-dishes',
    'Tahini Kofta',
    'كفتة بالطحينية',
    'Oven-baked kofta with sliced potatoes and onions smothered in creamy lemon-tahini sauce, garlic, and pepper, served with basmati rice. Available with fresh chicken or meat.',
    'أصابع كفتة مشوية بالفرن مع شرحات البطاطا والبصل بصلصة الطحينية والليمون الغنية مع الثوم والفلفل، يقدم مع أرز بسمتي. متوفر بخيار الدجاج أو اللحم الطازج.',
    5.75,
    'assets/images/about_dish.png',
    true,
    false,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","name_ar":"الخيار والكمية (مطلوب)","required":true,"type":"radio","options":[{"id":"chk-1","name":"1 Chicken","name_ar":"دجاجة","price":0,"default":true},{"id":"chk-2","name":"2 Chickens","name_ar":"دجاجتين","price":7,"default":false},{"id":"meat-1kg","name":"1 KG Meat","name_ar":"1 ك لحم","price":7,"default":false},{"id":"meat-2kg","name":"2 KG Meat","name_ar":"2 ك لحم","price":20,"default":false}]}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","name_ar":"دقوس إضافي","price":0.5,"type":"add"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","name_ar":"لوز ومكسرات محمصة","price":0.5,"type":"add"}]'::jsonb,
    '[{"id":"kofta","name":"Baked Kofta Fingers","name_ar":"أصابع الكفتة مشوية بالفرن","desc":"Seasoned baked kofta","icon":"assets/images/ing_chicken.png","removable":false},{"id":"potato-onion","name":"Potatoes & Sliced Onions","name_ar":"شرحات البطاطا والبصل","desc":"Oven-baked potato and onion slices","icon":"assets/images/ing_bun.png","removable":false},{"id":"tahini","name":"Lemon Tahini Sauce, Garlic & Pepper","name_ar":"صوص الطحينية والليمون وثوم وفلفل","desc":"Creamy sesame lemon sauce with garlic and pepper","icon":"assets/images/ing_sauce.png","removable":false},{"id":"rice","name":"Basmati Rice","name_ar":"أرز بسمتي","desc":"Gluten-free basmati rice","icon":"assets/images/ing_bun.png","removable":false}]'::jsonb,
    61
  ) ON CONFLICT (id) DO UPDATE SET
    category = EXCLUDED.category, name = EXCLUDED.name, name_ar = EXCLUDED.name_ar,
    description = EXCLUDED.description, description_ar = EXCLUDED.description_ar,
    "basePrice" = EXCLUDED."basePrice", image = EXCLUDED.image, available = EXCLUDED.available,
    "isPreOrder24h" = EXCLUDED."isPreOrder24h", "optionGroups" = EXCLUDED."optionGroups",
    modifiers = EXCLUDED.modifiers, ingredients = EXCLUDED.ingredients, "order" = EXCLUDED."order";

INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients, "order") VALUES (
    'kebab-hindi',
    'main-dishes',
    'Indian Kebab',
    'كباب هندي',
    'Baked seasoned kebabs with olive oil and toasted nuts over roasted tomato sauce, served with basmati rice. Available with fresh chicken or meat.',
    'أصابع كباب مشوية بالفرن مع زيت الزيتون والمكسرات على أرضية من صوص الطماطم المشوية، يقدم مع الأرز البسمتي. متوفر بخيار الدجاج أو اللحم الطازج.',
    5.5,
    'assets/images/about_dish.png',
    true,
    false,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","name_ar":"الخيار والكمية (مطلوب)","required":true,"type":"radio","options":[{"id":"chk-1","name":"1 Chicken","name_ar":"دجاجة","price":0,"default":true},{"id":"chk-2","name":"2 Chickens","name_ar":"دجاجتين","price":7,"default":false},{"id":"meat-1kg","name":"1 KG Meat","name_ar":"1 ك لحم","price":7,"default":false},{"id":"meat-2kg","name":"2 KG Meat","name_ar":"2 ك لحم","price":20,"default":false}]}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","name_ar":"دقوس إضافي","price":0.5,"type":"add"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","name_ar":"لوز ومكسرات محمصة","price":0.5,"type":"add"}]'::jsonb,
    '[{"id":"kebab","name":"Baked Kebab Fingers","name_ar":"كباب مشوي بالفرن","desc":"Seasoned spiced kebab fingers","icon":"assets/images/ing_chicken.png","removable":false},{"id":"oil-nuts","name":"Olive Oil & Toasted Nuts","name_ar":"زيت زيتون ومكسرات","desc":"Extra virgin olive oil and crispy nuts","icon":"assets/images/ing_bun.png","removable":false},{"id":"sauce","name":"Roasted Tomato Sauce","name_ar":"أرضية من صوص الطماطم المشوية","desc":"Charred tomato and garlic sauce","icon":"assets/images/ing_tomato.png","removable":false},{"id":"rice","name":"Basmati Rice","name_ar":"أرز بسمتي","desc":"Gluten-free basmati rice","icon":"assets/images/ing_bun.png","removable":false}]'::jsonb,
    62
  ) ON CONFLICT (id) DO UPDATE SET
    category = EXCLUDED.category, name = EXCLUDED.name, name_ar = EXCLUDED.name_ar,
    description = EXCLUDED.description, description_ar = EXCLUDED.description_ar,
    "basePrice" = EXCLUDED."basePrice", image = EXCLUDED.image, available = EXCLUDED.available,
    "isPreOrder24h" = EXCLUDED."isPreOrder24h", "optionGroups" = EXCLUDED."optionGroups",
    modifiers = EXCLUDED.modifiers, ingredients = EXCLUDED.ingredients, "order" = EXCLUDED."order";

INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients, "order") VALUES (
    'sayadieh-fish',
    'main-dishes',
    'Fish Sayadieh',
    'صيادية سمك',
    'Authentic brown rice cooked with caramelized onions, tomatoes, dried lime, and rich seafood spices, served with crispy fried fish fillets. Available with 1 KG or 2 KG fish.',
    'أرز بني أصيل مطبوخ مع البصل المكرمل والطماطم واللومي والبهارات البحرية الغنية مع فيليه السمك المقلي المقرمش. متوفر بخيار 1 ك أو 2 ك سمك.',
    5.75,
    'assets/images/about_dish.png',
    true,
    false,
    false,
    true,
    '[{"id":"fish-portion","name":"Fish Quantity (Required)","name_ar":"كمية السمك (مطلوب)","required":true,"type":"radio","options":[{"id":"fish-1kg","name":"1 KG Fish","name_ar":"1 ك سمك","price":0,"default":true},{"id":"fish-2kg","name":"2 KG Fish","name_ar":"2 ك سمك","price":8,"default":false}]}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","name_ar":"دقوس إضافي","price":0.5,"type":"add"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","name_ar":"لوز ومكسرات محمصة","price":0.5,"type":"add"}]'::jsonb,
    '[{"id":"fish","name":"Fried Fish Fillet","name_ar":"فيليه سمك مقلي","desc":"Golden crispy seasoned fish fillets","icon":"assets/images/ing_chicken.png","removable":false},{"id":"rice","name":"Caramelized Onion Rice","name_ar":"أرز مطبوخ بالبصل المكرمل","desc":"Aromatic brown spiced rice","icon":"assets/images/ing_bun.png","removable":false},{"id":"aromatics","name":"Tomatoes & Dried Lime","name_ar":"طماطم ولومي","desc":"Savory stewed aromatics","icon":"assets/images/ing_tomato.png","removable":false},{"id":"spices","name":"Gluten-Free Seafood Spices","name_ar":"بهارات بحرية غنية خالية من الغلوتين","desc":"Special fish seasoning blend","icon":"assets/images/ing_sauce.png","removable":false}]'::jsonb,
    63
  ) ON CONFLICT (id) DO UPDATE SET
    category = EXCLUDED.category, name = EXCLUDED.name, name_ar = EXCLUDED.name_ar,
    description = EXCLUDED.description, description_ar = EXCLUDED.description_ar,
    "basePrice" = EXCLUDED."basePrice", image = EXCLUDED.image, available = EXCLUDED.available,
    "isPreOrder24h" = EXCLUDED."isPreOrder24h", "optionGroups" = EXCLUDED."optionGroups",
    modifiers = EXCLUDED.modifiers, ingredients = EXCLUDED.ingredients, "order" = EXCLUDED."order";

INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients) VALUES (
    'soft-drinks', 
    'drinks-extras', 
    'Soft Drinks (Kinza)', 
    NULL, 
    'Refreshing chilled soft drink can (Kinza Cola, Citrus, Orange, Diet).', 
    NULL, 
    0.5, 
    'assets/images/kinza.svg', 
    true, 
    false, 
    false, 
    NULL, 
    '[{"id":"flavor","name":"Choose Flavor","required":true,"type":"radio","options":[{"id":"kinza-cola","name":"Kinza Cola","price":0,"default":true},{"id":"kinza-citrus","name":"Kinza Citrus","price":0},{"id":"kinza-orange","name":"Kinza Orange","price":0},{"id":"kinza-diet","name":"Kinza Diet Cola","price":0}]}]'::jsonb, 
    '[]'::jsonb, 
    '[]'::jsonb
  );
INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients) VALUES (
    'mineral-water', 
    'drinks-extras', 
    'Mineral Water', 
    'ماء', 
    'Pure bottled mineral water (500ml).', 
    'مياه معدنية طبيعية (500 مل).', 
    0.5, 
    'assets/images/water.svg', 
    true, 
    false, 
    false, 
    NULL, 
    '[]'::jsonb, 
    '[]'::jsonb, 
    '[]'::jsonb
  );

-- Settings
INSERT INTO public.settings (id, "restaurantName", "whatsappNumber", currency, "logoPath", tagline) VALUES ('global', 'Moe''s PureBite', '962792512221', 'JOD', 'assets/images/logo_new.jpg', 'PURE FOOD. PURE LIFE.');

-- Home Content
INSERT INTO public.home_content (id, "heroBadge", "heroTitle", "heroDescription", "heroCtaText", "heroSecondaryCta") VALUES ('global', '100% GLUTEN-FREE', 'GLUTEN-FREE', 'All our food is gluten-free and loved by families.', 'Explore Menu', 'Order via WhatsApp');

-- About Content
INSERT INTO public.about_content (id, title, title_ar, story, story_ar, image, features) VALUES ('global', NULL, NULL, NULL, NULL, NULL, NULL);

