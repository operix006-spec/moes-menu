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
INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients) VALUES (
    'mandi', 
    'main-dishes', 
    'Mandi', 
    NULL, 
    'Fragrant spiced rice with roasted chicken and fresh daqoos. Daqoos quantity increases automatically with chicken quantity.', 
    NULL, 
    8, 
    'assets/images/mandi.svg', 
    true, 
    false, 
    false, 
    true, 
    '[{"id":"chicken-qty","name":"Chicken Quantity (Required)","required":true,"type":"radio","options":[{"id":"1-chk","name":"1 Chicken (Base) + 1 Daqoos","price":0,"default":true},{"id":"1.5-chk","name":"1.5 Chickens + 2 Daqoos","price":4},{"id":"2-chk","name":"2 Chickens + 2 Daqoos","price":8},{"id":"3-chk","name":"3 Chickens + 3 Daqoos","price":16},{"id":"4-chk","name":"4 Chickens + 4 Daqoos","price":24}]}]'::jsonb, 
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","price":0.5,"type":"add"}]'::jsonb, 
    '[{"id":"rice","name":"Fragrant Mandi Rice","desc":"Spiced basmati rice","icon":"assets/images/ing_bun.png","removable":false},{"id":"roasted-chicken","name":"Roasted Chicken","desc":"Tender spiced chicken","icon":"assets/images/ing_chicken.png","removable":false},{"id":"daqoos","name":"Daqoos Sauce","desc":"Fresh tomato chili sauce","icon":"assets/images/ing_sauce.png","removable":true}]'::jsonb
  );
INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients) VALUES (
    'zurbian', 
    'main-dishes', 
    'Zurbian', 
    NULL, 
    'Aromatic spiced rice, chicken, golden potato pieces, caramelized onions, and fresh daqoos.', 
    NULL, 
    9, 
    'assets/images/zurbian.svg', 
    true, 
    false, 
    false, 
    true, 
    '[{"id":"chicken-qty","name":"Chicken Quantity (Required)","required":true,"type":"radio","options":[{"id":"1-chk","name":"1 Chicken (Base) + 1 Daqoos","price":0,"default":true},{"id":"1.5-chk","name":"1.5 Chickens + 2 Daqoos","price":4.5},{"id":"2-chk","name":"2 Chickens + 2 Daqoos","price":9},{"id":"3-chk","name":"3 Chickens + 3 Daqoos","price":18},{"id":"4-chk","name":"4 Chickens + 4 Daqoos","price":27}]}]'::jsonb, 
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","price":0.5,"type":"add"}]'::jsonb, 
    '[{"id":"rice","name":"Spiced Zurbian Rice","desc":"Rich fragrant rice","icon":"assets/images/ing_bun.png","removable":false},{"id":"chicken","name":"Chicken","desc":"Slow-cooked spiced chicken","icon":"assets/images/ing_chicken.png","removable":false},{"id":"potato","name":"Potato Pieces","desc":"Golden spiced potatoes","icon":"assets/images/ing_bun.png","removable":true},{"id":"onion","name":"Onion Pieces","desc":"Caramelized onions","icon":"assets/images/ing_lettuce.png","removable":true},{"id":"daqoos","name":"Daqoos Sauce","desc":"Fresh spicy tomato dip","icon":"assets/images/ing_sauce.png","removable":true}]'::jsonb
  );
INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients) VALUES (
    'kabsa', 
    'main-dishes', 
    'Kabsa', 
    NULL, 
    'Authentic spiced rice with roasted chicken, rich Kabsa spices, and daqoos.', 
    NULL, 
    8, 
    'assets/images/kabsa.svg', 
    true, 
    false, 
    false, 
    true, 
    '[{"id":"chicken-qty","name":"Chicken Quantity (Required)","required":true,"type":"radio","options":[{"id":"1-chk","name":"1 Chicken (Base) + 1 Daqoos","price":0,"default":true},{"id":"1.5-chk","name":"1.5 Chickens + 2 Daqoos","price":4},{"id":"2-chk","name":"2 Chickens + 2 Daqoos","price":8},{"id":"3-chk","name":"3 Chickens + 3 Daqoos","price":16},{"id":"4-chk","name":"4 Chickens + 4 Daqoos","price":24}]}]'::jsonb, 
    '[{"id":"extra-daqoos","name":"Extra Daqoos Sauce","price":0.5,"type":"add"}]'::jsonb, 
    '[{"id":"rice","name":"Kabsa Spiced Rice","desc":"Savory basmati rice","icon":"assets/images/ing_bun.png","removable":false},{"id":"chicken","name":"Roasted Chicken","desc":"Tender roasted chicken","icon":"assets/images/ing_chicken.png","removable":false},{"id":"daqoos","name":"Daqoos Sauce","desc":"Fresh tomato daqoos","icon":"assets/images/ing_sauce.png","removable":true}]'::jsonb
  );
INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients) VALUES (
    'uzbekian', 
    'main-dishes', 
    'Uzbekian', 
    NULL, 
    'Spiced rice with carrots, raisins, chickpeas, and choice of Chicken or Tender Meat.', 
    NULL, 
    9, 
    'assets/images/uzbekian.svg', 
    true, 
    false, 
    false, 
    true, 
    '[{"id":"meat-selection","name":"Dish Protein & Weight (Required)","required":true,"type":"radio","options":[{"id":"chk-1","name":"Chicken (1 Chicken Base) — 9.00 JOD","price":0,"default":true},{"id":"chk-2","name":"Chicken (2 Chickens) — 18.00 JOD","price":9},{"id":"chk-3","name":"Chicken (3 Chickens) — 27.00 JOD","price":18},{"id":"chk-4","name":"Chicken (4 Chickens) — 36.00 JOD","price":27},{"id":"meat-1kg","name":"Tender Meat (1 KG Base) — 15.00 JOD","price":6},{"id":"meat-2kg","name":"Tender Meat (2 KG) — 30.00 JOD","price":21}]}]'::jsonb, 
    '[{"id":"extra-chickpeas","name":"Extra Chickpeas & Raisins","price":0.75,"type":"add"}]'::jsonb, 
    '[{"id":"rice","name":"Spiced Rice","desc":"Aromatic pilaf rice","icon":"assets/images/ing_bun.png","removable":false},{"id":"carrots","name":"Carrots","desc":"Sweet julienned carrots","icon":"assets/images/ing_tomato.png","removable":true},{"id":"raisins","name":"Raisins","desc":"Plump sweet raisins","icon":"assets/images/ing_sauce.png","removable":true},{"id":"chickpeas","name":"Chickpeas","desc":"Tender garbanzo beans","icon":"assets/images/ing_bun.png","removable":true}]'::jsonb
  );
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

