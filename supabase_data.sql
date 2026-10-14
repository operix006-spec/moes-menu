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
INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients) VALUES (
    'zinger-burger', 
    'burgers-sandwiches', 
    'Zinger Burger', 
    'زنجر برجر', 
    'Crispy fried chicken fillet with lettuce, cheese, tomato, and special sauce in a toasted gluten-free bun.', 
    'فيليه دجاج مقرمش مع الخس والجبنة والبندورة والصوص الخاص في خبز خالٍ من الغلوتين محمص.', 
    3.25, 
    'assets/images/zinger_burger.png', 
    true, 
    true, 
    true, 
    NULL, 
    '[{"id":"meal-type","name":"Make it a Meal","name_ar":"اجعلها وجبة","required":true,"type":"radio","options":[{"id":"sandwich-only","name":"Sandwich Only","name_ar":"ساندويش فقط","price":0,"default":true},{"id":"full-meal","name":"Full Meal (+ Fries & Kinza Drink)","name_ar":"وجبة كاملة (+ بطاطا وكنزا)","price":1.5}]}]'::jsonb, 
    '[{"id":"extra-cheese","name":"Extra Cheese","name_ar":"جبنة إضافية","price":0.4,"type":"add"},{"id":"extra-sauce","name":"Extra Special Sauce","name_ar":"صوص خاص إضافي","price":0.3,"type":"add"},{"id":"extra-chicken","name":"Extra Chicken Fillet","name_ar":"فيليه دجاج إضافي","price":1.5,"type":"add"}]'::jsonb, 
    '[{"id":"gf-bun","name":"Gluten-Free Bun","desc":"Soft, golden gluten-free sesame bun","icon":"assets/images/ing_bun.png","removable":false},{"id":"chicken-fillet","name":"Crispy Chicken Fillet","desc":"Golden fried crispy chicken fillet","icon":"assets/images/ing_chicken.png","removable":false},{"id":"lettuce","name":"Lettuce","desc":"Fresh green crisp lettuce","icon":"assets/images/ing_lettuce.png","removable":true},{"id":"cheese","name":"Cheese","desc":"Melted dairy cheese slice","icon":"assets/images/ing_cheese.png","removable":true},{"id":"tomato","name":"Tomato","desc":"Fresh sliced ripe tomato","icon":"assets/images/ing_tomato.png","removable":true},{"id":"special-sauce","name":"Special Sauce","desc":"Our signature house sauce","icon":"assets/images/ing_sauce.png","removable":true}]'::jsonb
  );
INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients) VALUES (
    'zinger-wrap', 
    'burgers-sandwiches', 
    'Zinger Wrap', 
    'زنجر راب', 
    'Crispy fried chicken fillet with lettuce, mayo, and cheese wrapped in toasted gluten-free bread.', 
    'فيليه دجاج مقرمش مع الخس والمايونيز والجبنة ملفوف في خبز تورتيلا خالٍ من الغلوتين.', 
    3.5, 
    'assets/images/zinger_wrap.png', 
    true, 
    false, 
    true, 
    NULL, 
    '[{"id":"flavor","name":"Flavor Preference","name_ar":"النكهة","required":true,"type":"radio","options":[{"id":"regular","name":"Regular","name_ar":"عادي","price":0,"default":true},{"id":"spicy","name":"Spicy","name_ar":"حار","price":0}]},{"id":"meal-type","name":"Meal Option","name_ar":"نوع الطلب","required":true,"type":"radio","options":[{"id":"wrap-only","name":"Wrap Only","name_ar":"راب فقط","price":0,"default":true},{"id":"meal","name":"Make it a Meal (+ Fries & Kinza)","name_ar":"وجبة (+ بطاطا وكنزا)","price":1.5}]}]'::jsonb, 
    '[{"id":"extra-cheese","name":"Extra Cheese","name_ar":"جبنة إضافية","price":0.4,"type":"add"},{"id":"extra-sauce","name":"Extra Sauce","name_ar":"صوص إضافي","price":0.3,"type":"add"}]'::jsonb, 
    '[{"id":"wrap-bread","name":"Gluten-Free Wrap","desc":"Toasted GF tortilla bread","icon":"assets/images/ing_bun.png","removable":false},{"id":"zinger-fillet","name":"Crispy Chicken Zinger","desc":"Crispy chicken fillet","icon":"assets/images/ing_chicken.png","removable":false},{"id":"cheese","name":"Cheese","desc":"Melted cheese blend","icon":"assets/images/ing_cheese.png","removable":true},{"id":"lettuce","name":"Lettuce","desc":"Fresh green lettuce","icon":"assets/images/ing_lettuce.png","removable":true},{"id":"special-sauce","name":"Special Sauce","desc":"Signature sauce & mayo","icon":"assets/images/ing_sauce.png","removable":true}]'::jsonb
  );
INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients) VALUES (
    'zinger-sandwich', 
    'burgers-sandwiches', 
    'Zinger Sandwich', 
    'زنجر ساندويش', 
    'Crispy fried chicken fillet with lettuce, cheese, and special sauce in toasted gluten-free bread.', 
    'فيليه دجاج مقرمش مع الخس والجبنة والصوص الخاص في توست خالٍ من الغلوتين.', 
    3.5, 
    'assets/images/zinger_sandwich.png', 
    true, 
    false, 
    false, 
    NULL, 
    '[{"id":"flavor","name":"Flavor Preference","name_ar":"النكهة","required":true,"type":"radio","options":[{"id":"regular","name":"Regular","name_ar":"عادي","price":0,"default":true},{"id":"spicy","name":"Spicy","name_ar":"حار","price":0}]},{"id":"meal-type","name":"Meal Option","name_ar":"نوع الطلب","required":true,"type":"radio","options":[{"id":"sandwich-only","name":"Sandwich Only","name_ar":"ساندويش فقط","price":0,"default":true},{"id":"meal","name":"Make it a Meal (+ Fries & Kinza)","name_ar":"وجبة (+ بطاطا وكنزا)","price":1.5}]}]'::jsonb, 
    '[{"id":"extra-cheese","name":"Extra Cheese","name_ar":"جبنة إضافية","price":0.4,"type":"add"},{"id":"extra-sauce","name":"Extra Sauce","name_ar":"صوص إضافي","price":0.3,"type":"add"}]'::jsonb, 
    '[{"id":"gf-bread","name":"Gluten-Free Toast Bread","desc":"Toasted sliced GF bread","icon":"assets/images/ing_bun.png","removable":false},{"id":"zinger","name":"Crispy Chicken Zinger","desc":"Crispy chicken fillet","icon":"assets/images/ing_chicken.png","removable":false},{"id":"cheese","name":"Cheese","desc":"Melted dairy cheese","icon":"assets/images/ing_cheese.png","removable":true},{"id":"lettuce","name":"Lettuce","desc":"Fresh lettuce","icon":"assets/images/ing_lettuce.png","removable":true},{"id":"special-sauce","name":"Special Sauce","desc":"House sauce","icon":"assets/images/ing_sauce.png","removable":true}]'::jsonb
  );
INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients) VALUES (
    'chicken-quesadilla', 
    'burgers-sandwiches', 
    'Chicken Quesadilla', 
    NULL, 
    'Grilled chicken with melted cheese folded inside a golden grilled gluten-free tortilla.', 
    NULL, 
    5, 
    'assets/images/chicken_quesadilla.png', 
    true, 
    false, 
    false, 
    NULL, 
    '[{"id":"meal-type","name":"Meal Option","name_ar":"نوع الطلب","required":true,"type":"radio","options":[{"id":"quesadilla-only","name":"Quesadilla Only","price":0,"default":true},{"id":"meal","name":"Make it a Meal (+ Fries & Kinza)","name_ar":"وجبة (+ بطاطا وكنزا)","price":1.5}]}]'::jsonb, 
    '[{"id":"extra-cheese","name":"Extra Cheese","name_ar":"جبنة إضافية","price":0.5,"type":"add"}]'::jsonb, 
    '[{"id":"gf-tortilla","name":"Gluten-Free Tortilla","desc":"Grilled GF tortilla","icon":"assets/images/ing_bun.png","removable":false},{"id":"chicken","name":"Grilled Chicken","desc":"Tender seasoned chicken","icon":"assets/images/ing_chicken.png","removable":false},{"id":"cheese","name":"Melted Cheese","desc":"Rich mozzarella and cheddar blend","icon":"assets/images/ing_cheese.png","removable":true}]'::jsonb
  );
INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients) VALUES (
    'zinger-box', 
    'chicken-boxes', 
    'Zinger Box', 
    'زنجر بوكس', 
    'Includes crispy zinger pieces, gluten-free fries, dipping sauce, and Kinza soda.', 
    'قطع فيليه دجاج مقرمشة مع بطاطا وصوص الجبنة ومثومة.', 
    4.5, 
    'assets/images/zinger_box.png', 
    true, 
    false, 
    true, 
    NULL, 
    '[{"id":"flavor","name":"Flavor Preference","name_ar":"النكهة","required":true,"type":"radio","options":[{"id":"regular","name":"Regular","name_ar":"عادي","price":0,"default":true},{"id":"spicy","name":"Spicy","name_ar":"حار","price":0}]}]'::jsonb, 
    '[{"id":"extra-sauce","name":"Extra Dipping Sauce","price":0.3,"type":"add"}]'::jsonb, 
    '[{"id":"zinger-pcs","name":"Zinger Pieces","desc":"Crispy fried chicken tenders","icon":"assets/images/ing_chicken.png","removable":false},{"id":"gf-fries","name":"Gluten-Free Fries","desc":"Golden fried potatoes","icon":"assets/images/ing_bun.png","removable":false},{"id":"dip-sauce","name":"Dipping Sauce","desc":"Signature sauce cup","icon":"assets/images/ing_sauce.png","removable":true},{"id":"kinza","name":"Kinza Soda","desc":"Chilled canned soda","icon":"assets/images/ing_bun.png","removable":false}]'::jsonb
  );
INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients) VALUES (
    'caesar-salad', 
    'salads', 
    'Caesar Salad', 
    'سلطة سيزر', 
    'Crisp lettuce tossed with tender grilled chicken, shaved parmesan cheese, and creamy gluten-free Caesar dressing.', 
    'خس مقرمش مع دجاج مشوي وجبنة بارميزان وصوص سيزر الخالي من الغلوتين.', 
    2.75, 
    'assets/images/caesar_salad.png', 
    true, 
    false, 
    true, 
    NULL, 
    '[]'::jsonb, 
    '[{"id":"extra-chicken","name":"Extra Grilled Chicken","price":1,"type":"add"},{"id":"extra-dressing","name":"Extra Caesar Dressing","price":0.3,"type":"add"}]'::jsonb, 
    '[{"id":"lettuce","name":"Lettuce","desc":"Crisp romaine","icon":"assets/images/ing_lettuce.png","removable":false},{"id":"grilled-chicken","name":"Grilled Chicken","desc":"Sliced grilled chicken breast","icon":"assets/images/ing_chicken.png","removable":true},{"id":"parmesan","name":"Parmesan Cheese","desc":"Aged parmesan shavings","icon":"assets/images/ing_cheese.png","removable":true},{"id":"caesar-dressing","name":"Caesar Dressing","desc":"Gluten-free dressing","icon":"assets/images/ing_sauce.png","removable":true}]'::jsonb
  );
INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients) VALUES (
    'greek-salad', 
    'salads', 
    'Greek Salad', 
    'سلطة يونانية', 
    'Fresh cucumber, tomato, feta cheese, kalamata olives, red onion, and house herb vinaigrette.', 
    'خس، خيار، بندورة، زيتون أسود، وجبنة فيتا مع صوص الليمون والزيت.', 
    2.75, 
    'assets/images/greek_salad.svg', 
    true, 
    false, 
    false, 
    NULL, 
    '[]'::jsonb, 
    '[{"id":"extra-feta","name":"Extra Feta Cheese","price":0.5,"type":"add"}]'::jsonb, 
    '[{"id":"cucumber","name":"Cucumber","desc":"Fresh sliced cucumber","icon":"assets/images/ing_lettuce.png","removable":true},{"id":"tomato","name":"Tomato","desc":"Ripe diced tomato","icon":"assets/images/ing_tomato.png","removable":true},{"id":"feta","name":"Feta Cheese","desc":"Authentic creamy feta cubes","icon":"assets/images/ing_cheese.png","removable":true},{"id":"olives","name":"Olives","desc":"Kalamata black olives","icon":"assets/images/ing_sauce.png","removable":true},{"id":"red-onion","name":"Red Onion","desc":"Crisp sliced red onion","icon":"assets/images/ing_lettuce.png","removable":true},{"id":"special-dressing","name":"Special Dressing","desc":"Herb olive oil vinaigrette","icon":"assets/images/ing_sauce.png","removable":true}]'::jsonb
  );
INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients) VALUES (
    'broasted-4', 
    'broasted', 
    'Broasted 4 Pieces', 
    NULL, 
    '4 crispy gluten-free chicken pieces, fries for 1 person, and Kinza soda.', 
    NULL, 
    5.5, 
    'assets/images/broasted.svg', 
    true, 
    false, 
    false, 
    NULL, 
    '[{"id":"flavor","name":"Flavor Preference","name_ar":"النكهة","required":true,"type":"radio","options":[{"id":"regular","name":"Regular","name_ar":"عادي","price":0,"default":true},{"id":"spicy","name":"Spicy","name_ar":"حار","price":0}]}]'::jsonb, 
    '[{"id":"extra-garlic-sauce","name":"Garlic Dip Sauce","price":0.3,"type":"add"}]'::jsonb, 
    '[{"id":"chk-4","name":"4 Chicken Pieces","desc":"Fresh fried crispy pieces","icon":"assets/images/ing_chicken.png","removable":false},{"id":"fries-1","name":"Fries (1 Person)","desc":"Gluten-free golden fries","icon":"assets/images/ing_bun.png","removable":false},{"id":"kinza-1","name":"Kinza Soda","desc":"1 Kinza can","icon":"assets/images/ing_bun.png","removable":false}]'::jsonb
  );
INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients) VALUES (
    'broasted-8', 
    'broasted', 
    'Broasted 8 Pieces', 
    NULL, 
    '8 crispy gluten-free chicken pieces, fries for 2 people, and 2 Kinza sodas.', 
    NULL, 
    10, 
    'assets/images/broasted.svg', 
    true, 
    false, 
    false, 
    NULL, 
    '[{"id":"flavor","name":"Flavor Preference","name_ar":"النكهة","required":true,"type":"radio","options":[{"id":"regular","name":"Regular","name_ar":"عادي","price":0,"default":true},{"id":"spicy","name":"Spicy","name_ar":"حار","price":0}]}]'::jsonb, 
    '[{"id":"extra-garlic-sauce","name":"Garlic Dip Sauce","price":0.3,"type":"add"}]'::jsonb, 
    '[{"id":"chk-8","name":"8 Chicken Pieces","desc":"Fresh fried crispy pieces","icon":"assets/images/ing_chicken.png","removable":false},{"id":"fries-2","name":"Fries (2 People)","desc":"Gluten-free golden fries","icon":"assets/images/ing_bun.png","removable":false},{"id":"kinza-2","name":"2 Kinza Sodas","desc":"2 Kinza cans","icon":"assets/images/ing_bun.png","removable":false}]'::jsonb
  );
INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients) VALUES (
    'broasted-16', 
    'broasted', 
    'Broasted 16 Pieces', 
    NULL, 
    '16 crispy gluten-free chicken pieces, large fries portion, and 1 Liter Kinza bottle.', 
    NULL, 
    13.5, 
    'assets/images/broasted.svg', 
    true, 
    false, 
    false, 
    NULL, 
    '[{"id":"flavor","name":"Flavor Preference","name_ar":"النكهة","required":true,"type":"radio","options":[{"id":"regular","name":"Regular","name_ar":"عادي","price":0,"default":true},{"id":"spicy","name":"Spicy","name_ar":"حار","price":0}]}]'::jsonb, 
    '[{"id":"extra-garlic-sauce","name":"Garlic Dip Sauce","price":0.3,"type":"add"}]'::jsonb, 
    '[{"id":"chk-16","name":"16 Chicken Pieces","desc":"Fresh fried crispy pieces","icon":"assets/images/ing_chicken.png","removable":false},{"id":"fries-lg","name":"Large Fries","desc":"Family-sized GF fries","icon":"assets/images/ing_bun.png","removable":false},{"id":"kinza-1l","name":"1 Liter Kinza","desc":"Chilled 1L bottle","icon":"assets/images/ing_bun.png","removable":false}]'::jsonb
  );
INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients) VALUES (
    'broasted-20', 
    'broasted', 
    'Broasted 20 Pieces', 
    NULL, 
    '20 crispy gluten-free chicken pieces, extra large fries portion, and 2 Liters Kinza.', 
    NULL, 
    19, 
    'assets/images/broasted.svg', 
    true, 
    false, 
    false, 
    NULL, 
    '[{"id":"flavor","name":"Flavor Preference","name_ar":"النكهة","required":true,"type":"radio","options":[{"id":"regular","name":"Regular","name_ar":"عادي","price":0,"default":true},{"id":"spicy","name":"Spicy","name_ar":"حار","price":0}]}]'::jsonb, 
    '[{"id":"extra-garlic-sauce","name":"Garlic Dip Sauce","price":0.3,"type":"add"}]'::jsonb, 
    '[{"id":"chk-20","name":"20 Chicken Pieces","desc":"Fresh fried crispy pieces","icon":"assets/images/ing_chicken.png","removable":false},{"id":"fries-xlg","name":"Extra Large Fries","desc":"Party-sized GF fries","icon":"assets/images/ing_bun.png","removable":false},{"id":"kinza-2l","name":"2 Liters Kinza","desc":"Chilled 2L bottle","icon":"assets/images/ing_bun.png","removable":false}]'::jsonb
  );
-- ==========================================
-- Tawasi Dishes (24h Pre-Order) Migration
-- ==========================================

INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients, "order") VALUES (
    'kabsa',
    'main-dishes',
    'Kabsa',
    'كبسة',
    'Authentic spiced basmati rice with aromatic Kabsa spices, served with fresh Daqoos.',
    'كبسة أصيلة مع أرز بسمتي مبهر وتتبيلة الكبسة الغنية بالنكهات، تقدم مع صلصة الدقوس الطازجة.',
    8,
    'assets/images/kabsa.jpg',
    true,
    true,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","type":"radio","name_ar":"الخيار والكمية (مطلوب)","options":[{"id":"chk-1","name":"1 Chicken","price":0,"default":true,"name_ar":"دجاجة"},{"id":"chk-2","name":"2 Chickens","price":7,"default":false,"name_ar":"دجاجتين"},{"id":"meat-1kg","name":"1 KG Meat","price":7,"default":false,"name_ar":"1 ك لحم"},{"id":"meat-2kg","name":"2 KG Meat","price":20,"default":false,"name_ar":"2 ك لحم"}],"required":true}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","type":"add","price":0.5,"name_ar":"دقوس إضافي"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","type":"add","price":0.5,"name_ar":"لوز ومكسرات محمصة"}]'::jsonb,
    '[{"id":"rice","desc":"Savory basmati rice","icon":"assets/images/ing_bun.png","name":"Kabsa Spiced Rice","name_ar":"أرز كبسة مبهر","removable":false},{"id":"protein","desc":"Choice of protein","icon":"assets/images/ing_chicken.png","name":"Fresh Chicken or Tender Meat","name_ar":"دجاج طازج أو لحم طري","removable":false},{"id":"daqoos","desc":"Fresh tomato daqoos","icon":"assets/images/ing_sauce.png","name":"Daqoos Sauce","name_ar":"صلصة الدقوس","removable":true}]'::jsonb,
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
    'Traditional fragrant Biryani rice cooked with saffron, rich spices, and fresh herbs.',
    'أرز برياني مبهر غني بنكهات الزعفران والتوابل العطرية الأصيلة والمكسرات.',
    8,
    'assets/images/kabsa.jpg',
    true,
    false,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","type":"radio","name_ar":"الخيار والكمية (مطلوب)","options":[{"id":"chk-1","name":"1 Chicken","price":0,"default":true,"name_ar":"دجاجة"},{"id":"chk-2","name":"2 Chickens","price":7,"default":false,"name_ar":"دجاجتين"},{"id":"meat-1kg","name":"1 KG Meat","price":7,"default":false,"name_ar":"1 ك لحم"},{"id":"meat-2kg","name":"2 KG Meat","price":20,"default":false,"name_ar":"2 ك لحم"}],"required":true}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","type":"add","price":0.5,"name_ar":"دقوس إضافي"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","type":"add","price":0.5,"name_ar":"لوز ومكسرات محمصة"}]'::jsonb,
    '[{"id":"rice","desc":"Saffron basmati rice","icon":"assets/images/ing_bun.png","name":"Fragrant Biryani Rice","name_ar":"أرز برياني معطر","removable":false},{"id":"protein","desc":"Choice of protein","icon":"assets/images/ing_chicken.png","name":"Fresh Chicken or Tender Meat","name_ar":"دجاج طازج أو لحم طري","removable":false}]'::jsonb,
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
    'Authentic slow-cooked underground Zarb with smoked spiced basmati rice.',
    'زرب بلدي مدخن على الأصول مع الأرز المبهر بالنكهة الغنية والشهية.',
    8,
    'assets/images/mandi.jpg',
    true,
    false,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","type":"radio","name_ar":"الخيار والكمية (مطلوب)","options":[{"id":"chk-1","name":"1 Chicken","price":0,"default":true,"name_ar":"دجاجة"},{"id":"chk-2","name":"2 Chickens","price":7,"default":false,"name_ar":"دجاجتين"},{"id":"meat-1kg","name":"1 KG Meat","price":7,"default":false,"name_ar":"1 ك لحم"},{"id":"meat-2kg","name":"2 KG Meat","price":20,"default":false,"name_ar":"2 ك لحم"}],"required":true}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","type":"add","price":0.5,"name_ar":"دقوس إضافي"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","type":"add","price":0.5,"name_ar":"لوز ومكسرات محمصة"}]'::jsonb,
    '[{"id":"rice","desc":"Slow cooked aromatic rice","icon":"assets/images/ing_bun.png","name":"Smoked Zarb Rice","name_ar":"أرز زرب مدخن","removable":false},{"id":"protein","desc":"Choice of protein","icon":"assets/images/ing_chicken.png","name":"Fresh Chicken or Tender Meat","name_ar":"دجاج طازج أو لحم طري","removable":false}]'::jsonb,
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
    'Traditional Yemeni smoked Mandi rice cooked with secret spices and fresh Daqoos.',
    'مندي تقليدي مع أرز بسمتي مدخن وتوابل المندي الخاصة وصلصة الدقوس.',
    8,
    'assets/images/mandi.jpg',
    true,
    true,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","type":"radio","name_ar":"الخيار والكمية (مطلوب)","options":[{"id":"chk-1","name":"1 Chicken","price":0,"default":true,"name_ar":"دجاجة"},{"id":"chk-2","name":"2 Chickens","price":7,"default":false,"name_ar":"دجاجتين"},{"id":"meat-1kg","name":"1 KG Meat","price":7,"default":false,"name_ar":"1 ك لحم"},{"id":"meat-2kg","name":"2 KG Meat","price":20,"default":false,"name_ar":"2 ك لحم"}],"required":true}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","type":"add","price":0.5,"name_ar":"دقوس إضافي"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","type":"add","price":0.5,"name_ar":"لوز ومكسرات محمصة"}]'::jsonb,
    '[{"id":"rice","desc":"Spiced basmati rice","icon":"assets/images/ing_bun.png","name":"Fragrant Mandi Rice","name_ar":"أرز مندي مبهر","removable":false},{"id":"protein","desc":"Choice of protein","icon":"assets/images/ing_chicken.png","name":"Fresh Chicken or Tender Meat","name_ar":"دجاج طازج أو لحم طري","removable":false},{"id":"daqoos","desc":"Fresh tomato chili sauce","icon":"assets/images/ing_sauce.png","name":"Daqoos Sauce","name_ar":"صلصة الدقوس","removable":true}]'::jsonb,
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
    'Rich oriental spiced rice with sweet peas, carrots, warm spices, and roasted nuts.',
    'أرز أوزي شرقي فاخر بالبازيلاء والجزر والتوابل الخاصة والمكسرات المحمصة.',
    8,
    'assets/images/uzbekian.jpg',
    true,
    false,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","type":"radio","name_ar":"الخيار والكمية (مطلوب)","options":[{"id":"chk-1","name":"1 Chicken","price":0,"default":true,"name_ar":"دجاجة"},{"id":"chk-2","name":"2 Chickens","price":7,"default":false,"name_ar":"دجاجتين"},{"id":"meat-1kg","name":"1 KG Meat","price":7,"default":false,"name_ar":"1 ك لحم"},{"id":"meat-2kg","name":"2 KG Meat","price":20,"default":false,"name_ar":"2 ك لحم"}],"required":true}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","type":"add","price":0.5,"name_ar":"دقوس إضافي"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","type":"add","price":0.5,"name_ar":"لوز ومكسرات محمصة"}]'::jsonb,
    '[{"id":"rice","desc":"Basmati rice with peas and carrots","icon":"assets/images/ing_bun.png","name":"Ouzi Spiced Rice with Veggies","name_ar":"أرز أوزي بالخضار والبهارات","removable":false},{"id":"protein","desc":"Choice of protein","icon":"assets/images/ing_chicken.png","name":"Fresh Chicken or Tender Meat","name_ar":"دجاج طازج أو لحم طري","removable":false}]'::jsonb,
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
    'Aromatic Zurbian rice slow-cooked with spiced golden potatoes and caramelized onions.',
    'أرز زربيان عدني مطبوخ مع قطع البطاطا الذهبية والبصل المكرمل والتوابل الغنية.',
    8,
    'assets/images/zurbian.jpg',
    true,
    false,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","type":"radio","name_ar":"الخيار والكمية (مطلوب)","options":[{"id":"chk-1","name":"1 Chicken","price":0,"default":true,"name_ar":"دجاجة"},{"id":"chk-2","name":"2 Chickens","price":7,"default":false,"name_ar":"دجاجتين"},{"id":"meat-1kg","name":"1 KG Meat","price":7,"default":false,"name_ar":"1 ك لحم"},{"id":"meat-2kg","name":"2 KG Meat","price":20,"default":false,"name_ar":"2 ك لحم"}],"required":true}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","type":"add","price":0.5,"name_ar":"دقوس إضافي"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","type":"add","price":0.5,"name_ar":"لوز ومكسرات محمصة"}]'::jsonb,
    '[{"id":"rice","desc":"Rich fragrant rice","icon":"assets/images/ing_bun.png","name":"Spiced Zurbian Rice","name_ar":"أرز زربيان مبهر","removable":false},{"id":"potato","desc":"Spiced potatoes","icon":"assets/images/ing_bun.png","name":"Golden Potatoes","name_ar":"قطع بطاطا ذهبية","removable":true},{"id":"protein","desc":"Choice of protein","icon":"assets/images/ing_chicken.png","name":"Fresh Chicken or Tender Meat","name_ar":"دجاج طازج أو لحم طري","removable":false}]'::jsonb,
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
    'Authentic Hebron Qidreh cooked with ghee, chickpeas, whole garlic cloves, and traditional spices.',
    'قدرة خليلية على الأصول بالسمن البلدي وحب الحمص وفصوص الثوم والبهارات التراثية.',
    8,
    'assets/images/mandi.jpg',
    true,
    false,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","type":"radio","name_ar":"الخيار والكمية (مطلوب)","options":[{"id":"chk-1","name":"1 Chicken","price":0,"default":true,"name_ar":"دجاجة"},{"id":"chk-2","name":"2 Chickens","price":7,"default":false,"name_ar":"دجاجتين"},{"id":"meat-1kg","name":"1 KG Meat","price":7,"default":false,"name_ar":"1 ك لحم"},{"id":"meat-2kg","name":"2 KG Meat","price":20,"default":false,"name_ar":"2 ك لحم"}],"required":true}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","type":"add","price":0.5,"name_ar":"دقوس إضافي"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","type":"add","price":0.5,"name_ar":"لوز ومكسرات محمصة"}]'::jsonb,
    '[{"id":"rice","desc":"Traditional spiced rice with ghee","icon":"assets/images/ing_bun.png","name":"Qidreh Rice with Chickpeas & Garlic","name_ar":"أرز قدرة بالحمص والثوم","removable":false},{"id":"protein","desc":"Choice of protein","icon":"assets/images/ing_chicken.png","name":"Fresh Chicken or Tender Meat","name_ar":"دجاج طازج أو لحم طري","removable":false}]'::jsonb,
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
    'Savory pressure-cooked chicken and rice in rich spiced tomato sauce.',
    'مضغوط دجاج شهي محضر بالضغط مع الأرز وصلصة الطماطم الغنية والبهارات الخاصة.',
    8,
    'assets/images/mandi.jpg',
    true,
    false,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","type":"radio","name_ar":"الخيار والكمية (مطلوب)","options":[{"id":"chk-1","name":"1 Chicken","price":0,"default":true,"name_ar":"دجاجة"},{"id":"chk-2","name":"2 Chickens","price":7,"default":false,"name_ar":"دجاجتين"},{"id":"meat-1kg","name":"1 KG Meat","price":7,"default":false,"name_ar":"1 ك لحم"},{"id":"meat-2kg","name":"2 KG Meat","price":20,"default":false,"name_ar":"2 ك لحم"}],"required":true}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","type":"add","price":0.5,"name_ar":"دقوس إضافي"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","type":"add","price":0.5,"name_ar":"لوز ومكسرات محمصة"}]'::jsonb,
    '[{"id":"rice","desc":"Tomato and chili spiced rice","icon":"assets/images/ing_bun.png","name":"Madghout Spiced Rice","name_ar":"أرز مضغوط مبهر","removable":false},{"id":"protein","desc":"Choice of protein","icon":"assets/images/ing_chicken.png","name":"Fresh Chicken or Tender Meat","name_ar":"دجاج طازج أو لحم طري","removable":false}]'::jsonb,
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
    'Authentic Uzbek pilaf rice with sweet carrots, plump raisins, chickpeas, and aromatics.',
    'أرز أوزبكي (أوزباكيان) أصيل مطبوخ مع الجزر الحلو وحبات الحمص والزبيب والبهارات الخاصة.',
    8,
    'assets/images/uzbekian.jpg',
    true,
    false,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","type":"radio","name_ar":"الخيار والكمية (مطلوب)","options":[{"id":"chk-1","name":"1 Chicken","price":0,"default":true,"name_ar":"دجاجة"},{"id":"chk-2","name":"2 Chickens","price":7,"default":false,"name_ar":"دجاجتين"},{"id":"meat-1kg","name":"1 KG Meat","price":7,"default":false,"name_ar":"1 ك لحم"},{"id":"meat-2kg","name":"2 KG Meat","price":20,"default":false,"name_ar":"2 ك لحم"}],"required":true}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","type":"add","price":0.5,"name_ar":"دقوس إضافي"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","type":"add","price":0.5,"name_ar":"لوز ومكسرات محمصة"}]'::jsonb,
    '[{"id":"rice","desc":"Pilaf with carrots and raisins","icon":"assets/images/ing_bun.png","name":"Uzbek Spiced Pilaf Rice","name_ar":"أرز أوزبكي مبهر","removable":false},{"id":"carrots","desc":"Caramelized carrots","icon":"assets/images/ing_tomato.png","name":"Sweet Carrots","name_ar":"جزر مبشور حلو","removable":true},{"id":"raisins","desc":"Golden raisins and garbanzo","icon":"assets/images/ing_bun.png","name":"Raisins & Chickpeas","name_ar":"زبيب وحمص","removable":true},{"id":"protein","desc":"Choice of protein","icon":"assets/images/ing_chicken.png","name":"Fresh Chicken or Tender Meat","name_ar":"دجاج طازج أو لحم طري","removable":false}]'::jsonb,
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
    'Tender meatballs in rich garlic tomato stew, served with gluten-free vermicelli rice.',
    'كرات كفتة داوود باشا مطبوخة في صلصة الطماطم والثوم الغنية، تقدم مع الأرز بالشعيرية.',
    8,
    'assets/images/about_dish.png',
    true,
    false,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","type":"radio","name_ar":"الخيار والكمية (مطلوب)","options":[{"id":"chk-1","name":"1 Chicken","price":0,"default":true,"name_ar":"دجاجة"},{"id":"chk-2","name":"2 Chickens","price":7,"default":false,"name_ar":"دجاجتين"},{"id":"meat-1kg","name":"1 KG Meat","price":7,"default":false,"name_ar":"1 ك لحم"},{"id":"meat-2kg","name":"2 KG Meat","price":20,"default":false,"name_ar":"2 ك لحم"}],"required":true}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","type":"add","price":0.5,"name_ar":"دقوس إضافي"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","type":"add","price":0.5,"name_ar":"لوز ومكسرات محمصة"}]'::jsonb,
    '[{"id":"meatballs","desc":"Seasoned minced meatballs","icon":"assets/images/ing_chicken.png","name":"Kofta Meatballs","name_ar":"كرات كفتة شهية","removable":false},{"id":"sauce","desc":"Warm savory stew","icon":"assets/images/ing_sauce.png","name":"Rich Garlic Tomato Stew","name_ar":"صلصة طماطم وثوم غنية","removable":false},{"id":"rice","desc":"Steamed rice with GF vermicelli","icon":"assets/images/ing_bun.png","name":"Gluten-Free Vermicelli Rice","name_ar":"أرز بالشعيرية خالي من الغلوتين","removable":false}]'::jsonb,
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
    'كفتة أرمنية',
    'Oven-baked spiced kofta tray with tomato-pomegranate sauce and grilled vegetables.',
    'صينية كفتة أرمنية بالفرن متبلة مع صلصة الطماطم ودبس الرمان والخضار المشوية.',
    8,
    'assets/images/about_dish.png',
    true,
    false,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","type":"radio","name_ar":"الخيار والكمية (مطلوب)","options":[{"id":"chk-1","name":"1 Chicken","price":0,"default":true,"name_ar":"دجاجة"},{"id":"chk-2","name":"2 Chickens","price":7,"default":false,"name_ar":"دجاجتين"},{"id":"meat-1kg","name":"1 KG Meat","price":7,"default":false,"name_ar":"1 ك لحم"},{"id":"meat-2kg","name":"2 KG Meat","price":20,"default":false,"name_ar":"2 ك لحم"}],"required":true}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","type":"add","price":0.5,"name_ar":"دقوس إضافي"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","type":"add","price":0.5,"name_ar":"لوز ومكسرات محمصة"}]'::jsonb,
    '[{"id":"kofta","desc":"Minced kofta with parsley and herbs","icon":"assets/images/ing_chicken.png","name":"Armenian Seasoned Kofta","name_ar":"كفتة أرمنية متبلة","removable":false},{"id":"sauce","desc":"Sweet tangy sauce","icon":"assets/images/ing_sauce.png","name":"Tomato Pomegranate Glaze","name_ar":"صلصة طماطم ودبس رمان","removable":false}]'::jsonb,
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
    'Seasoned kofta baked with sliced potatoes in creamy lemon-tahini sauce.',
    'صينية كفتة بلدي بالفرن مع البطاطا وصلصة الطحينية بالليمون الغنية.',
    8,
    'assets/images/about_dish.png',
    true,
    false,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","type":"radio","name_ar":"الخيار والكمية (مطلوب)","options":[{"id":"chk-1","name":"1 Chicken","price":0,"default":true,"name_ar":"دجاجة"},{"id":"chk-2","name":"2 Chickens","price":7,"default":false,"name_ar":"دجاجتين"},{"id":"meat-1kg","name":"1 KG Meat","price":7,"default":false,"name_ar":"1 ك لحم"},{"id":"meat-2kg","name":"2 KG Meat","price":20,"default":false,"name_ar":"2 ك لحم"}],"required":true}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","type":"add","price":0.5,"name_ar":"دقوس إضافي"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","type":"add","price":0.5,"name_ar":"لوز ومكسرات محمصة"}]'::jsonb,
    '[{"id":"kofta","desc":"Fresh ground kofta","icon":"assets/images/ing_chicken.png","name":"Seasoned Kofta","name_ar":"كفتة بلدي متبلة","removable":false},{"id":"potatoes","desc":"Tender sliced potatoes","icon":"assets/images/ing_bun.png","name":"Baked Potato Slices","name_ar":"شرائح بطاطا بالفرن","removable":true},{"id":"tahini","desc":"Rich sesame lemon sauce","icon":"assets/images/ing_sauce.png","name":"Creamy Lemon Tahini Sauce","name_ar":"صلصة طحينية بالليمون","removable":false}]'::jsonb,
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
    'Baked seasoned kebabs layered with tomatoes, onions, sweet peppers, and tomato sauce.',
    'صينية كباب هندي تقليدية بالفرن مع شرائح الطماطم والبصل والفلفل المتبل.',
    8,
    'assets/images/about_dish.png',
    true,
    false,
    false,
    true,
    '[{"id":"portion-choice","name":"Protein & Portion (Required)","type":"radio","name_ar":"الخيار والكمية (مطلوب)","options":[{"id":"chk-1","name":"1 Chicken","price":0,"default":true,"name_ar":"دجاجة"},{"id":"chk-2","name":"2 Chickens","price":7,"default":false,"name_ar":"دجاجتين"},{"id":"meat-1kg","name":"1 KG Meat","price":7,"default":false,"name_ar":"1 ك لحم"},{"id":"meat-2kg","name":"2 KG Meat","price":20,"default":false,"name_ar":"2 ك لحم"}],"required":true}]'::jsonb,
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","type":"add","price":0.5,"name_ar":"دقوس إضافي"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","type":"add","price":0.5,"name_ar":"لوز ومكسرات محمصة"}]'::jsonb,
    '[{"id":"kebab","desc":"Fresh seasoned meat skewers","icon":"assets/images/ing_chicken.png","name":"Seasoned Kebabs","name_ar":"أصابع كباب متبلة","removable":false},{"id":"veggies","desc":"Layered oven-roasted vegetables","icon":"assets/images/ing_tomato.png","name":"Tomatoes, Onions & Peppers","name_ar":"طماطم وبصل وفلفل حلو","removable":true}]'::jsonb,
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
    'Caramelized onion brown Sayadieh rice with tender fish fillets, roasted nuts, and tarator sauce.',
    'صيادية سمك أصيلة بالأرز البني بنكهة البصل المكرمل مع قطع فيليه السمك والمكسرات وصلصة الطرطور.',
    10,
    'assets/images/about_dish.png',
    true,
    false,
    false,
    true,
    '[{"id":"fish-portion","name":"Fish Quantity (Required)","type":"radio","name_ar":"كمية السمك (مطلوب)","options":[{"id":"fish-1kg","name":"1 KG Fish","price":0,"default":true,"name_ar":"1 ك سمك"},{"id":"fish-2kg","name":"2 KG Fish","price":8,"default":false,"name_ar":"2 ك سمك"}],"required":true}]'::jsonb,
    '[{"id":"extra-tarator","name":"Extra Tarator Sauce","type":"add","price":0.5,"name_ar":"صلصة طرطور إضافية"},{"id":"extra-almonds","name":"Roasted Almonds & Nuts","type":"add","price":0.5,"name_ar":"لوز ومكسرات محمصة"}]'::jsonb,
    '[{"id":"rice","desc":"Caramelized onion spiced rice","icon":"assets/images/ing_bun.png","name":"Brown Sayadieh Rice","name_ar":"أرز صيادية بني مكرمل","removable":false},{"id":"fish","desc":"Choice of 1kg or 2kg fish","icon":"assets/images/ing_chicken.png","name":"Fresh Fish Fillet","name_ar":"فيليه سمك طازج متبل","removable":false},{"id":"tarator","desc":"Tangy tahini lemon dip","icon":"assets/images/ing_sauce.png","name":"Tarator Lemon Sauce","name_ar":"صلصة طرطور بالليمون","removable":true}]'::jsonb,
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

