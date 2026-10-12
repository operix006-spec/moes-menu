/**
 * Moe's PureBite — Standalone Subscription Explorer
 * Official 4-Week Schedule Source of Truth Implementation
 * Strictly decoupled from existing website UI.
 */

const SubscriptionApp = {
  // Current Builder State
  state: {
    plan: 'mix',            // 'mix' is the single active public plan
    duration: 'monthly',    // '14_days' | 'monthly'
    meals: '6_meals',       // '5_meals' | '6_meals'
    activeWeek: 'week1',    // 'week1' | 'week2' | 'week3' | 'week4'
    activeDay: 'sat',       // 'sat' | 'sun' | 'mon' | 'tue' | 'wed' | 'thu'
    lang: 'en',             // 'en' | 'ar'
    slideIndex: 0,
    scheduleExpanded: false
  },

  // Contact Configuration (Matches Central Website / Menu Number)
  contact: {
    phone: '+962792512221',
    displayPhone: '07 9251 2221',
    whatsappNumber: '962792512221'
  },

  // =========================================================================
  // DATA ARCHITECTURE (Decoupled & Ready for Future CMS Integration)
  // =========================================================================

  subscriptionPlans: {
    mix: {
      id: 'mix',
      name: { en: 'Meal Plan', ar: 'خطة الوجبات' },
      shortName: { en: 'Meal Plan', ar: 'خطة الوجبات' },
      active: true,
      isPublic: true,
      desc: {
        en: '100% dedicated gluten-free meal schedules crafted fresh weekly.',
        ar: 'جداول وجبات خالية من الغلوتين ١٠٠٪ ومحضّرة أسبوعياً في مطبخ مخصص وآمن.'
      }
    },
    standard: {
      id: 'standard',
      name: { en: 'Standard Plan', ar: 'الخطة الأساسية' },
      shortName: { en: 'Standard', ar: 'الأساسية' },
      active: false,
      isPublic: false,
      desc: {
        en: 'Archived plan (inactive in public storefront).',
        ar: 'خطة مؤرشفة (غير مفعلة في المتجر العام).'
      }
    }
  },

  durations: {
    '14_days': {
      id: '14_days',
      title: { en: '14 Days', ar: '١٤ يوم' },
      subtitle: { en: '2 Weeks', ar: 'أسبوعان' },
      summaryTag: { en: '14 Days · 2-Week Plan', ar: '١٤ يوم · خطة أسبوعين' },
      weeks: ['week1', 'week2']
    },
    'monthly': {
      id: 'monthly',
      title: { en: 'Monthly', ar: 'شهري' },
      subtitle: { en: '4 Weeks', ar: '٤ أسابيع' },
      summaryTag: { en: 'Monthly · 4-Week Plan', ar: 'شهري · خطة ٤ أسابيع' },
      weeks: ['week1', 'week2', 'week3', 'week4']
    }
  },

  weeklyMealOptions: {
    '5_meals': {
      id: '5_meals',
      count: 5,
      title: { en: '5 Meals / Week', ar: '٥ وجبات / أسبوع' },
      shortTitle: { en: '5 Meals', ar: '٥ وجبات' },
      scheduleInfo: { en: 'Sunday → Thursday', ar: 'من الأحد إلى الخميس' },
      days: ['sun', 'mon', 'tue', 'wed', 'thu']
    },
    '6_meals': {
      id: '6_meals',
      count: 6,
      title: { en: '6 Meals / Week', ar: '٦ وجبات / أسبوع' },
      shortTitle: { en: '6 Meals', ar: '٦ وجبات' },
      scheduleInfo: { en: 'Saturday → Thursday', ar: 'من السبت إلى الخميس' },
      days: ['sat', 'sun', 'mon', 'tue', 'wed', 'thu']
    }
  },

  // Centralized Pricing Configuration
  pricing: {
    standard: {
      '14_days': { '5_meals': '70', '6_meals': '84' },
      'monthly': { '5_meals': '135', '6_meals': '160' }
    },
    mix: {
      '14_days': { '5_meals': '85', '6_meals': '98' },
      'monthly': { '5_meals': '160', '6_meals': '185' }
    },
    currency: { en: 'JOD', ar: 'دينار' }
  },

  // =========================================================================
  // OFFICIAL SOURCE DATA MEALS LIBRARY (From Attached PDF Verbatim)
  // =========================================================================
  mealLibrary: {
    // --- PAGE 1: WEEK 1 (CHICKEN / STANDARD) ---
    kabsa_chicken: {
      id: 'kabsa_chicken',
      type: 'chicken',
      name: { en: 'Khaleeji Chicken Kabsa', ar: 'كبسة خليجية بالدجاج' },
      desc: {
        en: 'Basmati rice, grilled chicken, onion, tomato, tomato paste, black lime (loomi), gluten-free kabsa spices.',
        ar: 'أرز بسمتي، دجاج مشوي، بصل، طماطم، معجون طماطم، لومي، بهارات كبسة خالية من الجلوتين.'
      }
    },
    creamy_mushroom_chicken: {
      id: 'creamy_mushroom_chicken',
      type: 'chicken',
      name: { en: 'Creamy Mushroom Chicken', ar: 'دجاج بالكريمة والفطر' },
      desc: {
        en: 'Basmati rice, grilled chicken, fresh mushrooms, cooking cream, garlic, black pepper, parmesan cheese.',
        ar: 'أرز بسمتي، دجاج مشوي، فطر، كريمة طبخ، ثوم، فلفل أسود، جبنة بارميزان.'
      }
    },
    biryani_chicken: {
      id: 'biryani_chicken',
      type: 'chicken',
      name: { en: 'Indian Chicken Biryani', ar: 'برياني هندي بالدجاج' },
      desc: {
        en: 'Basmati rice, chicken cuts, onion, tomato, ginger, garlic, gluten-free biryani spices.',
        ar: 'أرز بسمتي، قطع الدجاج، بصل، طماطم، زنجبيل، ثوم، بهارات برياني خالية من الجلوتين.'
      }
    },
    penne_pesto: {
      id: 'penne_pesto',
      type: 'chicken',
      name: { en: 'Chicken Penne Pesto', ar: 'بيني بيستو بالدجاج' },
      desc: {
        en: 'Gluten-free penne pasta, chicken, basil, olive oil, garlic, parmesan cheese, gluten-free pesto sauce.',
        ar: 'مكرونة بيني، دجاج، ريحان، زيت زيتون، ثوم، جبنة بارميزان، صوص بيستو خالي من الجلوتين.'
      }
    },
    zarb_chicken: {
      id: 'zarb_chicken',
      type: 'chicken',
      name: { en: 'Chicken Zarb', ar: 'زرب الدجاج' },
      desc: {
        en: 'Basmati rice, chicken cuts, onion, gluten-free spices, served with grilled vegetables.',
        ar: 'أرز بسمتي، قطع الدجاج، بصل، بهارات خالية من الجلوتين، خضار مشوية.'
      }
    },
    bbq_chicken: {
      id: 'bbq_chicken',
      type: 'chicken',
      name: { en: 'BBQ Chicken Breast', ar: 'صدر دجاج باربيكيو' },
      desc: {
        en: 'Grilled chicken breast, gluten-free BBQ sauce, spices, served with mashed potatoes.',
        ar: 'صدر دجاج مشوي، صوص الباربيكيو، بهارات خالية من الجلوتين، بطاطا مهروسة.'
      }
    },

    // --- PAGE 1: WEEK 1 (MEAT & FISH / MIX) ---
    kabsa_meat: {
      id: 'kabsa_meat',
      type: 'meat',
      image: 'assets/images/kabsa.jpg',
      name: { en: 'Khaleeji Meat Kabsa', ar: 'كبسة خليجية باللحم' },
      desc: {
        en: 'Basmati rice, tender meat cuts, onion, tomato, tomato paste, black lime (loomi), gluten-free kabsa spices.',
        ar: 'أرز بسمتي، قطع لحم، بصل، طماطم، معجون طماطم، لومي، بهارات كبسة خالية من الجلوتين.'
      }
    },
    meatballs_creamy_mushroom: {
      id: 'meatballs_creamy_mushroom',
      type: 'meat',
      name: { en: 'Creamy Mushroom Meatballs', ar: 'كرات اللحم بالكريمة والفطر' },
      desc: {
        en: 'Meatballs, mushrooms, cooking cream, garlic, black pepper, parmesan cheese, served with rice or mashed potatoes.',
        ar: 'كرات اللحم، فطر، كريمة طبخ، ثوم، فلفل أسود، جبنة بارميزان، يقدم مع الرز أو البطاطا المهروسة.'
      }
    },
    biryani_meat: {
      id: 'biryani_meat',
      type: 'meat',
      name: { en: 'Indian Meat Biryani', ar: 'برياني هندي باللحم' },
      desc: {
        en: 'Basmati rice, tender meat cuts, onion, tomato, ginger, garlic, gluten-free biryani spices.',
        ar: 'أرز بسمتي، قطع اللحم، بصل، طماطم، زنجبيل، ثوم، بهارات برياني خالية من الجلوتين.'
      }
    },
    fusilli_meat: {
      id: 'fusilli_meat',
      type: 'meat',
      name: { en: 'Meat Fusilli', ar: 'فوسيلي باللحم' },
      desc: {
        en: 'Gluten-free fusilli pasta, minced meat, basil, olive oil, parmesan cheese, tomato sauce, Italian herbs and spices.',
        ar: 'مكرونة فوسيلي، لحم مفروم، ريحان، زيت زيتون، جبنة بارميزان، صوص الطماطم، أعشاب وبهارات إيطالية خالية من الجلوتين.'
      }
    },
    zarb_meat: {
      id: 'zarb_meat',
      type: 'meat',
      name: { en: 'Meat Zarb', ar: 'زرب اللحم' },
      desc: {
        en: 'Basmati rice, tender meat cuts, onion, gluten-free spices, served with grilled vegetables.',
        ar: 'أرز بسمتي، قطع اللحم، بصل، بهارات خالية من الجلوتين، خضار مشوية.'
      }
    },
    fish_cream_lemon: {
      id: 'fish_cream_lemon',
      type: 'fish',
      name: { en: 'Fish with Cream & Lemon', ar: 'سمك بالكريمة والليمون' },
      desc: {
        en: 'Grilled fish fillet, lemon cooking cream, gluten-free seasonings, served with mashed potatoes or rice.',
        ar: 'فيليه سمك مشوي، كريمة الطبخ بالليمون، بهارات خالية من الجلوتين، يقدم مع بطاطا مهروسة أو الرز.'
      }
    },

    // --- PAGE 1: WEEK 2 (CHICKEN / STANDARD) ---
    mandi_chicken: {
      id: 'mandi_chicken',
      type: 'chicken',
      name: { en: 'Chicken Mandi', ar: 'مندي بالدجاج' },
      desc: {
        en: 'Basmati rice, grilled chicken, onion, black lime (loomi), gluten-free mandi spices.',
        ar: 'أرز بسمتي، دجاج مشوي، بصل، لومي، بهارات مندي خالية من الجلوتين.'
      }
    },
    fajita_chicken: {
      id: 'fajita_chicken',
      type: 'chicken',
      name: { en: 'Chicken Fajita', ar: 'فاهيتا الدجاج' },
      desc: {
        en: 'Basmati rice, grilled chicken, sweet bell peppers, onion, special house sauces, gluten-free seasonings.',
        ar: 'أرز بسمتي، دجاج مشوي، فلفل حلو، بصل، صوصات خاصة، بهارات خالية من الجلوتين.'
      }
    },
    teriyaki_chicken: {
      id: 'teriyaki_chicken',
      type: 'chicken',
      name: { en: 'Teriyaki Chicken', ar: 'دجاج ترياكي' },
      desc: {
        en: 'Basmati rice, chicken cuts in gluten-free teriyaki sauce, garlic, ginger, sweet bell peppers.',
        ar: 'أرز بسمتي، قطع الدجاج بصوص الترياكي خالي من الجلوتين، ثوم، زنجبيل، فلفل حلو.'
      }
    },
    fettuccine_chicken: {
      id: 'fettuccine_chicken',
      type: 'chicken',
      name: { en: 'Chicken Fettuccine', ar: 'فيتوتشيني بالدجاج' },
      desc: {
        en: 'Gluten-free fettuccine pasta, grilled chicken, basil, olive oil, garlic, cooking cream, parmesan cheese.',
        ar: 'مكرونة فيتوتشيني، دجاج مشوي، ريحان، زيت زيتون، ثوم، كريمة الطبخ، جبنة بارميزان.'
      }
    },
    ouzi_chicken: {
      id: 'ouzi_chicken',
      type: 'chicken',
      name: { en: 'Chicken Ouzi', ar: 'أوزي الدجاج' },
      desc: {
        en: 'Basmati rice, chicken cuts, onion, green peas, carrots, mixed gluten-free spices.',
        ar: 'أرز بسمتي، قطع الدجاج، بصل، بازيلا وجزر، بهارات مشكلة خالية من الجلوتين.'
      }
    },
    strips_chicken: {
      id: 'strips_chicken',
      type: 'chicken',
      name: { en: 'Chicken Strips', ar: 'ستريبس الدجاج' },
      desc: {
        en: 'Crispy fried chicken breast in gluten-free flour coating, seasonings, served with mashed potatoes or rice (optional).',
        ar: 'صدر دجاج كرسبي مقلي بزيت نباتي مغلفة بطبقة طحين خالي من الجلوتين، بهارات، بطاطا مهروسة أو رز (اختياري).'
      }
    },

    // --- PAGE 1: WEEK 2 (MEAT & FISH / MIX) ---
    mandi_meat: {
      id: 'mandi_meat',
      type: 'meat',
      image: 'assets/images/mandi.jpg',
      name: { en: 'Meat Mandi', ar: 'مندي باللحم' },
      desc: {
        en: 'Basmati rice, tender meat cuts, onion, black lime (loomi), gluten-free mandi spices.',
        ar: 'أرز بسمتي، قطع اللحم، بصل، لومي، بهارات مندي خالية من الجلوتين.'
      }
    },
    fajita_meat: {
      id: 'fajita_meat',
      type: 'meat',
      name: { en: 'Meat Fajita', ar: 'فاهيتا اللحم' },
      desc: {
        en: 'Basmati rice, beef steak strips, sweet bell peppers, onion, special house sauces, gluten-free spices.',
        ar: 'أرز بسمتي، شرائح اللحم، فلفل حلو، بصل، صوصات خاصة، بهارات خالية من الجلوتين.'
      }
    },
    mongolian_beef: {
      id: 'mongolian_beef',
      type: 'meat',
      name: { en: 'Mongolian Beef', ar: 'بيف مانغوليان' },
      desc: {
        en: 'Basmati rice, beef strips in gluten-free soy and oyster sauce, garlic, ginger, bell peppers, served with rice.',
        ar: 'أرز بسمتي، شرائح اللحم بصوص الصويا والمحار خالي من الجلوتين، ثوم، زنجبيل، فلفل حلو، يقدم مع الرز.'
      }
    },
    dawood_basha: {
      id: 'dawood_basha',
      type: 'meat',
      name: { en: 'Dawood Basha (Meat)', ar: 'داوود باشا (لحم)' },
      desc: {
        en: 'Seasoned meatballs, aromatic herbs, olive oil, special black pepper tomato sauce.',
        ar: 'كرات اللحم بالتتبيلة الخاصة، أعشاب عطرية، زيت زيتون، صلصة الطماطم الخاصة بالفلفل الأسود.'
      }
    },
    ouzi_meat: {
      id: 'ouzi_meat',
      type: 'meat',
      name: { en: 'Meat Ouzi', ar: 'أوزي اللحم' },
      desc: {
        en: 'Basmati rice, tender meat cuts, onion, green peas, carrots, mixed gluten-free spices.',
        ar: 'أرز بسمتي، قطع اللحم، بصل، بازيلا وجزر، بهارات مشكلة خالية من الجلوتين.'
      }
    },
    fish_lemon_herbs: {
      id: 'fish_lemon_herbs',
      type: 'fish',
      name: { en: 'Fish with Lemon & Herbs', ar: 'سمك بالليمون والأعشاب' },
      desc: {
        en: 'Grilled fish fillet, lemon and herb sauce, gluten-free spices, served with mashed potatoes or rice (optional).',
        ar: 'فيليه سمك مشوي، صوص الليمون والأعشاب، بهارات خالية من الجلوتين، يقدم مع بطاطا مهروسة أو رز (اختياري).'
      }
    },

    // --- PAGE 2: WEEK 3 (CHICKEN / STANDARD) ---
    zurbian_chicken: {
      id: 'zurbian_chicken',
      type: 'chicken',
      name: { en: 'Chicken Zurbian', ar: 'زربيان دجاج' },
      desc: {
        en: 'Basmati rice, grilled chicken, onion, tomato, potatoes, black lime (loomi), special gluten-free spices.',
        ar: 'أرز بسمتي، دجاج مشوي، بصل، طماطم، بطاطا، لومي، بهارات مميزة خالية من الجلوتين.'
      }
    },
    lemon_garlic_chicken: {
      id: 'lemon_garlic_chicken',
      type: 'chicken',
      name: { en: 'Lemon Garlic Chicken', ar: 'دجاج بالليمون والثوم' },
      desc: {
        en: 'Grilled chicken breast with lemon and herbs, garlic and mushroom slices, black pepper, parmesan, basmati rice.',
        ar: 'صدر دجاج مشوي متبل بالليمون والأعشاب العطرية، شرحات ثوم وفطر، فلفل أسود، جبنة البارميزان، رز بسمتي.'
      }
    },
    curry_chicken: {
      id: 'curry_chicken',
      type: 'chicken',
      name: { en: 'Indian Chicken Curry', ar: 'كاري دجاج هندي' },
      desc: {
        en: 'Basmati rice, yogurt-marinated chicken cuts, onion, tomato, ginger, garlic, gluten-free curry spices.',
        ar: 'أرز بسمتي، قطع الدجاج متبلة باللبن، بصل، طماطم، زنجبيل، ثوم، بهارات كاري خالية من الجلوتين.'
      }
    },
    spaghetti_marinara: {
      id: 'spaghetti_marinara',
      type: 'chicken',
      name: { en: 'Chicken Spaghetti Marinara', ar: 'سباغيتي مارينارا بالدجاج' },
      desc: {
        en: 'Gluten-free spaghetti, chicken pieces, oregano, olive oil, garlic, parmesan cheese, tomato sauce.',
        ar: 'مكرونة سباغيتي، قطع الدجاج، أوريغانو، زيت زيتون، ثوم، جبنة بارميزان، صوص الطماطم.'
      }
    },
    qidreh_chicken: {
      id: 'qidreh_chicken',
      type: 'chicken',
      name: { en: 'Qidreh Khaliliya (Chicken)', ar: 'قدرة خليلية بالدجاج' },
      desc: {
        en: 'Rice, chicken cuts, onion, gluten-free spices, whole chickpeas, garlic, cooked with traditional ghee.',
        ar: 'أرز، قطع الدجاج، بصل، بهارات خالية من الجلوتين، حمص حب، ثوم، مطبوخ بالسمن البلدي.'
      }
    },
    chicken_mushroom_sauce: {
      id: 'chicken_mushroom_sauce',
      type: 'chicken',
      name: { en: 'Chicken in Mushroom Sauce', ar: 'صدر دجاج بصوص الفطر' },
      desc: {
        en: 'Grilled chicken breast, fresh mushroom slices, cooked mushroom sauce, gluten-free spices, rice or mashed potatoes.',
        ar: 'صدر دجاج مشوي، شرحات الفطر الطازجة، صوص الفطر المطبوخ، بهارات خالية من الجلوتين، رز أو بطاطا مهروسة.'
      }
    },

    // --- PAGE 2: WEEK 3 (MEAT & FISH / MIX) ---
    zurbian_meat: {
      id: 'zurbian_meat',
      type: 'meat',
      image: 'assets/images/zurbian.jpg',
      name: { en: 'Meat Zurbian', ar: 'زربيان لحم' },
      desc: {
        en: 'Basmati rice, tender meat cuts, onion, tomato, potatoes, black lime (loomi), special gluten-free spices.',
        ar: 'أرز بسمتي، قطع اللحم، بصل، طماطم، بطاطا، لومي، بهارات مميزة خالية من الجلوتين.'
      }
    },
    meat_potato_tajin: {
      id: 'meat_potato_tajin',
      type: 'meat',
      name: { en: 'Meat & Potato Tajin', ar: 'طاجن بطاطا باللحم' },
      desc: {
        en: 'Oven-roasted meat cuts with seasoned spiced potatoes, onion, herbs, black pepper, served with basmati rice.',
        ar: 'قطع اللحم المشوية بالفرن مع قطع بطاطا متبلة ومبهرة، بصل، أعشاب عطرية، فلفل أسود، يقدم مع رز بسمتي.'
      }
    },
    curry_fish: {
      id: 'curry_fish',
      type: 'fish',
      name: { en: 'Indian Fish Curry', ar: 'كاري السمك الهندي' },
      desc: {
        en: 'Basmati rice, fish pieces cooked in curry sauce, onion, tomato, ginger, garlic, gluten-free curry spices.',
        ar: 'أرز بسمتي، قطع السمك مطبوخة بصوص الكاري، بصل، طماطم، زنجبيل، ثوم، بهارات كاري خالية من الجلوتين.'
      }
    },
    spaghetti_bolognese: {
      id: 'spaghetti_bolognese',
      type: 'meat',
      name: { en: 'Meat Spaghetti Bolognese', ar: 'سباغيتي بولونيز باللحم' },
      desc: {
        en: 'Gluten-free spaghetti, minced meat, oregano, olive oil, garlic, parmesan cheese, tomato sauce.',
        ar: 'مكرونة سباغيتي، لحم مفروم، أوريغانو، زيت زيتون، ثوم، جبنة بارميزان، صوص الطماطم.'
      }
    },
    qidreh_meat: {
      id: 'qidreh_meat',
      type: 'meat',
      name: { en: 'Qidreh Khaliliya Meat', ar: 'قدرة خليلية باللحم' },
      desc: {
        en: 'Rice, tender meat cuts, onion, gluten-free spices, whole chickpeas, garlic, cooked with traditional ghee.',
        ar: 'أرز، قطع اللحم، بصل، بهارات خالية من الجلوتين، حمص حب، ثوم، مطبوخ بالسمن البلدي.'
      }
    },
    armenian_kofta: {
      id: 'armenian_kofta',
      type: 'meat',
      name: { en: 'Armenian Kofta with Potatoes (Meat)', ar: 'كفتة أرمنية بالبطاطا (لحم)' },
      desc: {
        en: 'Grilled kofta patties, tomato slices, gluten-free seasonings, served with rice or mashed potatoes.',
        ar: 'كفتة مشوية، شرحات الطماطم، بهارات خالية من الجلوتين، تقدم مع الرز أو البطاطا المهروسة.'
      }
    },

    // --- PAGE 2: WEEK 4 (CHICKEN / STANDARD) ---
    madghoot_chicken: {
      id: 'madghoot_chicken',
      type: 'chicken',
      name: { en: 'Madghoot Chicken', ar: 'دجاج مضغوط' },
      desc: {
        en: 'Chicken cuts and basmati rice cooked together in pressure cooker for concentrated flavor, onion, loomi, house spices.',
        ar: 'قطع الدجاج والأرز البسمتي مطبوخة في قدر الضغط معاً لنكهة مركزة، بصل، لومي، بهارات خاصة خالية من الجلوتين.'
      }
    },
    mexican_chicken: {
      id: 'mexican_chicken',
      type: 'chicken',
      name: { en: 'Mexican Chicken', ar: 'دجاج مكسيكي' },
      desc: {
        en: 'Basmati rice with Mexican vegetables, grilled chicken, sweet peppers, onion, red beans, corn, Mexican spices.',
        ar: 'أرز بسمتي بالخضار المكسيكية، دجاج مشوي، فلفل حلو، بصل، فاصوليا حمراء، ذرة، بهارات مكسيكية خالية من الجلوتين.'
      }
    },
    sweet_sour_chicken: {
      id: 'sweet_sour_chicken',
      type: 'chicken',
      name: { en: 'Sweet & Sour Chicken', ar: 'سويت ساور دجاج' },
      desc: {
        en: 'Basmati rice, chicken cuts in gluten-free sweet sauce, garlic, ginger, sweet bell peppers.',
        ar: 'أرز بسمتي، قطع الدجاج بالصوص الحلو خالي من الجلوتين، ثوم، زنجبيل، فلفل حلو.'
      }
    },
    shell_pasta_tomato_cream: {
      id: 'shell_pasta_tomato_cream',
      type: 'chicken',
      name: { en: 'Shell Pasta with Tomato Cream (Chicken)', ar: 'شيل باستا بكريمة الطماطم (دجاج)' },
      desc: {
        en: 'Gluten-free shell pasta, grilled chicken cuts, olive oil, garlic, cooking cream, tomato sauce, parmesan cheese.',
        ar: 'مكرونة شيل (صدف) خالية من الجلوتين، دجاج قطع مشوية، زيت زيتون، ثوم، كريمة الطبخ، صوص الطماطم، جبنة بارميزان.'
      }
    },
    uzbekian_chicken: {
      id: 'uzbekian_chicken',
      type: 'chicken',
      name: { en: 'Uzbekian Chicken', ar: 'أوزباكيان الدجاج' },
      desc: {
        en: 'Premium Uzbek basmati rice, chicken pieces, onion slices, carrot julienne, raisins, special Uzbek spices.',
        ar: 'طبق أوزبكي فاخر برز البسمتي، قطع الدجاج، شرحات بصل، شرحات الجزر، زبيب، بهارات أوزبكية خاصة خالية من الجلوتين.'
      }
    },
    shawarma_chicken_cuts: {
      id: 'shawarma_chicken_cuts',
      type: 'chicken',
      name: { en: 'Chicken Shawarma Cuts', ar: 'شرحات شاورما الدجاج' },
      desc: {
        en: 'Grilled chicken breast cuts with gluten-free shawarma spices, mashed potatoes or rice (optional), pickles, garlic dip.',
        ar: 'شرحات من صدر الدجاج المشوية ببهارات الشاورما الخاصة خالية من الجلوتين، بطاطا مهروسة أو رز (اختياري)، مخلل، مثومة.'
      }
    },

    // --- PAGE 2: WEEK 4 (MEAT & FISH / MIX) ---
    stuffed_zucchini: {
      id: 'stuffed_zucchini',
      type: 'meat',
      name: { en: 'Stuffed Zucchini with Meat', ar: 'كوسا مخشي باللحم' },
      desc: {
        en: 'Zucchini cuts with minced meat cooked in yogurt sauce, dried mint, special gluten-free spices.',
        ar: 'قطع الكوسا مع اللحم المفروم مطبوخ باللبن، نعنع مجفف، بهارات خاصة خالية من الجلوتين.'
      }
    },
    mexican_meat: {
      id: 'mexican_meat',
      type: 'meat',
      name: { en: 'Mexican Meat', ar: 'لحم مكسيكي' },
      desc: {
        en: 'Basmati rice with Mexican vegetables, tender meat cuts, sweet peppers, onion, red beans, corn, Mexican spices.',
        ar: 'أرز بسمتي بالخضار المكسيكية، قطع اللحم، فلفل حلو، بصل، فاصوليا حمراء، ذرة، بهارات مكسيكية خالية من الجلوتين.'
      }
    },
    kofta_tahini: {
      id: 'kofta_tahini',
      type: 'meat',
      name: { en: 'Kofta with Tahini (Meat)', ar: 'كفتة بالطحينية (لحم)' },
      desc: {
        en: 'Oven-baked kofta fingers with potato and onion slices in tahini and lemon sauce, garlic, pepper, served with basmati rice.',
        ar: 'أصابع الكفتة مشوية بالفرن مع شرحات البطاطا والبصل بصوص الطحينية والليمون، ثوم، فلفل، يقدم مع رز بسمتي.'
      }
    },
    indian_kebab: {
      id: 'indian_kebab',
      type: 'meat',
      name: { en: 'Indian Kebab (Meat)', ar: 'كباب هندي (لحم)' },
      desc: {
        en: 'Oven-grilled kebab, olive oil, served over roasted tomato sauce with nuts, accompanied by basmati rice.',
        ar: 'كباب مشوي بالفرن، زيت زيتون، يقدم على أرضية من صوص الطماطم المشوية، مكسرات، يقدم مع الرز البسمتي.'
      }
    },
    uzbekian_meat: {
      id: 'uzbekian_meat',
      type: 'meat',
      image: 'assets/images/uzbekian.jpg',
      name: { en: 'Uzbekian Meat', ar: 'أوزباكيان اللحم' },
      desc: {
        en: 'Premium Uzbek basmati rice, tender meat cuts, onion slices, carrot julienne, raisins, special Uzbek spices.',
        ar: 'طبق أوزبكي فاخر برز البسمتي، قطع اللحم، شرحات بصل، شرحات الجزر، زبيب، بهارات أوزبكية خاصة خالية من الجلوتين.'
      }
    },
    sayadieh_fish: {
      id: 'sayadieh_fish',
      type: 'fish',
      name: { en: 'Fish Sayadieh', ar: 'صيادية سمك' },
      desc: {
        en: 'Fried fish fillet, caramelized onion, tomato, black lime (loomi), cooked with rice in rich gluten-free seafood spices.',
        ar: 'فيليه سمك مقلي، بصل مكرمل، طماطم، لومي، مطبوخ مع الرز بالبهارات البحرية الغنية والخالية من الجلوتين.'
      }
    }
  },

  // =========================================================================
  // WEEKLY SCHEDULES MAPPING (Matches PDF 4 Distinct Weeks Structure)
  // =========================================================================
  weeklySchedules: {
    standard: {
      week1: {
        sat: 'kabsa_chicken',
        sun: 'creamy_mushroom_chicken',
        mon: 'biryani_chicken',
        tue: 'penne_pesto',
        wed: 'zarb_chicken',
        thu: 'bbq_chicken'
      },
      week2: {
        sat: 'mandi_chicken',
        sun: 'fajita_chicken',
        mon: 'teriyaki_chicken',
        tue: 'fettuccine_chicken',
        wed: 'ouzi_chicken',
        thu: 'strips_chicken'
      },
      week3: {
        sat: 'zurbian_chicken',
        sun: 'lemon_garlic_chicken',
        mon: 'curry_chicken',
        tue: 'spaghetti_marinara',
        wed: 'qidreh_chicken',
        thu: 'chicken_mushroom_sauce'
      },
      week4: {
        sat: 'madghoot_chicken',
        sun: 'mexican_chicken',
        mon: 'sweet_sour_chicken',
        tue: 'shell_pasta_tomato_cream',
        wed: 'uzbekian_chicken',
        thu: 'shawarma_chicken_cuts'
      }
    },
    mix: {
      week1: {
        sat: 'kabsa_meat',
        sun: 'creamy_mushroom_chicken',
        mon: 'biryani_chicken',
        tue: 'teriyaki_chicken',
        wed: 'zarb_meat',
        thu: 'fish_lemon_herbs'
      },
      week2: {
        sat: 'mandi_meat',
        sun: 'fajita_chicken',
        mon: 'mongolian_beef',
        tue: 'fettuccine_chicken',
        wed: 'ouzi_meat',
        thu: 'fish_cream_lemon'
      },
      week3: {
        sat: 'zurbian_meat',
        sun: 'lemon_garlic_chicken',
        mon: 'meat_potato_tajin',
        tue: 'curry_chicken',
        wed: 'qidreh_meat',
        thu: 'curry_fish'
      },
      week4: {
        sat: 'stuffed_zucchini',
        sun: 'mexican_chicken',
        mon: 'kofta_tahini',
        tue: 'sweet_sour_chicken',
        wed: 'uzbekian_meat',
        thu: 'sayadieh_fish'
      }
    }
  },

  // =========================================================================
  // OFFICIAL MERGED DAILY MEAL OPTIONS (From Attached PDF Verbatim)
  // Two customer-facing meal choices per day merged into a single Mix plan
  // =========================================================================
  dailyOptionsSchedule: {
    week1: {
      sat: ['kabsa_chicken', 'kabsa_meat'],
      sun: ['creamy_mushroom_chicken', 'meatballs_creamy_mushroom'],
      mon: ['biryani_chicken', 'biryani_meat'],
      tue: ['penne_pesto', 'fusilli_meat'],
      wed: ['zarb_chicken', 'zarb_meat'],
      thu: ['bbq_chicken', 'fish_cream_lemon']
    },
    week2: {
      sat: ['mandi_chicken', 'mandi_meat'],
      sun: ['fajita_chicken', 'fajita_meat'],
      mon: ['teriyaki_chicken', 'mongolian_beef'],
      tue: ['fettuccine_chicken', 'dawood_basha'],
      wed: ['ouzi_chicken', 'ouzi_meat'],
      thu: ['strips_chicken', 'fish_lemon_herbs']
    },
    week3: {
      sat: ['zurbian_chicken', 'zurbian_meat'],
      sun: ['lemon_garlic_chicken', 'meat_potato_tajin'],
      mon: ['curry_chicken', 'curry_fish'],
      tue: ['spaghetti_marinara', 'spaghetti_bolognese'],
      wed: ['qidreh_chicken', 'qidreh_meat'],
      thu: ['chicken_mushroom_sauce', 'armenian_kofta']
    },
    week4: {
      sat: ['madghoot_chicken', 'stuffed_zucchini'],
      sun: ['mexican_chicken', 'mexican_meat'],
      mon: ['sweet_sour_chicken', 'kofta_tahini'],
      tue: ['shell_pasta_tomato_cream', 'indian_kebab'],
      wed: ['uzbekian_chicken', 'uzbekian_meat'],
      thu: ['shawarma_chicken_cuts', 'sayadieh_fish']
    }
  },

  // Week Metadata
  weeksMeta: {
    week1: { 
      id: 'week1', 
      titleEn: 'Week 1', 
      titleAr: 'الأسبوع 1', 
      fullAr: 'الأسبوع الأول',
      image: 'assets/images/kabsa.jpg'
    },
    week2: { 
      id: 'week2', 
      titleEn: 'Week 2', 
      titleAr: 'الأسبوع 2', 
      fullAr: 'الأسبوع الثاني',
      image: 'assets/images/mandi.jpg'
    },
    week3: { 
      id: 'week3', 
      titleEn: 'Week 3', 
      titleAr: 'الأسبوع 3', 
      fullAr: 'الأسبوع الثالث',
      image: 'assets/images/zurbian.jpg'
    },
    week4: { 
      id: 'week4', 
      titleEn: 'Week 4', 
      titleAr: 'الأسبوع 4', 
      fullAr: 'الأسبوع الرابع',
      image: 'assets/images/uzbekian.jpg'
    }
  },

  // Day Definitions & Translation
  daysMeta: {
    sat: { shortEn: 'SAT', shortAr: 'السبت', fullEn: 'Saturday', fullAr: 'السبت' },
    sun: { shortEn: 'SUN', shortAr: 'الأحد', fullEn: 'Sunday', fullAr: 'الأحد' },
    mon: { shortEn: 'MON', shortAr: 'الإثنين', fullEn: 'Monday', fullAr: 'الإثنين' },
    tue: { shortEn: 'TUE', shortAr: 'الثلاثاء', fullEn: 'Tuesday', fullAr: 'الثلاثاء' },
    wed: { shortEn: 'WED', shortAr: 'الأربعاء', fullEn: 'Wednesday', fullAr: 'الأربعاء' },
    thu: { shortEn: 'THU', shortAr: 'الخميس', fullEn: 'Thursday', fullAr: 'الخميس' }
  },

  // Bilingual Static Content
  content: {
    en: {
      sub_page_title: 'Subscriptions',
      hero_badge: 'Monthly & Weekly Meal Subscriptions',
      hero_title: 'Pure Food, Planned for You',
      hero_subtitle: '100% gluten-free, chef-crafted weekly meal schedules prepared fresh in our dedicated celiac-safe kitchen.',
      hero_trust_celiac: '100% Celiac Safe',
      hero_trust_kitchen: 'Dedicated Safe Kitchen',
      hero_trust_fresh: 'Fresh Weekly Schedules',
      hero_caption: 'Fresh Chef-Crafted Meals',
      hero_title_highlight: 'Planned for You',
      hero_badge_dual: 'Fresh Meat & Chicken Options Daily',
      hero_chip_chicken: 'Chicken Mandi',
      hero_chip_meat: 'Meat Kabsa',
      // Builder Section
      builder_badge: 'Step 1',
      builder_title: 'Choose Your Subscription',
      builder_subtitle: 'Select your duration and weekly meal schedule',
      duration_label: 'Subscription Duration',
      duration_hint: 'Choose between 14-Day or Monthly plan',
      duration_14_title: '14 Days',
      duration_14_sub: '2 Weeks • Flexible Trial',
      duration_monthly_title: 'Monthly',
      duration_monthly_sub: '4 Weeks • Full Plan',
      duration_monthly_badge: 'Most Popular',
      meals_label: 'Weekly Meals',
      meals_hint: 'Select days per week',
      meals_5_title: '5 Meals / Week',
      meals_5_sub: 'Sun–Thu (Workdays)',
      meals_6_title: '6 Meals / Week',
      meals_6_sub: 'Sat–Thu (Full Week)',

      // Summary Section
      summary_card_title: 'Your Subscription Summary',
      summary_live_status: 'Live update',
      summary_duration_label: 'Duration',
      summary_meals_label: 'Pace',
      summary_total_label: 'Total Meals',
      summary_price_label: 'Final Price',

      // Delivery Area Section
      delivery_section_title: 'Are you in our delivery zone?',

      // Final CTA
      cta_primary_btn: 'Chat on WhatsApp',
      cta_note: 'For confirmation and direct coordination with the kitchen',
      sticky_cta_btn: 'Subscribe Now',

      
      // Delivery Area Section (10 KM Radius)
      delivery_section_eyebrow: 'Delivery Area',
      delivery_main_statement: 'Delivery is available within a 10 KM radius of Moe’s PureBite.',
      delivery_subtext: 'Coverage includes areas near our kitchen and may vary based on your exact location.',
      delivery_caption: '10 KM Radius from Kitchen',
      delivery_areas_label: 'Examples of nearby areas:',
      area_marj: 'Marj Al Hamam',
      area_seventh: 'Seventh Circle',
      area_bunayyat: 'Al Bunayyat',
      area_sweifieh: 'Sweifieh',
      area_deirghbar: 'Deir Ghbar',
      area_abdoun: 'Abdoun',
      delivery_note_inside: '<strong>Within standard zone:</strong> Coverage depends on your exact location. Please reach out to confirm your address.',
      delivery_inquiry_text: 'To check delivery availability, please contact us at the following number',
      delivery_btn: 'Check Your Area on WhatsApp',
      delivery_btn_wa: 'WhatsApp',
      delivery_btn_call: '079-251-2221',
      brochures_badge: 'OFFICIAL FLYERS & MENUS',
      brochures_title: 'Official Menu & Plan Posters',
      brochures_subtitle: 'Browse official meal flyers and pricing plans',
      zoom_hint: '🔍 Tap to Zoom',
      schedule_toggle_eyebrow: 'COMPLETE WEEKLY SCHEDULE',
      schedule_toggle_btn_show: 'Show Detailed Weekly Meal Plans',
      schedule_toggle_btn_hide: 'Hide Detailed Weekly Meal Plans',
      schedule_toggle_hint: 'Click here to view daily dishes and diverse meal options in detail',
      schedule_active_tag: '4 Weeks · 24 Meals',

      // Schedule Section
      schedule_title: 'Meal Plan',
      schedule_hint: 'Tap any meal to view details',
      schedule_dual_notice: 'Daily diverse meal options crafted with care:',
      legend_chicken: '[ Chicken ] Chicken Option',
      legend_meat: '[ Meat ] Meat Option',
      legend_fish: '[ Fish ] Seafood Option',
      not_in_plan: 'Not included in 5-meal plan',

      // Options Section
      options_title: 'Customize Your Subscription',
      options_subtitle: 'Select your duration and weekly meal schedule',
      control_duration_label: 'Duration',
      control_meals_label: 'Weekly Meals',
      duration_14_title: '14 Days',
      duration_monthly_title: 'Monthly',
      meals_5_title: '5 Meals',
      meals_5_sub: 'Sun–Thu',
      meals_6_title: '6 Meals',
      meals_6_sub: 'Sat–Thu',

      // Summary & Price
      summary_badge: 'YOUR SELECTION',
      summary_note: 'No online payment • Confirmed directly on WhatsApp',
      summary_price_label: 'Total Price',

      // WhatsApp CTA
      cta_whatsapp_btn: 'Chat on WhatsApp',
      cta_call_label: 'Or call Moe’s directly:',
      instagram: 'Instagram',
      facebook: 'Facebook',
      whatsapp: 'WhatsApp',
      call_us: 'Call Us',
      footer_rights: 'All rights reserved. 100% Dedicated Gluten-Free.',
      powered_by: 'Powered by',
      cta_call_subtext: 'Or call Moe’s directly: <span dir="ltr" class="sub-call-phone">07 9251 2221</span>',

      // Sidebar & Navigation
      nav_home: 'Home',
      nav_menu: 'Menu',
      nav_subscriptions: 'Subscriptions',
      nav_about: 'About Us',
      nav_cart: 'Cart',
      tagline: 'PURE FOOD. PURE LIFE.',
      order_wa: 'Order via WhatsApp'
    },
    ar: {
      sub_page_title: 'الاشتراكات',
      hero_badge: 'اشتراك الوجبات الشهرية والأسبوعية',
      hero_title: 'طعام نقي، محضّر خصيصاً لك',
      hero_subtitle: 'جداول وجبات خالية من الغلوتين ١٠٠٪ ومحضّرة أسبوعياً في مطبخنا المخصص والآمن لمرضى السيلياك.',
      hero_trust_celiac: 'آمن للسيلياك ١٠٠٪',
      hero_trust_kitchen: 'مطبخ مخصص وآمن',
      hero_trust_fresh: 'جداول متجددة أسبوعياً',
      hero_caption: 'وجبات طازجة ومحضّرة بعناية',
      hero_title_highlight: 'محضّر خصيصاً لك',
      hero_badge_dual: 'خيارات لحم ودجاج طازجة يومياً',
      hero_chip_chicken: 'مندي بالدجاج',
      hero_chip_meat: 'كبسة باللحم',
      // Builder Section
      builder_badge: 'الخطوة الأولى',
      builder_title: 'اختر اشتراكك',
      builder_subtitle: 'حدد مدة الخطة وعدد الوجبات الأسبوعية المناسبة لك',
      duration_label: 'مدة الاشتراك',
      duration_hint: 'اختر بين خطة الأسبوعين أو الخطة الشهرية',
      duration_14_title: '١٤ يوم',
      duration_14_sub: 'أسبوعان • تجربة مرنة',
      duration_monthly_title: 'شهري',
      duration_monthly_sub: '٤ أسابيع • الخطة الكاملة',
      duration_monthly_badge: 'الأكثر طلباً',
      meals_label: 'الوجبات الأسبوعية',
      meals_hint: 'حدد عدد وجباتك في الأسبوع',
      meals_5_title: '٥ وجبات / أسبوع',
      meals_5_sub: 'الأحد–الخميس (أيام العمل)',
      meals_6_title: '٦ وجبات / أسبوع',
      meals_6_sub: 'السبت–الخميس (أسبوع كامل)',

      // Summary Section
      summary_card_title: 'ملخص اشتراكك',
      summary_live_status: 'تحديث فوري',
      summary_duration_label: 'المدة',
      summary_meals_label: 'الوتيرة',
      summary_total_label: 'إجمالي الوجبات',
      summary_price_label: 'السعر النهائي',

      // Delivery Area Section
      delivery_section_title: 'هل أنت ضمن نطاق التوصيل؟',

      // Final CTA
      cta_primary_btn: 'تواصل عبر واتساب',
      cta_note: 'للتأكيد والتنسيق مباشرة مع المطبخ',
      sticky_cta_btn: 'اشترك الآن',

      
      // Delivery Area Section (10 KM Radius)
      delivery_section_eyebrow: 'منطقة التوصيل',
      delivery_main_statement: 'نوصل ضمن نطاق 10 كم من موقع Moe’s PureBite',
      delivery_subtext: 'تشمل التغطية مناطق قريبة من المطبخ، وقد تختلف حسب الموقع الدقيق.',
      delivery_caption: 'نطاق 10 كم من موقع المطبخ',
      delivery_areas_label: 'من المناطق القريبة من نطاق التوصيل:',
      area_marj: 'مرج الحمام',
      area_seventh: 'السابع',
      area_bunayyat: 'البنيات',
      area_sweifieh: 'الصويفية',
      area_deirghbar: 'دير غبار',
      area_abdoun: 'عبدون',
      delivery_note_outside: '<strong>خارج النطاق المباشر:</strong> تتوفر إمكانية التنسيق والتوصيل، يرجى التواصل معنا للتأكيد والترتيب المسبق.',
      delivery_note_inside: '<strong>ضمن النطاق:</strong> التغطية تعتمد على موقعك الدقيق، يرجى التواصل لتأكيد عنوانك.',
      delivery_inquiry_text: 'لمعرفة إمكانية التوصيل التواصل على الرقم التالي',
      delivery_btn: 'تحقق من منطقتك عبر واتساب',
      delivery_btn_wa: 'واتساب',
      delivery_btn_call: '079-251-2221',
      brochures_badge: 'النشرات وقوائم الأسعار الرسمية',
      brochures_title: 'نشرات وباقات الوجبات',
      brochures_subtitle: 'تصفح النشرات الرسمية للوجبات وقوائم الأسعار',
      schedule_toggle_eyebrow: 'الجدول الأسبوعي الكامل',
      schedule_toggle_btn_show: 'عرض خطة وجبات الأسابيع التفصيلية',
      schedule_toggle_btn_hide: 'إخفاء خطة وجبات الأسابيع التفصيلية',
      schedule_toggle_hint: 'اضغط هنا لاستعراض وجبات الأيام وخياراتها المتنوعة بالتفصيل',
      schedule_active_tag: '٤ أسابيع · ٢٤ وجبة',
      zoom_hint: '🔍 تكبير الصورة',

      // Schedule Section
      schedule_title: 'خطة الوجبات',
      schedule_hint: 'اضغط على أي وجبة لمعرفة التفاصيل والمكونات',
      schedule_dual_notice: 'يومياً خيارات وجبات متنوعة ومحضّرة بعناية:',
      legend_chicken: '[ دجاج ] خيار الدجاج',
      legend_meat: '[ لحم ] خيار اللحم',
      legend_fish: '[ سمك ] خيار الأسماك',
      not_in_plan: 'غير مشمول في باقة ٥ وجبات',

      // Options Section
      options_title: 'خيارات الاشتراك',
      options_subtitle: 'اختر المدة وعدد الوجبات الأسبوعية المناسبة لك',
      control_duration_label: 'المدة',
      control_meals_label: 'الوجبات الأسبوعية',
      duration_14_title: '١٤ يوم',
      duration_monthly_title: 'شهري',
      meals_5_title: '٥ وجبات',
      meals_5_sub: 'الأحد–الخميس',
      meals_6_title: '٦ وجبات',
      meals_6_sub: 'السبت–الخميس',

      // Summary & Price
      summary_badge: 'ملخص اختيارك',
      summary_note: 'لا يتطلب دفع إلكتروني • يتم التأكيد والتنسيق مباشرة عبر واتساب',
      summary_price_label: 'السعر الإجمالي',

      // WhatsApp CTA
      cta_whatsapp_btn: 'تواصل عبر واتساب',
      cta_call_label: 'أو اتصل بمويز مباشرة:',
      instagram: 'إنستغرام',
      facebook: 'فيسبوك',
      whatsapp: 'واتساب',
      call_us: 'اتصل بنا',
      footer_rights: 'جميع الحقوق محفوظة. مطبخ خالٍ من الغلوتين 100%.',
      powered_by: 'بدعم من',
      cta_call_subtext: 'أو اتصل بمويز مباشرة: <span dir="ltr" class="sub-call-phone">07 9251 2221</span>',

      // Sidebar & Navigation
      nav_home: 'الرئيسية',
      nav_menu: 'قائمة الطعام',
      nav_subscriptions: 'الاشتراكات',
      nav_about: 'من نحن',
      nav_cart: 'السلة',
      tagline: 'طعام نقي. حياة نقية.',
      order_wa: 'طلب عبر واتساب'
    }
  },


  // =========================================================================
  // BROCHURE SLIDER LOGIC
  // =========================================================================

  flyerSlides: [
    { titleEn: 'Subscription Details', titleAr: 'تفاصيل الاشتراكات والأسعار', descEn: 'Details of plans and prices', descAr: 'استعرض باقات الاشتراك والأسعار بالتفصيل', src: 'assets/images/slides/slide_1.jpg' },
    { titleEn: 'Week 1 Menu', titleAr: 'جدول الأسبوع الأول', descEn: 'First week meal plan', descAr: 'خطة وجبات الأسبوع الأول من الاشتراك', src: 'assets/images/slides/slide_2.jpg' },
    { titleEn: 'Week 2 Menu', titleAr: 'جدول الأسبوع الثاني', descEn: 'Second week meal plan', descAr: 'خطة وجبات الأسبوع الثاني من الاشتراك', src: 'assets/images/slides/slide_6.jpg' },
    { titleEn: '100% GF Kitchen', titleAr: 'مطبخ آمن ومخصص 100%', descEn: 'Our dedicated celiac-safe kitchen', descAr: 'مطبخنا خالٍ من الغلوتين وآمن لمرضى السيلياك', src: 'assets/images/slides/slide_3.jpg' },
    { titleEn: 'Week 3 Menu', titleAr: 'جدول الأسبوع الثالث', descEn: 'Third week meal plan', descAr: 'خطة وجبات الأسبوع الثالث من الاشتراك', src: 'assets/images/slides/slide_4.jpg' },
    { titleEn: 'Week 4 Menu', titleAr: 'جدول الأسبوع الرابع', descEn: 'Fourth week meal plan', descAr: 'خطة وجبات الأسبوع الرابع من الاشتراك', src: 'assets/images/slides/slide_5.jpg' }
  ],

  goToSlide(index) {
    const total = this.flyerSlides.length;
    if (index < 0) index = 0;
    if (index >= total) index = total - 1;
    this.state.slideIndex = index;
    this.updateSliderUI();
  },

  nextSlide() {
    const total = this.flyerSlides.length;
    this.state.slideIndex = (this.state.slideIndex + 1) % total;
    this.updateSliderUI();
  },

  prevSlide() {
    const total = this.flyerSlides.length;
    this.state.slideIndex = (this.state.slideIndex - 1 + total) % total;
    this.updateSliderUI();
  },

  updateSliderUI() {
    const index = this.state.slideIndex;
    const isAr = this.state.lang === 'ar';
    const track = document.getElementById('slider-track');
    if (track) {
      // In RTL, the next slide is to the left, so we translate the track to the right (+)
      const offsetPercent = isAr ? (index * 100) : -(index * 100);
      track.style.transform = `translateX(${offsetPercent}%)`;
    }

    // Update active slide classes
    const slides = document.querySelectorAll('.sub-slide-item');
    slides.forEach((sl, idx) => {
      sl.classList.toggle('active', idx === index);
    });

    // Update dots
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });

    // Update counter
    const counter = document.getElementById('slider-counter');
    if (counter) {
      const currentNum = isAr ? this.toArabicNumeral(index + 1) : (index + 1);
      const totalNum = isAr ? this.toArabicNumeral(this.flyerSlides.length) : this.flyerSlides.length;
      counter.textContent = isAr ? `${currentNum} من ${totalNum}` : `${currentNum} of ${totalNum}`;
    }
  },

  toArabicNumeral(num) {
    const arDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return String(num).replace(/\d/g, d => arDigits[d]);
  },

  handleTouchStart(e) {
    if (e.touches && e.touches.length > 0) {
      this.state.touchStartX = e.touches[0].clientX;
    }
  },

  handleTouchEnd(e) {
    if (e.changedTouches && e.changedTouches.length > 0) {
      const touchEndX = e.changedTouches[0].clientX;
      const diffX = touchEndX - this.state.touchStartX;
      const isAr = this.state.lang === 'ar';
      
      // Minimum swipe threshold 40px
      if (Math.abs(diffX) > 40) {
        if (diffX > 0) {
          // Swiped right: in RTL this goes to next, in LTR goes to prev
          if (isAr) this.nextSlide();
          else this.prevSlide();
        } else {
          // Swiped left: in RTL this goes to prev, in LTR goes to next
          if (isAr) this.prevSlide();
          else this.nextSlide();
        }
      }
    }
  },

  // =========================================================================
  // FLYER LIGHTBOX MODAL
  // =========================================================================

  openFlyerLightbox(index) {
    // Disabled per user request
    return;
  },

  closeFlyerLightbox() {
    const modal = document.getElementById('sub-flyer-lightbox');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  },

  // =========================================================================
  // COLLAPSIBLE SCHEDULE ACCORDION
  // =========================================================================

  toggleScheduleSection() {
    this.state.scheduleExpanded = !this.state.scheduleExpanded;
    const isExpanded = this.state.scheduleExpanded;
    const card = document.getElementById('sub-schedule-accordion');
    const btn = document.getElementById('sub-schedule-toggle-btn');
    const body = document.getElementById('sub-schedule-collapse-body');
    const textEl = document.getElementById('schedule-toggle-title-text');

    if (card) {
      card.classList.toggle('expanded', isExpanded);
      card.classList.toggle('collapsed', !isExpanded);
    }

    if (btn) {
      btn.classList.toggle('expanded', isExpanded);
      btn.classList.toggle('collapsed', !isExpanded);
      btn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    }

    if (body) {
      body.classList.toggle('expanded', isExpanded);
      body.classList.toggle('collapsed', !isExpanded);
      body.setAttribute('aria-hidden', isExpanded ? 'false' : 'true');
    }

    if (textEl) {
      const dict = this.content[this.state.lang] || this.content.ar;
      textEl.textContent = isExpanded 
        ? dict.schedule_toggle_btn_hide 
        : dict.schedule_toggle_btn_show;
    }

    // If expanding, smooth scroll slightly to reveal
    if (isExpanded && card) {
      setTimeout(() => {
        const topPos = card.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top: topPos, behavior: 'smooth' });
      }, 100);
    }
  },

  // =========================================================================
  // CMS SYNC LOGIC
  // =========================================================================
  mergeRemoteConfig(remoteConfig) {
    if (!remoteConfig) return;

    if (remoteConfig.pricing && Object.keys(remoteConfig.pricing).length > 0) {
      if (remoteConfig.pricing.mix) {
        this.pricing.mix = { ...this.pricing.mix, ...remoteConfig.pricing.mix };
      }
      if (remoteConfig.pricing['14_days'] || remoteConfig.pricing['monthly']) {
        this.pricing.mix = { ...this.pricing.mix, ...remoteConfig.pricing };
      }
      if (remoteConfig.pricing.standard) {
        this.pricing.standard = { ...this.pricing.standard, ...remoteConfig.pricing.standard };
      }
      if (remoteConfig.pricing.currency) {
        this.pricing.currency = { ...this.pricing.currency, ...remoteConfig.pricing.currency };
      }
      this.pricing = { ...this.pricing, ...remoteConfig.pricing };
    }

    if (remoteConfig.content && Object.keys(remoteConfig.content).length > 0) {
      const rc = remoteConfig.content;
      // Complete text overrides
      const overrideKeys = [
        'hero_badge', 'hero_title', 'hero_title_highlight', 'hero_subtitle', 'hero_image',
        'hero_trust_celiac', 'hero_trust_kitchen', 'hero_trust_fresh',
        'delivery_section_eyebrow', 'delivery_main_statement', 'delivery_subtext',
        'delivery_inquiry_text',
        'delivery_note_inside', 'delivery_note_outside',
        'brochures_badge', 'brochures_title', 'brochures_subtitle',
        'schedule_toggle_eyebrow', 'schedule_title', 'schedule_hint',
        'schedule_toggle_btn_show', 'schedule_toggle_btn_hide',
        'options_title', 'options_subtitle', 'summary_note'
      ];
      
      overrideKeys.forEach(k => {
        if (rc[k]) {
          this.content.ar[k] = rc[k];
        }
        if (rc[`${k}_en`]) {
          this.content.en[k] = rc[`${k}_en`];
        } else if (rc[k] && !this.content.en[k]) {
          this.content.en[k] = rc[k];
        }
      });
      
      if (this.content.ar.brochures_subtitle) {
        this.content.ar.brochures_subtitle = this.content.ar.brochures_subtitle
          .replace(/\s*\(اسحب أو اضغط للتكبير\)/g, '')
          .replace(/\s*\(اضغط للتكبير\)/g, '')
          .replace(/\s*\(اسحب للتكبير\)/g, '')
          .trim();
      }
      if (this.content.en.brochures_subtitle) {
        this.content.en.brochures_subtitle = this.content.en.brochures_subtitle
          .replace(/\s*\(tap to zoom\)/gi, '')
          .replace(/\s*\(swipe or tap to zoom\)/gi, '')
          .trim();
      }
      
      if (rc.hero_image) {
        this.content.ar.hero_image = rc.hero_image;
        this.content.en.hero_image = rc.hero_image;
        const heroImg = document.querySelector('.sub-hero-food-img');
        if (heroImg) heroImg.src = rc.hero_image;
      }
      
      if (rc.delivery_areas_ar || rc.delivery_areas) {
        this.content.ar.delivery_areas = rc.delivery_areas_ar || rc.delivery_areas;
      }
      if (rc.delivery_areas_en) {
        this.content.en.delivery_areas = rc.delivery_areas_en;
      }
    }

    if (remoteConfig.slider && remoteConfig.slider.length > 0) {
      // Re-populate slider array to prevent out of bounds crashes
      this.flyerSlides = remoteConfig.slider.map((slide, idx) => ({
        titleEn: `Slide ${idx+1}`,
        titleAr: `صورة ${idx+1}`,
        descEn: '',
        descAr: '',
        src: slide.url
      }));

      // Re-populate slider
      const track = document.getElementById('slider-track');
      if (track) {
        track.innerHTML = remoteConfig.slider.map((slide, i) => `
          <div class="sub-slide-item ${i === 0 ? 'active' : ''}" data-index="${i}">
            <div class="sub-slide-card">
              <div class="sub-slide-img-box">
                <img src="${slide.url}" alt="Slide ${i+1}" loading="lazy" />
              </div>
            </div>
          </div>
        `).join('');
        // Re-init slider dots
        const dots = document.getElementById('slider-dots');
        if (dots) {
          dots.innerHTML = remoteConfig.slider.map((_, i) => `
            <button type="button" class="slider-dot ${i === 0 ? 'active' : ''}" onclick="SubscriptionApp.goToSlide(${i})" aria-label="Slide ${i+1}"></button>
          `).join('');
        }
        // Update slider total count
        const counter = document.getElementById('slider-counter');
        if (counter) {
          counter.textContent = this.state.lang === 'ar' 
            ? `١ من ${remoteConfig.slider.length}`
            : `1 of ${remoteConfig.slider.length}`;
        }
      }
    }

    if (remoteConfig.meal_library && Object.keys(remoteConfig.meal_library).length > 0) {
      for (const [mealId, mealData] of Object.entries(remoteConfig.meal_library)) {
        if (this.mealLibrary[mealId]) {
          this.mealLibrary[mealId] = { ...this.mealLibrary[mealId], ...mealData };
        } else {
          this.mealLibrary[mealId] = mealData;
        }
      }
    }

    if (remoteConfig.schedules && Object.keys(remoteConfig.schedules).length > 0) {
      if (remoteConfig.schedules.dailyOptionsSchedule) {
        this.dailyOptionsSchedule = { ...this.dailyOptionsSchedule, ...remoteConfig.schedules.dailyOptionsSchedule };
      }
    }
  },

  // =========================================================================
  // INITIALIZATION & LIFECYCLE
  // =========================================================================

  async fetchRemoteConfig() {
    try {
      let data = null;
      if (window.supabaseClient) {
        const { data: configData, error } = await window.supabaseClient
          .from('subscription_config')
          .select('*')
          .eq('id', 'global')
          .single();
        if (!error && configData) {
          data = configData;
        }
      }

      // Direct REST fallback if supabaseClient is not ready or failed
      if (!data) {
        const SUPABASE_REST = 'https://rycyfvhxlglnrkbvmwcb.supabase.co/rest/v1/subscription_config?id=eq.global&select=*';
        const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5Y3lmdmh4bGdsbnJrYnZtd2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjQ2NjQsImV4cCI6MjEwMzM0MDY2NH0.nmVHTRcHa1JGy_PClyHvzthHhHVUBDjgn3vV86WmRJU';
        const resp = await fetch(SUPABASE_REST, {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': 'Bearer ' + SUPABASE_KEY
          }
        });
        if (resp.ok) {
          const list = await resp.json();
          if (Array.isArray(list) && list.length > 0) {
            data = list[0];
          }
        }
      }

      if (data) {
        this.mergeRemoteConfig(data);
        this.applyLanguage();
        this.render();
        this.updateSliderUI();
      }
    } catch (err) {
      console.warn("SubscriptionApp fetchRemoteConfig warning:", err);
    }
  },

  async init() {
    // 1. Sync contact info and subscription config with central store/localStorage on any page
    try {
      const saved = localStorage.getItem('moes_purebite_db_v1');
      if (saved) {
        const db = JSON.parse(saved);
        if (db.settings && db.settings.whatsappNumber) {
          this.contact.whatsappNumber = db.settings.whatsappNumber.replace(/[^0-9]/g, '');
        }
        if (db.settings && db.settings.phoneDisplay) {
          this.contact.displayPhone = db.settings.phoneDisplay;
          const phoneEl = document.getElementById('sub-display-phone');
          if (phoneEl) phoneEl.textContent = this.contact.displayPhone;
        }
        if (db.settings && db.settings.phoneCallable) {
          this.contact.phone = db.settings.phoneCallable;
        }
        if (db.subscriptionConfig) {
          this.mergeRemoteConfig(db.subscriptionConfig);
        }
      }
    } catch (e) {}

    // 2. Listen for live updates from store on any page
    window.addEventListener("moe:data-updated", (e) => {
      const db = e.detail;
      if (db && db.subscriptionConfig) {
        this.mergeRemoteConfig(db.subscriptionConfig);
        const container = document.getElementById('sub-all-weeks-grid');
        if (container) {
          this.applyLanguage();
          this.render(); // Re-render subscriptions page if present
        }
      }
    });

    // 3. Only initialize full subscriptions page UI if sub-all-weeks-grid is present
    const subAppContainer = document.getElementById('sub-all-weeks-grid');
    if (!subAppContainer) {
      if (!this._fetchedConfig) {
        this._fetchedConfig = true;
        await this.fetchRemoteConfig();
      }
      return;
    }

    let savedLang = 'ar';
    try {
      const explicit = localStorage.getItem('moe_lang');
      if (explicit === 'ar' || explicit === 'en') {
        savedLang = explicit;
      } else if (typeof MoeStore !== 'undefined' && MoeStore.getLang) {
        savedLang = MoeStore.getLang();
      }
    } catch (e) {}
    this.state.lang = savedLang;

    // Cross-tab and store lang listener
    window.addEventListener("moe:lang-changed", (e) => {
      const newLang = e.detail;
      if (newLang && this.state.lang !== newLang) {
        this.state.lang = newLang;
        const subAppContainer = document.getElementById('sub-all-weeks-grid');
        if (subAppContainer) {
          this.applyLanguage();
          this.render();
        }
      }
    });

    window.addEventListener("storage", (e) => {
      if (e.key === "moe_lang" && (e.newValue === "ar" || e.newValue === "en")) {
        if (this.state.lang !== e.newValue) {
          this.state.lang = e.newValue;
          const subAppContainer = document.getElementById('sub-all-weeks-grid');
          if (subAppContainer) {
            this.applyLanguage();
            this.render();
          }
        }
      }
    });

    this.applyLanguage();
    this.render();
    this.updateCartBadge();

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMealModal();
        this.closeFlyerLightbox();
      }
    });
    this.updateSliderUI();

    // Fetch live config from Supabase to guarantee accurate pricing and meal schedules
    await this.fetchRemoteConfig();
  },

  toggleLanguage() {
    this.state.lang = this.state.lang === 'en' ? 'ar' : 'en';
    try {
      localStorage.setItem('moe_lang', this.state.lang);
    } catch (e) {}
    if (typeof MoeStore !== 'undefined' && MoeStore.setLang) {
      try { MoeStore.setLang(this.state.lang); } catch (e) {}
    }
    this.applyLanguage();
    this.render();
  },

  applyLanguage() {
    const isAr = this.state.lang === 'ar';
    document.documentElement.setAttribute('lang', this.state.lang);
    document.documentElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');
    document.title = isAr ? "الاشتراكات | Moe's PureBite" : "Subscriptions | Moe's PureBite";

    const btnLang = document.getElementById('btn-lang-switcher');
    if (btnLang) {
      btnLang.textContent = isAr ? 'EN' : 'عربي';
    }

    // Update all elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    const dict = this.content[this.state.lang] || this.content.en;
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Update hero title and highlight smoothly
    const heroTitleEl = document.querySelector('.sub-hero-title');
    if (heroTitleEl && dict.hero_title) {
      const highlight = dict.hero_title_highlight || '';
      const full = dict.hero_title;
      if (highlight && full.includes(highlight)) {
        heroTitleEl.innerHTML = full.replace(highlight, `<span class="sub-hero-title-highlight" data-i18n="hero_title_highlight">${highlight}</span>`);
      } else {
        heroTitleEl.innerHTML = full;
      }
    }

    // Update delivery areas list if customized
    const areasContainer = document.getElementById('delivery-areas-container');
    if (areasContainer) {
      let rawAreas = dict.delivery_areas;
      if (!rawAreas) {
        rawAreas = isAr ? this.content.ar.delivery_areas : this.content.en.delivery_areas;
      }
      if (rawAreas) {
        let areasArray = [];
        if (Array.isArray(rawAreas)) {
          areasArray = rawAreas;
        } else if (typeof rawAreas === 'string') {
          areasArray = rawAreas.split(/[,،]/).map(s => s.trim()).filter(Boolean);
        }
        if (areasArray.length > 0) {
          areasContainer.innerHTML = areasArray.map(a => `<span class="sub-area-text">${a}</span>`).join('<span class="sub-area-sep" aria-hidden="true">·</span>');
        }
      }
    }

    // Update dynamic toggle button text
    const textEl = document.getElementById('schedule-toggle-title-text');
    if (textEl) {
      textEl.textContent = this.state.scheduleExpanded 
        ? dict.schedule_toggle_btn_hide 
        : dict.schedule_toggle_btn_show;
    }

    // Update hero image if customized
    if (dict.hero_image) {
      const heroImg = document.querySelector('.sub-hero-food-img');
      if (heroImg) heroImg.src = dict.hero_image;
    }

    // Update slider UI and counter in correct language
    this.updateSliderUI();
  },

  // =========================================================================
  // SIDEBAR & CART UTILITIES
  // =========================================================================

  toggleSidebar() {
    const drawer = document.getElementById('sidebar-drawer');
    const overlay = document.getElementById('sidebar-overlay');
    if (drawer && overlay) {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        this.closeSidebar();
      } else {
        drawer.classList.add('open');
        overlay.classList.add('active');
      }
    }
  },

  closeSidebar() {
    const drawer = document.getElementById('sidebar-drawer');
    const overlay = document.getElementById('sidebar-overlay');
    if (drawer && overlay) {
      drawer.classList.remove('open');
      overlay.classList.remove('active');
    }
  },

  updateCartBadge() {
    const badge = document.querySelector('.cart-count-badge');
    if (!badge) return;
    try {
      if (typeof MoeStore !== 'undefined' && MoeStore.getCartCount) {
        const count = MoeStore.getCartCount();
        if (count > 0) {
          badge.textContent = count;
          badge.style.display = 'flex';
          return;
        }
      }
      const cartData = localStorage.getItem('moes_purebite_cart_v1') || localStorage.getItem('moes_purebite_cart') || localStorage.getItem('cart');
      if (cartData) {
        const cart = JSON.parse(cartData);
        const count = Array.isArray(cart) ? cart.reduce((sum, item) => sum + (item.quantity || 1), 0) : 0;
        if (count > 0) {
          badge.textContent = count;
          badge.style.display = 'flex';
          return;
        }
      }
    } catch (e) {}
    badge.style.display = 'none';
  },

  


  // =========================================================================
  // STATE MUTATIONS
  // =========================================================================

  setPlan(planKey) {
    if (this.state.plan === planKey) return;
    this.state.plan = planKey;
    this.updateSegmentedControls();
    this.updateSummaryUI();
    this.applyMasterPlanEmphasis();
  },

  setDuration(durationKey) {
    if (this.state.duration === durationKey) return;
    this.state.duration = durationKey;
    this.updateSegmentedControls();
    this.updateSummaryUI();
    this.applyMasterPlanEmphasis();
  },

  setWeeklyMeals(mealsKey) {
    if (this.state.meals === mealsKey) return;
    this.state.meals = mealsKey;
    this.updateSegmentedControls();
    this.updateSummaryUI();
    this.applyMasterPlanEmphasis();
  },

  // =========================================================================
  // COMPUTED VALUES
  // =========================================================================

  getCurrentPrice() {
    const { plan, duration, meals } = this.state;
    const planPricing = (this.pricing && this.pricing[plan]) || (this.pricing && this.pricing.mix) || this.pricing;
    if (planPricing && planPricing[duration] && planPricing[duration][meals] !== undefined && planPricing[duration][meals] !== null) {
      return String(planPricing[duration][meals]);
    }
    return '---';
  },

  getAvailableWeeks() {
    return this.durations[this.state.duration].weeks;
  },

  getAvailableDays() {
    return this.weeklyMealOptions[this.state.meals].days;
  },

  getMealForDay(weekKey, dayKey) {
    const planSchedule = this.weeklySchedules.mix[weekKey];
    const mealId = planSchedule && planSchedule[dayKey];
    return mealId && this.mealLibrary[mealId] ? this.mealLibrary[mealId] : null;
  },

  // Official Subscription Meal Types (Dynamic & Extensible)
  mealTypes: {
    chicken: {
      key: 'chicken',
      label: { en: 'Chicken', ar: 'دجاج' }
    },
    meat: {
      key: 'meat',
      label: { en: 'Meat', ar: 'لحم' }
    },
    fish: {
      key: 'fish',
      label: { en: 'Fish', ar: 'سمك' }
    },
    special: {
      key: 'special',
      label: { en: 'Specialty', ar: 'طبق مميز' }
    },
    veg: {
      key: 'veg',
      label: { en: 'Vegetarian', ar: 'نباتي' }
    },
    pasta: {
      key: 'pasta',
      label: { en: 'Pasta', ar: 'باستا' }
    }
  },

  getMealType(mealId, mealObj) {
    const isAr = this.state.lang === 'ar';
    const meal = mealObj || (mealId ? this.mealLibrary[mealId] : null);

    // Support custom label directly specified on meal
    if (meal && meal.typeLabel) {
      const customLabel = typeof meal.typeLabel === 'object'
        ? (isAr ? (meal.typeLabel.ar || meal.typeLabel.en) : (meal.typeLabel.en || meal.typeLabel.ar))
        : meal.typeLabel;
      const key = (meal.type || 'special').toLowerCase();
      return {
        key: key,
        label: customLabel
      };
    }

    let typeKey = (meal && meal.type) ? meal.type.toLowerCase() : null;

    if (!typeKey && mealId) {
      const id = mealId.toLowerCase();
      if (id.includes('fish') || id.includes('sayadieh')) {
        typeKey = 'fish';
      } else if (id.includes('pasta') || id.includes('spaghetti') || id.includes('penne') || id.includes('fettuccine') || id.includes('fusilli') || id.includes('shell_pasta')) {
        typeKey = 'pasta';
      } else if (id.includes('veg') || id.includes('salad')) {
        typeKey = 'veg';
      } else if (id.includes('meat') || id.includes('beef') || id.includes('kofta') || id.includes('kebab') || id.includes('dawood') || id.includes('zucchini')) {
        typeKey = 'meat';
      } else {
        typeKey = 'chicken';
      }
    }

    const typeDef = this.mealTypes[typeKey] || this.mealTypes.special || this.mealTypes.chicken;
    return {
      key: typeDef.key,
      label: isAr ? typeDef.label.ar : typeDef.label.en
    };
  },

  // Inferred category from grounded dish data
  getMealCategory(mealId, mealObj) {
    const isAr = this.state.lang === 'ar';
    const id = (mealId || '').toLowerCase();
    const descEn = (mealObj && mealObj.desc && mealObj.desc.en ? mealObj.desc.en : '').toLowerCase();

    if (id.includes('fish') || descEn.includes('fish') || id.includes('sayadieh')) {
      return {
        key: 'fish',
        label: isAr ? 'مأكولات بحرية' : 'Fresh Seafood'
      };
    }
    if (id.includes('meat') || id.includes('beef') || id.includes('kofta') || id.includes('kebab') || id.includes('dawood') || id.includes('zucchini')) {
      return {
        key: 'meat',
        label: isAr ? 'لحوم فاخرة' : 'Prime Meat'
      };
    }
    if (id.includes('chicken') || descEn.includes('chicken')) {
      return {
        key: 'chicken',
        label: isAr ? 'دواجن طازجة' : 'Fresh Poultry'
      };
    }
    return {
      key: 'specialty',
      label: isAr ? 'أطباق شيف مميزة' : 'Chef Specialty'
    };
  },

  // =========================================================================
  // RENDER & MASTER PLAN DYNAMIC VISUAL EMPHASIS
  // =========================================================================

  render() {
    this.updateSegmentedControls();
    this.updateSummaryUI();
    this.renderAllWeeks();
  },

  updateSegmentedControls() {
    // Duration
    const btnDur14 = document.getElementById('seg-duration-14');
    const btnDurMonthly = document.getElementById('seg-duration-monthly');
    const is14 = this.state.duration === '14_days';
    if (btnDur14 && btnDurMonthly) {
      btnDur14.classList.toggle('active', is14);
      btnDurMonthly.classList.toggle('active', !is14);
      btnDur14.setAttribute('aria-checked', is14 ? 'true' : 'false');
      btnDurMonthly.setAttribute('aria-checked', !is14 ? 'true' : 'false');
    }

    // Meals
    const btnMeals5 = document.getElementById('seg-meals-5');
    const btnMeals6 = document.getElementById('seg-meals-6');
    const is5 = this.state.meals === '5_meals';
    if (btnMeals5 && btnMeals6) {
      btnMeals5.classList.toggle('active', is5);
      btnMeals6.classList.toggle('active', !is5);
      btnMeals5.setAttribute('aria-checked', is5 ? 'true' : 'false');
      btnMeals6.setAttribute('aria-checked', !is5 ? 'true' : 'false');
    }
  },

    updateSummaryUI() {
    const lang = this.state.lang;
    const planObj = this.subscriptionPlans[this.state.plan];
    const durationObj = this.durations[this.state.duration];
    const mealsObj = this.weeklyMealOptions[this.state.meals];

    const summaryTextEl = document.getElementById('summary-selection-text');
    if (summaryTextEl) {
      const durationTitle = durationObj.title[lang];
      const mealsTitle = mealsObj.title[lang];
      summaryTextEl.textContent = `${durationTitle} · ${mealsTitle}`;
    }

    const priceNumEl = document.getElementById('summary-price-number');
    const priceCurEl = document.getElementById('summary-price-currency');
    if (priceNumEl) {
      priceNumEl.classList.add('price-updating');
      setTimeout(() => {
        priceNumEl.textContent = this.getCurrentPrice();
        priceNumEl.classList.remove('price-updating');
      }, 50);
    }
    if (priceCurEl) {
      priceCurEl.textContent = this.pricing.currency[lang];
    }
  },

  renderAllWeeks() {
    const container = document.getElementById('sub-all-weeks-grid');
    if (!container) return;

    const lang = this.state.lang;
    const isAr = lang === 'ar';
    const allWeeks = ['week1', 'week2', 'week3', 'week4'];
    const allDays = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu'];

    // Maintain stable 4-board grid layout at all times (4 cols desktop, 2x2 mobile)
    container.className = 'sub-all-weeks-grid weeks-4';

    const weekTitlesAr = ['الأسبوع الأول', 'الأسبوع الثاني', 'الأسبوع الثالث', 'الأسبوع الرابع'];
    const weekTitlesEn = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    const weekNums = ['01', '02', '03', '04'];

    let html = '';
    allWeeks.forEach((weekKey, index) => {
      const weekNumStr = weekNums[index];
      const weekTitle = isAr ? weekTitlesAr[index] : weekTitlesEn[index];

      let daysHtml = '';
      allDays.forEach(dayKey => {
        const dMeta = this.daysMeta[dayKey];
        const dayLabel = isAr ? (dMeta.fullAr || dMeta.shortAr) : dMeta.shortEn;
        const optionIds = (this.dailyOptionsSchedule[weekKey] && this.dailyOptionsSchedule[weekKey][dayKey]) || [];

        let optionsHtml = '';
        optionIds.forEach(mealId => {
          const meal = this.mealLibrary[mealId];
          if (!meal) return;
          const mealType = this.getMealType(mealId, meal);
          const mealName = (meal.name && typeof meal.name === 'object')
            ? (meal.name[lang] || meal.name.ar || meal.name.en || mealId)
            : (meal.name || mealId);

          optionsHtml += `
            <div class="sub-scheduled-meal-item type-${mealType.key}"
                 onclick="SubscriptionApp.openMealModal('${weekKey}', '${dayKey}', '${mealId}')"
                 onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();SubscriptionApp.openMealModal('${weekKey}', '${dayKey}', '${mealId}');}"
                 tabindex="0"
                 role="button"
                 aria-label="${dayLabel}: ${mealType.label} - ${mealName}">
              <div class="sub-meal-card-top">
                <span class="sub-meal-type-pill type-${mealType.key}">${mealType.label}</span>
                <span class="sub-meal-details-link" aria-hidden="true">
                  <span class="details-label">${isAr ? 'التفاصيل' : 'Details'}</span>
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="${isAr ? '15 18 9 12 15 6' : '9 18 15 12 9 6'}"></polyline>
                  </svg>
                </span>
              </div>
              <div class="sub-scheduled-meal-name">${mealName}</div>
            </div>
          `;
        });

        daysHtml += `
          <div class="sub-day-row" data-week="${weekKey}" data-day="${dayKey}">
            <div class="sub-day-header">
              <span class="sub-day-name">${dayLabel}</span>
              <span class="sub-day-excluded-pill" data-role="day-excluded-pill" style="display:none;"></span>
            </div>
            <div class="sub-day-options-list">
              ${optionsHtml}
            </div>
          </div>
        `;
      });

      html += `
        <div class="sub-week-card" data-week="${weekKey}">
          <div class="sub-week-card-header">
            <div class="sub-week-num">${weekNumStr}</div>
            <div class="sub-week-header-info">
              <h3 class="sub-week-title">${weekTitle}</h3>
              <div class="sub-week-meta-line">
                <span class="sub-week-count"></span>
                <span class="sub-week-plan-badge" data-role="week-badge" style="display:none;"></span>
              </div>
            </div>
          </div>
          <div class="sub-week-meal-list">
            ${daysHtml}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    this.applyMasterPlanEmphasis();
  },

  applyMasterPlanEmphasis() {
    const lang = this.state.lang;
    const isAr = lang === 'ar';
    const dict = this.content[lang] || this.content.ar;
    const duration = this.state.duration; // '14_days' or 'monthly'
    const meals = this.state.meals;       // '5_meals' or '6_meals'
    const is14Days = duration === '14_days';
    const is5Meals = meals === '5_meals';

    // 1. Update Schedule Header Active Tag (reassuring summary)
    const activeTag = document.getElementById('schedule-active-tag');
    if (activeTag) {
      if (isAr) {
        if (is14Days) {
          activeTag.textContent = is5Meals ? 'أسبوعان · ١٠ وجبات مشمولة' : 'أسبوعان · ١٢ وجبة مشمولة';
        } else {
          activeTag.textContent = is5Meals ? '٤ أسابيع · ٢٠ وجبة مشمولة' : '٤ أسابيع · ٢٤ وجبة';
        }
      } else {
        if (is14Days) {
          activeTag.textContent = is5Meals ? '2 Weeks · 10 Meals Included' : '2 Weeks · 12 Meals Included';
        } else {
          activeTag.textContent = is5Meals ? '4 Weeks · 20 Meals Included' : '4 Weeks · 24 Meals';
        }
      }
    }

    // 2. Dynamic emphasis on Week Cards
    const weekCards = document.querySelectorAll('.sub-week-card');
    weekCards.forEach(card => {
      const weekKey = card.getAttribute('data-week');
      const isWeekMuted = is14Days && (weekKey === 'week3' || weekKey === 'week4');
      const weekBadge = card.querySelector('[data-role="week-badge"]');
      const weekCount = card.querySelector('.sub-week-count');

      if (isWeekMuted) {
        card.classList.add('week-muted');
        card.classList.remove('week-included');
        if (weekBadge) {
          weekBadge.style.display = 'inline-block';
          weekBadge.textContent = isAr ? 'ضمن الاشتراك الشهري فقط' : 'Monthly Plan Only';
        }
        if (weekCount) {
          weekCount.textContent = isAr ? 'خارج اشتراك ١٤ يوم' : 'Outside 14-Day Plan';
        }
      } else {
        card.classList.add('week-included');
        card.classList.remove('week-muted');
        if (weekBadge) {
          weekBadge.style.display = 'none';
        }
        if (weekCount) {
          if (is5Meals) {
            weekCount.textContent = isAr ? '٥ وجبات مشمولة' : '5 Meals Included';
          } else {
            weekCount.textContent = isAr ? '٦ وجبات كاملة' : '6 Meals Full Week';
          }
        }
      }
    });

    // 3. Dynamic emphasis on Saturday Row (5 vs 6 meals)
    const dayRows = document.querySelectorAll('.sub-day-row, .sub-day-group');
    const excludedPillText = dict.not_in_plan || (isAr ? 'غير مشمول في باقة ٥ وجبات' : 'Not included in 5 meals');
    dayRows.forEach(row => {
      const dayKey = row.getAttribute('data-day');
      const isSaturday = dayKey === 'sat';
      const pill = row.querySelector('[data-role="day-excluded-pill"]');

      if (isSaturday && is5Meals) {
        row.classList.add('day-muted');
        row.classList.remove('day-included');
        if (pill) {
          pill.style.display = 'inline-block';
          pill.textContent = excludedPillText;
        }
      } else {
        row.classList.remove('day-muted');
        row.classList.add('day-included');
        if (pill) {
          pill.style.display = 'none';
        }
      }
    });
  },

  // =========================================================================
  // MEAL DETAIL MODAL / BOTTOM SHEET (NATURAL RESTAURANT PRODUCT DETAIL)
  // =========================================================================

  openMealModal(weekKey, dayKey, mealId) {
    const meal = this.mealLibrary[mealId];
    if (!meal) return;

    const lang = this.state.lang;
    const isAr = lang === 'ar';
    const dMeta = this.daysMeta[dayKey];
    const dayLabel = isAr ? (dMeta.fullAr || dMeta.shortAr) : dMeta.fullEn;
    const wMeta = this.weeksMeta[weekKey];
    const weekLabel = isAr ? (wMeta.fullAr || wMeta.titleAr) : wMeta.titleEn;

    // Highlight viewing meal row without moving layout
    document.querySelectorAll('.sub-scheduled-meal-item.viewing-meal').forEach(el => el.classList.remove('viewing-meal'));
    const clickedItem = document.querySelector(`.sub-day-row[data-week="${weekKey}"][data-day="${dayKey}"] .sub-scheduled-meal-item[onclick*="${mealId}"]`);
    if (clickedItem) {
      clickedItem.classList.add('viewing-meal');
    }

    // Determine inclusion status under current customer subscription choices
    const is14Days = this.state.duration === '14_days';
    const is5Meals = this.state.meals === '5_meals';
    const isWeekMuted = is14Days && (weekKey === 'week3' || weekKey === 'week4');
    const isDayMuted = is5Meals && dayKey === 'sat';
    const isIncluded = !isWeekMuted && !isDayMuted;

    let statusText = '';
    let statusClass = '';
    if (isIncluded) {
      statusText = isAr ? 'مشمولة في خطتك الحالية' : 'Included in your current plan';
      statusClass = 'sub-status-active';
    } else if (isDayMuted && isWeekMuted) {
      statusText = isAr ? 'متاحة مع الشهري + خيار ٦ وجبات' : 'Available with Monthly + 6-Meal Plan';
      statusClass = 'sub-status-muted';
    } else if (isDayMuted) {
      statusText = isAr ? 'متاحة مع خيار ٦ وجبات (السبت)' : 'Available with 6-Meal Option (Sat)';
      statusClass = 'sub-status-muted';
    } else {
      statusText = isAr ? 'ضمن خطة الاشتراك الشهري' : 'Included in Monthly Plan';
      statusClass = 'sub-status-muted';
    }

    const mealType = this.getMealType(mealId, meal);
    const mealName = (meal.name && typeof meal.name === 'object')
      ? (meal.name[lang] || meal.name.ar || meal.name.en || mealId)
      : (meal.name || mealId);
    const mealDesc = (meal.desc && typeof meal.desc === 'object')
      ? (meal.desc[lang] || meal.desc.ar || meal.desc.en || '')
      : (meal.desc || (isAr ? 'وجبة محضرة بعناية بمكونات طازجة خالية من الغلوتين ١٠٠٪.' : 'Carefully crafted 100% gluten-free meal with fresh ingredients.'));
    const celiacText = isAr ? 'خالٍ من الغلوتين ١٠٠٪ • مطبخ مخصص وآمن للسيلياك' : '100% Gluten-Free • Dedicated Celiac Safe Kitchen';
    const closeBtnText = isAr ? 'إغلاق' : 'Close';

    const sheetBody = document.getElementById('sub-meal-sheet-body');
    if (sheetBody) {
      const mealImgHtml = (meal && meal.image) ? `
        <div class="sub-modal-image-wrap">
          <img src="${meal.image}" alt="${mealName}" class="sub-modal-food-img" />
          <span class="sub-modal-food-badge type-${mealType.key}">${mealType.label}</span>
        </div>
      ` : '';

      sheetBody.innerHTML = `
        <div class="sub-modal-editorial">
          ${mealImgHtml}
          <div class="sub-modal-header-meta">
            <span class="sub-modal-timing">${weekLabel} · ${dayLabel}</span>
            <span class="sub-modal-status-text ${statusClass}">${statusText}</span>
          </div>

          <h3 id="modal-meal-name" class="sub-modal-meal-name">${mealName}</h3>
          <div class="sub-modal-dish-type type-${mealType.key}">${mealType.label}</div>

          <p class="sub-modal-dish-desc">${mealDesc}</p>

          <div class="sub-modal-hairline"></div>

          <div class="sub-modal-footer-line">
            <span class="sub-modal-guarantee-text">${celiacText}</span>
            <button type="button" class="sub-modal-text-close" onclick="SubscriptionApp.closeMealModal()">${closeBtnText}</button>
          </div>
        </div>
      `;
    }

    const modalContainer = document.getElementById('sub-meal-modal-container');
    if (modalContainer) {
      modalContainer.classList.add('active');
      modalContainer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('sub-modal-open');
    }
  },

  closeMealModal() {
    const modalContainer = document.getElementById('sub-meal-modal-container');
    if (modalContainer) {
      modalContainer.classList.remove('active');
      modalContainer.setAttribute('aria-hidden', 'true');
    }
    document.body.classList.remove('sub-modal-open');
    document.querySelectorAll('.sub-scheduled-meal-item.viewing-meal').forEach(el => el.classList.remove('viewing-meal'));
  },

  // ACTIONS & CONVERSION
  // =========================================================================

  contactWhatsApp(event) {
    if (event) event.preventDefault();

    const lang = this.state.lang;
    const isAr = lang === 'ar';
    const planName = this.subscriptionPlans[this.state.plan].shortName[lang];
    const durationTitle = this.durations[this.state.duration].title[lang];
    const mealsTitle = this.weeklyMealOptions[this.state.meals].title[lang];

    let message = '';
    if (isAr) {
      message = `مرحباً Moe's PureBite، أنا مهتم باشتراك الوجبات: ${durationTitle}، ${mealsTitle}.`;
    } else {
      message = `Hello Moe's PureBite, I'm interested in the meal subscription: ${durationTitle}, ${mealsTitle}.`;
    }

    const url = `https://wa.me/${this.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  },

  checkDeliveryArea(event) {
    if (event) event.preventDefault();
    const lang = this.state.lang;
    const isAr = lang === 'ar';
    const message = isAr
      ? 'مرحبًا، أريد التأكد من توفر توصيل اشتراك الوجبات إلى موقعي.'
      : 'Hello, I would like to check whether meal subscription delivery is available to my location.';
    const url = `https://wa.me/${this.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  },

  callMoe(event) {
    window.location.href = `tel:${this.contact.phone}`;
  }
};

// Expose globally
if (typeof window !== 'undefined') {
  window.SubscriptionApp = SubscriptionApp;
}

// Initialize once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  SubscriptionApp.init();
});


