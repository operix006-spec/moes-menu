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

