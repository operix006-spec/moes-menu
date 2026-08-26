/**
 * Moe's PureBite — Default Initial Database & Configuration
 * 100% Dedicated Gluten-Free Restaurant & Kitchen
 */

const DEFAULT_DATA = {
  settings: {
    restaurantName: "Moe's PureBite",
    tagline: "PURE FOOD. PURE LIFE.",
    currency: "JOD",
    phoneDisplay: "079-251-2221",
    phoneCallable: "+962792512221",
    whatsappNumber: "962792512221", // international format for wa.me
    instagram: "moes.purebite",
    facebook: "https://facebook.com/moespurebite",
    address: "Amman, Jordan",
    workingHours: "12:00 PM – 11:30 PM Daily",
    logoPath: "assets/images/logo_new.jpg"
  },
  
  trustIndicators: [
    {
      id: "gf-kitchen",
      title: "100% Gluten-Free",
      title_ar: "خالٍ 100% من الغلوتين",
      subtitle: "Dedicated Kitchen",
      subtitle_ar: "مطبخ مختص",
      icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
    },
    {
      id: "celiac-safe",
      title: "Safe for Celiac",
      title_ar: "آمن لمرضى السيلياك",
      subtitle: "Strict Protocols",
      subtitle_ar: "معايير صارمة",
      icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`
    },
    {
      id: "no-cross-contam",
      title: "No Cross Contamination",
      title_ar: "بدون تلوث تبادلي",
      subtitle: "Zero Wheat Allowed",
      subtitle_ar: "ممنوع دخول القمح",
      icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>`
    },
    {
      id: "fresh-ing",
      title: "Fresh Ingredients",
      title_ar: "مكونات طازجة",
      subtitle: "Sourced Daily",
      subtitle_ar: "نحضرها يومياً",
      icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`
    }
  ],

  brandPillars: [
    { text: "Carefully Prepared", text_ar: "محضّر بعناية" },
    { text: "Made Daily", text_ar: "يُحضر يومياً" },
    { text: "Loved by Families", text_ar: "مفضل للعائلات" }
  ],

  categories: [
    {
      id: "all",
      name: "All",
      name_ar: "الكل",
      icon: "✨",
      order: 1,
      enabled: true
    },
    {
      id: "burgers-sandwiches",
      name: "Burgers & Sandwiches",
      name_ar: "برجر وساندويشات",
      icon: "🍔",
      order: 2,
      enabled: true
    },
    {
      id: "chicken-boxes",
      name: "Chicken & Boxes",
      name_ar: "دجاج وبوكسات",
      icon: "🍗",
      order: 3,
      enabled: true
    },
    {
      id: "salads",
      name: "Salads",
      name_ar: "سلطات",
      icon: "🥗",
      order: 4,
      enabled: true
    },
    {
      id: "broasted",
      name: "Broasted",
      name_ar: "بروستد",
      icon: "🍗",
      order: 5,
      enabled: true
    },
    {
      id: "main-dishes",
      name: "Main Dishes",
      name_ar: "أطباق رئيسية",
      icon: "🍛",
      order: 6,
      enabled: true,
      hasPreorderWarning: true
    },
    {
      id: "drinks-extras",
      name: "Drinks & Extras",
      name_ar: "مشروبات وإضافات",
      icon: "🥤",
      order: 7,
      enabled: true
    }
  ],

  products: [
    {
      id: "zinger-burger",
      name: "Zinger Burger",
      category: "burgers-sandwiches",
      basePrice: 3.25,
      description: "Crispy fried chicken fillet with lettuce, cheese, tomato, and special sauce in a toasted gluten-free bun.",
      name_ar: "زنجر برجر",
      description_ar: "فيليه دجاج مقرمش مع الخس والجبنة والبندورة والصوص الخاص في خبز خالٍ من الغلوتين محمص.",
      image: "assets/images/zinger_burger.png",
      heroImage: "assets/images/zinger_burger_hero.png",
      available: true,
      isBestSeller: true,
      isFeatured: true,
      tags: ["Gluten-Free", "Celiac Friendly"],
      ingredients: [
        { id: "gf-bun", name: "Gluten-Free Bun", desc: "Soft, golden gluten-free sesame bun", icon: "assets/images/ing_bun.png", removable: false },
        { id: "chicken-fillet", name: "Crispy Chicken Fillet", desc: "Golden fried crispy chicken fillet", icon: "assets/images/ing_chicken.png", removable: false },
        { id: "lettuce", name: "Lettuce", desc: "Fresh green crisp lettuce", icon: "assets/images/ing_lettuce.png", removable: true },
        { id: "cheese", name: "Cheese", desc: "Melted dairy cheese slice", icon: "assets/images/ing_cheese.png", removable: true },
        { id: "tomato", name: "Tomato", desc: "Fresh sliced ripe tomato", icon: "assets/images/ing_tomato.png", removable: true },
        { id: "special-sauce", name: "Special Sauce", desc: "Our signature house sauce", icon: "assets/images/ing_sauce.png", removable: true }
      ],
      optionGroups: [
        {
          id: "meal-type",
          name: "Make it a Meal", name_ar: "اجعلها وجبة",
          required: true,
          type: "radio",
          options: [
            { id: "sandwich-only", name: "Sandwich Only", name_ar: "ساندويش فقط", price: 0.00, default: true },
            { id: "full-meal", name: "Full Meal (+ Fries & Kinza Drink)", name_ar: "وجبة كاملة (+ بطاطا وكنزا)", price: 1.50 }
          ]
        }
      ],
      modifiers: [
        { id: "extra-cheese", name: "Extra Cheese", name_ar: "جبنة إضافية", price: 0.40, type: "add" },
        { id: "extra-sauce", name: "Extra Special Sauce", name_ar: "صوص خاص إضافي", price: 0.30, type: "add" },
        { id: "extra-chicken", name: "Extra Chicken Fillet", name_ar: "فيليه دجاج إضافي", price: 1.50, type: "add" }
      ]
    },
    {
      id: "zinger-wrap",
      name: "Zinger Wrap",
      category: "burgers-sandwiches",
      basePrice: 3.50,
      description: "Crispy fried chicken fillet with lettuce, mayo, and cheese wrapped in toasted gluten-free bread.",
      name_ar: "زنجر راب",
      description_ar: "فيليه دجاج مقرمش مع الخس والمايونيز والجبنة ملفوف في خبز تورتيلا خالٍ من الغلوتين.",
      image: "assets/images/zinger_wrap.png",
      available: true,
      isBestSeller: false,
      isFeatured: true,
      tags: ["Gluten-Free", "Fresh Ingredients"],
      ingredients: [
        { id: "wrap-bread", name: "Gluten-Free Wrap", desc: "Toasted GF tortilla bread", icon: "assets/images/ing_bun.png", removable: false },
        { id: "zinger-fillet", name: "Crispy Chicken Zinger", desc: "Crispy chicken fillet", icon: "assets/images/ing_chicken.png", removable: false },
        { id: "cheese", name: "Cheese", desc: "Melted cheese blend", icon: "assets/images/ing_cheese.png", removable: true },
        { id: "lettuce", name: "Lettuce", desc: "Fresh green lettuce", icon: "assets/images/ing_lettuce.png", removable: true },
        { id: "special-sauce", name: "Special Sauce", desc: "Signature sauce & mayo", icon: "assets/images/ing_sauce.png", removable: true }
      ],
      optionGroups: [
        {
          id: "flavor",
          name: "Flavor Preference", name_ar: "النكهة",
          required: true,
          type: "radio",
          options: [
            { id: "regular", name: "Regular", name_ar: "عادي", price: 0.00, default: true },
            { id: "spicy", name: "Spicy", name_ar: "حار", price: 0.00 }
          ]
        },
        {
          id: "meal-type",
          name: "Meal Option", name_ar: "نوع الطلب",
          required: true,
          type: "radio",
          options: [
            { id: "wrap-only", name: "Wrap Only", name_ar: "راب فقط", price: 0.00, default: true },
            { id: "meal", name: "Make it a Meal (+ Fries & Kinza)", name_ar: "وجبة (+ بطاطا وكنزا)", price: 1.50 }
          ]
        }
      ],
      modifiers: [
        { id: "extra-cheese", name: "Extra Cheese", name_ar: "جبنة إضافية", price: 0.40, type: "add" },
        { id: "extra-sauce", name: "Extra Sauce", name_ar: "صوص إضافي", price: 0.30, type: "add" }
      ]
    },
    {
      id: "zinger-sandwich",
      name: "Zinger Sandwich",
      category: "burgers-sandwiches",
      basePrice: 3.50,
      description: "Crispy fried chicken fillet with lettuce, cheese, and special sauce in toasted gluten-free bread.",
      name_ar: "زنجر ساندويش",
      description_ar: "فيليه دجاج مقرمش مع الخس والجبنة والصوص الخاص في توست خالٍ من الغلوتين.",
      image: "assets/images/zinger_sandwich.png",
      available: true,
      isBestSeller: false,
      isFeatured: false,
      tags: ["Gluten-Free", "Celiac Friendly"],
      ingredients: [
        { id: "gf-bread", name: "Gluten-Free Toast Bread", desc: "Toasted sliced GF bread", icon: "assets/images/ing_bun.png", removable: false },
        { id: "zinger", name: "Crispy Chicken Zinger", desc: "Crispy chicken fillet", icon: "assets/images/ing_chicken.png", removable: false },
        { id: "cheese", name: "Cheese", desc: "Melted dairy cheese", icon: "assets/images/ing_cheese.png", removable: true },
        { id: "lettuce", name: "Lettuce", desc: "Fresh lettuce", icon: "assets/images/ing_lettuce.png", removable: true },
        { id: "special-sauce", name: "Special Sauce", desc: "House sauce", icon: "assets/images/ing_sauce.png", removable: true }
      ],
      optionGroups: [
        {
          id: "flavor",
          name: "Flavor Preference", name_ar: "النكهة",
          required: true,
          type: "radio",
          options: [
            { id: "regular", name: "Regular", name_ar: "عادي", price: 0.00, default: true },
            { id: "spicy", name: "Spicy", name_ar: "حار", price: 0.00 }
          ]
        },
        {
          id: "meal-type",
          name: "Meal Option", name_ar: "نوع الطلب",
          required: true,
          type: "radio",
          options: [
            { id: "sandwich-only", name: "Sandwich Only", name_ar: "ساندويش فقط", price: 0.00, default: true },
            { id: "meal", name: "Make it a Meal (+ Fries & Kinza)", name_ar: "وجبة (+ بطاطا وكنزا)", price: 1.50 }
          ]
        }
      ],
      modifiers: [
        { id: "extra-cheese", name: "Extra Cheese", name_ar: "جبنة إضافية", price: 0.40, type: "add" },
        { id: "extra-sauce", name: "Extra Sauce", name_ar: "صوص إضافي", price: 0.30, type: "add" }
      ]
    },
    {
      id: "chicken-quesadilla",
      name: "Chicken Quesadilla",
      category: "burgers-sandwiches",
      basePrice: 5.00,
      description: "Grilled chicken with melted cheese folded inside a golden grilled gluten-free tortilla.",
      image: "assets/images/chicken_quesadilla.png",
      available: true,
      isBestSeller: false,
      isFeatured: false,
      tags: ["Gluten-Free", "Chef Special"],
      ingredients: [
        { id: "gf-tortilla", name: "Gluten-Free Tortilla", desc: "Grilled GF tortilla", icon: "assets/images/ing_bun.png", removable: false },
        { id: "chicken", name: "Grilled Chicken", desc: "Tender seasoned chicken", icon: "assets/images/ing_chicken.png", removable: false },
        { id: "cheese", name: "Melted Cheese", desc: "Rich mozzarella and cheddar blend", icon: "assets/images/ing_cheese.png", removable: true }
      ],
      optionGroups: [
        {
          id: "meal-type",
          name: "Meal Option", name_ar: "نوع الطلب",
          required: true,
          type: "radio",
          options: [
            { id: "quesadilla-only", name: "Quesadilla Only", price: 0.00, default: true },
            { id: "meal", name: "Make it a Meal (+ Fries & Kinza)", name_ar: "وجبة (+ بطاطا وكنزا)", price: 1.50 }
          ]
        }
      ],
      modifiers: [
        { id: "extra-cheese", name: "Extra Cheese", name_ar: "جبنة إضافية", price: 0.50, type: "add" }
      ]
    },
    {
      id: "zinger-box",
      name: "Zinger Box",
      category: "chicken-boxes",
      basePrice: 4.50,
      description: "Includes crispy zinger pieces, gluten-free fries, dipping sauce, and Kinza soda.",
      name_ar: "زنجر بوكس",
      description_ar: "قطع فيليه دجاج مقرمشة مع بطاطا وصوص الجبنة ومثومة.",
      image: "assets/images/zinger_box.png",
      available: true,
      isBestSeller: false,
      isFeatured: true,
      tags: ["Gluten-Free", "Full Box"],
      ingredients: [
        { id: "zinger-pcs", name: "Zinger Pieces", desc: "Crispy fried chicken tenders", icon: "assets/images/ing_chicken.png", removable: false },
        { id: "gf-fries", name: "Gluten-Free Fries", desc: "Golden fried potatoes", icon: "assets/images/ing_bun.png", removable: false },
        { id: "dip-sauce", name: "Dipping Sauce", desc: "Signature sauce cup", icon: "assets/images/ing_sauce.png", removable: true },
        { id: "kinza", name: "Kinza Soda", desc: "Chilled canned soda", icon: "assets/images/ing_bun.png", removable: false }
      ],
      optionGroups: [
        {
          id: "flavor",
          name: "Flavor Preference", name_ar: "النكهة",
          required: true,
          type: "radio",
          options: [
            { id: "regular", name: "Regular", name_ar: "عادي", price: 0.00, default: true },
            { id: "spicy", name: "Spicy", name_ar: "حار", price: 0.00 }
          ]
        }
      ],
      modifiers: [
        { id: "extra-sauce", name: "Extra Dipping Sauce", price: 0.30, type: "add" }
      ]
    },
    {
      id: "caesar-salad",
      name: "Caesar Salad",
      category: "salads",
      basePrice: 2.75,
      description: "Crisp lettuce tossed with tender grilled chicken, shaved parmesan cheese, and creamy gluten-free Caesar dressing.",
      name_ar: "سلطة سيزر",
      description_ar: "خس مقرمش مع دجاج مشوي وجبنة بارميزان وصوص سيزر الخالي من الغلوتين.",
      image: "assets/images/caesar_salad.png",
      available: true,
      isBestSeller: false,
      isFeatured: true,
      tags: ["Gluten-Free", "Fresh Daily"],
      ingredients: [
        { id: "lettuce", name: "Lettuce", desc: "Crisp romaine", icon: "assets/images/ing_lettuce.png", removable: false },
        { id: "grilled-chicken", name: "Grilled Chicken", desc: "Sliced grilled chicken breast", icon: "assets/images/ing_chicken.png", removable: true },
        { id: "parmesan", name: "Parmesan Cheese", desc: "Aged parmesan shavings", icon: "assets/images/ing_cheese.png", removable: true },
        { id: "caesar-dressing", name: "Caesar Dressing", desc: "Gluten-free dressing", icon: "assets/images/ing_sauce.png", removable: true }
      ],
      optionGroups: [],
      modifiers: [
        { id: "extra-chicken", name: "Extra Grilled Chicken", price: 1.00, type: "add" },
        { id: "extra-dressing", name: "Extra Caesar Dressing", price: 0.30, type: "add" }
      ]
    },
    {
      id: "greek-salad",
      name: "Greek Salad",
      category: "salads",
      basePrice: 2.75,
      description: "Fresh cucumber, tomato, feta cheese, kalamata olives, red onion, and house herb vinaigrette.",
      name_ar: "سلطة يونانية",
      description_ar: "خس، خيار، بندورة، زيتون أسود، وجبنة فيتا مع صوص الليمون والزيت.",
      image: "assets/images/greek_salad.svg",
      available: true,
      isBestSeller: false,
      isFeatured: false,
      tags: ["Gluten-Free", "Vegetarian"],
      ingredients: [
        { id: "cucumber", name: "Cucumber", desc: "Fresh sliced cucumber", icon: "assets/images/ing_lettuce.png", removable: true },
        { id: "tomato", name: "Tomato", desc: "Ripe diced tomato", icon: "assets/images/ing_tomato.png", removable: true },
        { id: "feta", name: "Feta Cheese", desc: "Authentic creamy feta cubes", icon: "assets/images/ing_cheese.png", removable: true },
        { id: "olives", name: "Olives", desc: "Kalamata black olives", icon: "assets/images/ing_sauce.png", removable: true },
        { id: "red-onion", name: "Red Onion", desc: "Crisp sliced red onion", icon: "assets/images/ing_lettuce.png", removable: true },
        { id: "special-dressing", name: "Special Dressing", desc: "Herb olive oil vinaigrette", icon: "assets/images/ing_sauce.png", removable: true }
      ],
      optionGroups: [],
      modifiers: [
        { id: "extra-feta", name: "Extra Feta Cheese", price: 0.50, type: "add" }
      ]
    },
    {
      id: "broasted-4",
      name: "Broasted 4 Pieces",
      category: "broasted",
      basePrice: 5.50,
      description: "4 crispy gluten-free chicken pieces, fries for 1 person, and Kinza soda.",
      image: "assets/images/broasted.svg",
      available: true,
      isBestSeller: false,
      isFeatured: false,
      tags: ["Gluten-Free", "Crispy & Juicy"],
      ingredients: [
        { id: "chk-4", name: "4 Chicken Pieces", desc: "Fresh fried crispy pieces", icon: "assets/images/ing_chicken.png", removable: false },
        { id: "fries-1", name: "Fries (1 Person)", desc: "Gluten-free golden fries", icon: "assets/images/ing_bun.png", removable: false },
        { id: "kinza-1", name: "Kinza Soda", desc: "1 Kinza can", icon: "assets/images/ing_bun.png", removable: false }
      ],
      optionGroups: [
        {
          id: "flavor",
          name: "Flavor Preference", name_ar: "النكهة",
          required: true,
          type: "radio",
          options: [
            { id: "regular", name: "Regular", name_ar: "عادي", price: 0.00, default: true },
            { id: "spicy", name: "Spicy", name_ar: "حار", price: 0.00 }
          ]
        }
      ],
      modifiers: [
        { id: "extra-garlic-sauce", name: "Garlic Dip Sauce", price: 0.30, type: "add" }
      ]
    },
    {
      id: "broasted-8",
      name: "Broasted 8 Pieces",
      category: "broasted",
      basePrice: 10.00,
      description: "8 crispy gluten-free chicken pieces, fries for 2 people, and 2 Kinza sodas.",
      image: "assets/images/broasted.svg",
      available: true,
      isBestSeller: false,
      isFeatured: false,
      tags: ["Gluten-Free", "Sharing"],
      ingredients: [
        { id: "chk-8", name: "8 Chicken Pieces", desc: "Fresh fried crispy pieces", icon: "assets/images/ing_chicken.png", removable: false },
        { id: "fries-2", name: "Fries (2 People)", desc: "Gluten-free golden fries", icon: "assets/images/ing_bun.png", removable: false },
        { id: "kinza-2", name: "2 Kinza Sodas", desc: "2 Kinza cans", icon: "assets/images/ing_bun.png", removable: false }
      ],
      optionGroups: [
        {
          id: "flavor",
          name: "Flavor Preference", name_ar: "النكهة",
          required: true,
          type: "radio",
          options: [
            { id: "regular", name: "Regular", name_ar: "عادي", price: 0.00, default: true },
            { id: "spicy", name: "Spicy", name_ar: "حار", price: 0.00 }
          ]
        }
      ],
      modifiers: [
        { id: "extra-garlic-sauce", name: "Garlic Dip Sauce", price: 0.30, type: "add" }
      ]
    },
    {
      id: "broasted-16",
      name: "Broasted 16 Pieces",
      category: "broasted",
      basePrice: 13.50,
      description: "16 crispy gluten-free chicken pieces, large fries portion, and 1 Liter Kinza bottle.",
      image: "assets/images/broasted.svg",
      available: true,
      isBestSeller: false,
      isFeatured: false,
      tags: ["Gluten-Free", "Family Feast"],
      ingredients: [
        { id: "chk-16", name: "16 Chicken Pieces", desc: "Fresh fried crispy pieces", icon: "assets/images/ing_chicken.png", removable: false },
        { id: "fries-lg", name: "Large Fries", desc: "Family-sized GF fries", icon: "assets/images/ing_bun.png", removable: false },
        { id: "kinza-1l", name: "1 Liter Kinza", desc: "Chilled 1L bottle", icon: "assets/images/ing_bun.png", removable: false }
      ],
      optionGroups: [
        {
          id: "flavor",
          name: "Flavor Preference", name_ar: "النكهة",
          required: true,
          type: "radio",
          options: [
            { id: "regular", name: "Regular", name_ar: "عادي", price: 0.00, default: true },
            { id: "spicy", name: "Spicy", name_ar: "حار", price: 0.00 }
          ]
        }
      ],
      modifiers: [
        { id: "extra-garlic-sauce", name: "Garlic Dip Sauce", price: 0.30, type: "add" }
      ]
    },
    {
      id: "broasted-20",
      name: "Broasted 20 Pieces",
      category: "broasted",
      basePrice: 19.00,
      description: "20 crispy gluten-free chicken pieces, extra large fries portion, and 2 Liters Kinza.",
      image: "assets/images/broasted.svg",
      available: true,
      isBestSeller: false,
      isFeatured: false,
      tags: ["Gluten-Free", "Party Size"],
      ingredients: [
        { id: "chk-20", name: "20 Chicken Pieces", desc: "Fresh fried crispy pieces", icon: "assets/images/ing_chicken.png", removable: false },
        { id: "fries-xlg", name: "Extra Large Fries", desc: "Party-sized GF fries", icon: "assets/images/ing_bun.png", removable: false },
        { id: "kinza-2l", name: "2 Liters Kinza", desc: "Chilled 2L bottle", icon: "assets/images/ing_bun.png", removable: false }
      ],
      optionGroups: [
        {
          id: "flavor",
          name: "Flavor Preference", name_ar: "النكهة",
          required: true,
          type: "radio",
          options: [
            { id: "regular", name: "Regular", name_ar: "عادي", price: 0.00, default: true },
            { id: "spicy", name: "Spicy", name_ar: "حار", price: 0.00 }
          ]
        }
      ],
      modifiers: [
        { id: "extra-garlic-sauce", name: "Garlic Dip Sauce", price: 0.30, type: "add" }
      ]
    },
    {
      id: "mandi",
      name: "Mandi",
      category: "main-dishes",
      basePrice: 8.00,
      isPreOrder24h: true,
      preOrderNotice: "⚠️ 24-HOUR PRE-ORDER: Please order at least 24 hours in advance. Minimum order: 1 chicken.",
      description: "Fragrant spiced rice with roasted chicken and fresh daqoos. Daqoos quantity increases automatically with chicken quantity.",
      image: "assets/images/mandi.svg",
      available: true,
      isBestSeller: false,
      isFeatured: false,
      tags: ["24h Pre-Order", "100% Gluten-Free"],
      ingredients: [
        { id: "rice", name: "Fragrant Mandi Rice", desc: "Spiced basmati rice", icon: "assets/images/ing_bun.png", removable: false },
        { id: "roasted-chicken", name: "Roasted Chicken", desc: "Tender spiced chicken", icon: "assets/images/ing_chicken.png", removable: false },
        { id: "daqoos", name: "Daqoos Sauce", desc: "Fresh tomato chili sauce", icon: "assets/images/ing_sauce.png", removable: true }
      ],
      optionGroups: [
        {
          id: "chicken-qty",
          name: "Chicken Quantity (Required)",
          required: true,
          type: "radio",
          options: [
            { id: "1-chk", name: "1 Chicken (Base) + 1 Daqoos", price: 0.00, default: true },
            { id: "1.5-chk", name: "1.5 Chickens + 2 Daqoos", price: 4.00 },
            { id: "2-chk", name: "2 Chickens + 2 Daqoos", price: 8.00 },
            { id: "3-chk", name: "3 Chickens + 3 Daqoos", price: 16.00 },
            { id: "4-chk", name: "4 Chickens + 4 Daqoos", price: 24.00 }
          ]
        }
      ],
      modifiers: [
        { id: "extra-daqoos", name: "Extra Daqoos Sauce", price: 0.50, type: "add" }
      ]
    },
    {
      id: "zurbian",
      name: "Zurbian",
      category: "main-dishes",
      basePrice: 9.00,
      isPreOrder24h: true,
      preOrderNotice: "⚠️ 24-HOUR PRE-ORDER: Please order at least 24 hours in advance. Minimum order: 1 chicken.",
      description: "Aromatic spiced rice, chicken, golden potato pieces, caramelized onions, and fresh daqoos.",
      image: "assets/images/zurbian.svg",
      available: true,
      isBestSeller: false,
      isFeatured: false,
      tags: ["24h Pre-Order", "Traditional Recipe"],
      ingredients: [
        { id: "rice", name: "Spiced Zurbian Rice", desc: "Rich fragrant rice", icon: "assets/images/ing_bun.png", removable: false },
        { id: "chicken", name: "Chicken", desc: "Slow-cooked spiced chicken", icon: "assets/images/ing_chicken.png", removable: false },
        { id: "potato", name: "Potato Pieces", desc: "Golden spiced potatoes", icon: "assets/images/ing_bun.png", removable: true },
        { id: "onion", name: "Onion Pieces", desc: "Caramelized onions", icon: "assets/images/ing_lettuce.png", removable: true },
        { id: "daqoos", name: "Daqoos Sauce", desc: "Fresh spicy tomato dip", icon: "assets/images/ing_sauce.png", removable: true }
      ],
      optionGroups: [
        {
          id: "chicken-qty",
          name: "Chicken Quantity (Required)",
          required: true,
          type: "radio",
          options: [
            { id: "1-chk", name: "1 Chicken (Base) + 1 Daqoos", price: 0.00, default: true },
            { id: "1.5-chk", name: "1.5 Chickens + 2 Daqoos", price: 4.50 },
            { id: "2-chk", name: "2 Chickens + 2 Daqoos", price: 9.00 },
            { id: "3-chk", name: "3 Chickens + 3 Daqoos", price: 18.00 },
            { id: "4-chk", name: "4 Chickens + 4 Daqoos", price: 27.00 }
          ]
        }
      ],
      modifiers: [
        { id: "extra-daqoos", name: "Extra Daqoos Sauce", price: 0.50, type: "add" }
      ]
    },
    {
      id: "kabsa",
      name: "Kabsa",
      category: "main-dishes",
      basePrice: 8.00,
      isPreOrder24h: true,
      preOrderNotice: "⚠️ 24-HOUR PRE-ORDER: Please order at least 24 hours in advance. Minimum order: 1 chicken.",
      description: "Authentic spiced rice with roasted chicken, rich Kabsa spices, and daqoos.",
      image: "assets/images/kabsa.svg",
      available: true,
      isBestSeller: false,
      isFeatured: false,
      tags: ["24h Pre-Order", "Authentic Spices"],
      ingredients: [
        { id: "rice", name: "Kabsa Spiced Rice", desc: "Savory basmati rice", icon: "assets/images/ing_bun.png", removable: false },
        { id: "chicken", name: "Roasted Chicken", desc: "Tender roasted chicken", icon: "assets/images/ing_chicken.png", removable: false },
        { id: "daqoos", name: "Daqoos Sauce", desc: "Fresh tomato daqoos", icon: "assets/images/ing_sauce.png", removable: true }
      ],
      optionGroups: [
        {
          id: "chicken-qty",
          name: "Chicken Quantity (Required)",
          required: true,
          type: "radio",
          options: [
            { id: "1-chk", name: "1 Chicken (Base) + 1 Daqoos", price: 0.00, default: true },
            { id: "1.5-chk", name: "1.5 Chickens + 2 Daqoos", price: 4.00 },
            { id: "2-chk", name: "2 Chickens + 2 Daqoos", price: 8.00 },
            { id: "3-chk", name: "3 Chickens + 3 Daqoos", price: 16.00 },
            { id: "4-chk", name: "4 Chickens + 4 Daqoos", price: 24.00 }
          ]
        }
      ],
      modifiers: [
        { id: "extra-daqoos", name: "Extra Daqoos Sauce", price: 0.50, type: "add" }
      ]
    },
    {
      id: "uzbekian",
      name: "Uzbekian",
      category: "main-dishes",
      basePrice: 9.00,
      isPreOrder24h: true,
      preOrderNotice: "⚠️ 24-HOUR PRE-ORDER: Please order at least 24 hours in advance. Minimum: 1 chicken or 1 KG meat.",
      description: "Spiced rice with carrots, raisins, chickpeas, and choice of Chicken or Tender Meat.",
      image: "assets/images/uzbekian.svg",
      available: true,
      isBestSeller: false,
      isFeatured: false,
      tags: ["24h Pre-Order", "Specialty Dish"],
      ingredients: [
        { id: "rice", name: "Spiced Rice", desc: "Aromatic pilaf rice", icon: "assets/images/ing_bun.png", removable: false },
        { id: "carrots", name: "Carrots", desc: "Sweet julienned carrots", icon: "assets/images/ing_tomato.png", removable: true },
        { id: "raisins", name: "Raisins", desc: "Plump sweet raisins", icon: "assets/images/ing_sauce.png", removable: true },
        { id: "chickpeas", name: "Chickpeas", desc: "Tender garbanzo beans", icon: "assets/images/ing_bun.png", removable: true }
      ],
      optionGroups: [
        {
          id: "meat-selection",
          name: "Dish Protein & Weight (Required)",
          required: true,
          type: "radio",
          options: [
            { id: "chk-1", name: "Chicken (1 Chicken Base) — 9.00 JOD", price: 0.00, default: true },
            { id: "chk-2", name: "Chicken (2 Chickens) — 18.00 JOD", price: 9.00 },
            { id: "chk-3", name: "Chicken (3 Chickens) — 27.00 JOD", price: 18.00 },
            { id: "chk-4", name: "Chicken (4 Chickens) — 36.00 JOD", price: 27.00 },
            { id: "meat-1kg", name: "Tender Meat (1 KG Base) — 15.00 JOD", price: 6.00 },
            { id: "meat-2kg", name: "Tender Meat (2 KG) — 30.00 JOD", price: 21.00 }
          ]
        }
      ],
      modifiers: [
        { id: "extra-chickpeas", name: "Extra Chickpeas & Raisins", price: 0.75, type: "add" }
      ]
    },
    {
      id: "soft-drinks",
      name: "Soft Drinks (Kinza)",
      category: "drinks-extras",
      basePrice: 0.50,
      description: "Refreshing chilled soft drink can (Kinza Cola, Citrus, Orange, Diet).",
      image: "assets/images/kinza.svg",
      available: true,
      isBestSeller: false,
      isFeatured: false,
      tags: ["Gluten-Free", "Chilled"],
      ingredients: [],
      optionGroups: [
        {
          id: "flavor",
          name: "Choose Flavor",
          required: true,
          type: "radio",
          options: [
            { id: "kinza-cola", name: "Kinza Cola", price: 0.00, default: true },
            { id: "kinza-citrus", name: "Kinza Citrus", price: 0.00 },
            { id: "kinza-orange", name: "Kinza Orange", price: 0.00 },
            { id: "kinza-diet", name: "Kinza Diet Cola", price: 0.00 }
          ]
        }
      ],
      modifiers: []
    },
    {
      id: "mineral-water",
      name: "Mineral Water",
      category: "drinks-extras",
      basePrice: 0.50,
      description: "Pure bottled mineral water (500ml).",
      name_ar: "ماء",
      description_ar: "مياه معدنية طبيعية (500 مل).",
      image: "assets/images/water.svg",
      available: true,
      isBestSeller: false,
      isFeatured: false,
      tags: ["Pure", "Chilled"],
      ingredients: [],
      optionGroups: [],
      modifiers: []
    }
  ],

  homeContent: {
    heroBadge: "100% GLUTEN-FREE",
    heroBadge_ar: "100% خالٍ من الغلوتين",
    heroTitle: "GLUTEN-FREE",
    heroTitle_ar: "خالٍ من الغلوتين",
    heroSubtitle: "Safe food. Made with love.",
    heroSubtitle_ar: "أكل آمن. محضر بحب.",
    heroDescription: "All our food is gluten-free and loved by families.",
    heroDescription_ar: "كل أكلنا خالٍ من الغلوتين ومفضل للعائلات.",
    heroCtaText: "Explore Menu",
    heroCtaText_ar: "تصفح المنيو",
    heroSecondaryCta: "Order via WhatsApp",
    heroSecondaryCta_ar: "اطلب عبر واتساب",
    promiseSubtitle: "OUR PROMISE",
    promiseSubtitle_ar: "وعدنا لك",
    promiseTitle: "Good food should feel good.",
    promiseTitle_ar: "الأكل الطيب لازم يخليك مرتاح.",
    promiseText: "At Moe’s PureBite, we serve 100% gluten-free food made with extra care for your health and happiness.",
    promiseText_ar: "في Moe’s PureBite بنقدم أكل خالٍ 100% من الغلوتين ومحضر بعناية تامة عشان صحتك وسعادتك.",
    promiseCta: "Learn More About Us",
    promiseCta_ar: "اكتشف المزيد عنا",
    favoritesTitle: "CUSTOMER FAVORITES",
    favoritesTitle_ar: "الأطباق المفضلة"
  },

  aboutContent: {
    heroTitle: "Our Passion, Your Well-Being",
    heroTitle_ar: "شغفنا، راحتك",
    heroSubtitle: "At Moe’s PureBite, we believe good food should be safe, healthy, and made with love.",
    heroSubtitle_ar: "في Moe’s PureBite، نؤمن أن الأكل الطيب لازم يكون آمن وصحي ومحضر بحب.",
    storyTag: "Who We Are",
    storyTag_ar: "من نحن",
    storyTitle: "Jordan’s First Dedicated Gluten-Free Cloud Kitchen",
    storyTitle_ar: "أول مطبخ سحابي مختص وخالٍ من الغلوتين في الأردن",
    storyText: "Moe’s PureBite Kitchen is Jordan’s first dedicated gluten-free cloud kitchen, created to make delicious gluten-free food more accessible, convenient, and enjoyable.\n\nWe are 100% delivery and pickup—no dining area, no tables. Our kitchen is dedicated to preparing gluten-free meals for you to enjoy wherever you choose.\n\nOur menu brings together everyday favorites like burgers, shawarma, crispy chicken, wraps, and salads, alongside our special Tawasi meals, including Mandi, Zarb, and Uzbek-style rice dishes—all prepared gluten-free.\n\nWe carefully select our ingredients and follow strict preparation practices with particular attention to preventing gluten cross-contact. Because for people with celiac disease, eating gluten-free isn’t simply a lifestyle choice—it’s essential.\n\nAt Moe’s PureBite, we believe gluten-free should never mean missing out on the food you love.\n\nPure taste. Gluten-free confidence.",
    storyText_ar: "مطبخ Moe’s PureBite هو أول مطبخ سحابي في الأردن مخصص بالكامل لتقديم أكل خالٍ من الغلوتين، هدفنا نوفر أكل لذيذ، صحي، ومريح للجميع.\n\nنحن مطبخ سحابي بنسبة 100% (توصيل واستلام فقط - لا توجد صالة طعام). مطبخنا مجهز بالكامل لتحضير وجبات خالية من الغلوتين تقدر تستمتع فيها بأي مكان.\n\nمنيونا بيجمع بين الأكلات اليومية المفضلة زي البرجر، الدجاج المقرمش، الراب، والسلطات، بالإضافة لوجبات التواصي المميزة زي المندي والزربيان – كلها محضرة بدون غلوتين.\n\nبنختار مكوناتنا بعناية وبنلتزم بمعايير صارمة جداً لمنع أي تلوث تبادلي بالغلوتين. لأننا بنعرف إنه لمرضى السيلياك، الأكل الخالي من الغلوتين مش مجرد خيار، بل ضرورة.\n\nفي Moe’s PureBite، نؤمن إنه الأكل الخالي من الغلوتين ما بيعني أبداً إنك تنحرم من الأكل اللي بتحبه.\n\nطعم أصيل.. وثقة تامة.",
    valuesTitle: "Our Purpose",
    valuesTitle_ar: "هدفنا",
    values: [
      { id: "mission", title: "Our Mission", title_ar: "رسالتنا", desc: "To make gluten-free food something people look forward to—not something they have to settle for. At Moe’s PureBite Kitchen, we prepare delicious, satisfying meals with carefully selected gluten-free ingredients and strict attention to safe preparation, so our customers can eat with confidence and enjoy every bite.", desc_ar: "إننا نخلي الأكل الخالي من الغلوتين إشي الناس تستناه وتستمتع فيه، مش بس بديل يرضوا فيه. في مطبخنا، بنحضر وجبات لذيذة ومميزة بمكونات خالية من الغلوتين مختارة بعناية مع اهتمام شديد بالتحضير الآمن، عشان عملاؤنا يقدروا ياكلوا بثقة ويستمتعوا بكل لقمة." },
      { id: "vision", title: "Our Vision", title_ar: "رؤيتنا", desc: "To become Jordan’s most trusted gluten-free kitchen, setting a new standard for great taste, food safety, and reliability—and proving that living gluten-free should never mean compromising on the food you love.", desc_ar: "نطمح نكون المطبخ الخالي من الغلوتين الأكثر ثقة في الأردن، ونحط معيار جديد للطعم الرائع وسلامة الأكل والموثوقية - ونثبت للجميع إنه الأكل بدون غلوتين ما بيعني إنك تتنازل عن الأكلات اللي بتحبها." }
    ],
    closingCardTitle: "Good food should feel good.",
    closingCardTitle_ar: "الأكل الطيب لازم يخليك مرتاح.",
    closingCardText: "Thank you for being part of the Moe's PureBite family. 🧡",
    closingCardText_ar: "شكراً لكونك جزء من عائلة Moe's PureBite 🧡"
  },

  orderHandoffs: []
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEFAULT_DATA };
}
