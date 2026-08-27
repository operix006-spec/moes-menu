const fs = require('fs');
const products = JSON.parse(fs.readFileSync('C:/Users/abdal/.gemini/antigravity-ide/brain/6a850fc2-2edc-4271-814f-dcc17882a4ed/scratch/live_products.json', 'utf-8'));

const dict = {
  // Option Groups & Options
  'Make it a Meal': 'اجعلها وجبة',
  'Sandwich Only': 'ساندويش فقط',
  'Full Meal (+ Fries & Kinza Drink)': 'وجبة كاملة (+ بطاطا ومشروب كينزا)',
  'Flavor Preference': 'النكهة المفضلة',
  'Regular': 'عادي',
  'Spicy': 'حار',
  'Meal Option': 'نوع الطلب',
  'Make it a Meal (+ Fries & Kinza)': 'وجبة كاملة (+ بطاطا ومشروب كينزا)',
  'Quesadilla Only': 'كساديا فقط',
  'Wrap Only': 'راب فقط',
  'Chicken Quantity (Required)': 'كمية الدجاج (مطلوب)',
  '1 Chicken (Base) + 1 Daqoos': 'دجاجة واحدة + 1 دقوس',
  '1.5 Chickens + 2 Daqoos': 'دجاجة ونصف + 2 دقوس',
  '2 Chickens + 2 Daqoos': 'دجاجتين + 2 دقوس',
  '3 Chickens + 3 Daqoos': '3 دجاجات + 3 دقوس',
  '4 Chickens + 4 Daqoos': '4 دجاجات + 4 دقوس',
  'Dish Protein & Weight (Required)': 'نوع اللحم والكمية (مطلوب)',
  'Chicken (1 Chicken Base) — 9.00 JOD': 'دجاج (دجاجة واحدة) — 9.00 دينار',
  'Chicken (2 Chickens) — 18.00 JOD': 'دجاج (دجاجتين) — 18.00 دينار',
  'Chicken (3 Chickens) — 27.00 JOD': 'دجاج (3 دجاجات) — 27.00 دينار',
  'Chicken (4 Chickens) — 36.00 JOD': 'دجاج (4 دجاجات) — 36.00 دينار',
  'Tender Meat (1 KG Base) — 15.00 JOD': 'لحم طازج (1 كيلو) — 15.00 دينار',
  'Tender Meat (2 KG) — 30.00 JOD': 'لحم طازج (2 كيلو) — 30.00 دينار',
  'Choose Flavor': 'اختر النكهة',
  'Kinza Cola': 'كينزا كولا',
  'Kinza Citrus': 'كينزا حمضيات',
  'Kinza Orange': 'كينزا برتقال',
  'Kinza Diet Cola': 'كينزا دايت كولا',

  // Modifiers
  'Extra Cheese': 'جبنة إضافية',
  'Extra Special Sauce': 'صوص خاص إضافي',
  'Extra Sauce': 'صوص إضافي',
  'Extra Chicken Fillet': 'فيليه دجاج إضافي',
  'Extra Feta Cheese': 'جبنة فيتا إضافية',
  'Garlic Dip Sauce': 'مثومة إضافية',
  'Extra Daqoos Sauce': 'دقوس إضافي',
  'Extra Chickpeas & Raisins': 'حمص وزبيب إضافي',
  'Extra Dipping Sauce': 'صوص تغميس إضافي',
  'Extra Grilled Chicken': 'دجاج مشوي إضافي',
  'Extra Caesar Dressing': 'صوص سيزر إضافي',

  // Ingredients
  'Gluten-Free Bun': 'خبز برجر خالي من الغلوتين',
  'Crispy Chicken Fillet': 'فيليه دجاج مقرمش',
  'Lettuce': 'خس',
  'Cheese': 'جبنة',
  'Tomato': 'طماطم',
  'Special Sauce': 'صوص خاص',
  'Gluten-Free Toast Bread': 'خبز توست خالي من الغلوتين',
  'Crispy Chicken Zinger': 'زنجر دجاج مقرمش',
  'Gluten-Free Tortilla': 'خبز تورتيلا خالي من الغلوتين',
  'Grilled Chicken': 'دجاج مشوي',
  'Melted Cheese': 'جبنة ذائبة',
  '8 Chicken Pieces': '8 قطع دجاج',
  'Fries (2 People)': 'بطاطا (شخصين)',
  '2 Kinza Sodas': 'علبتين كينزا',
  '16 Chicken Pieces': '16 قطعة دجاج',
  'Large Fries': 'بطاطا حجم كبير',
  '1 Liter Kinza': 'كينزا 1 لتر',
  '20 Chicken Pieces': '20 قطعة دجاج',
  'Extra Large Fries': 'بطاطا حجم عائلي',
  'Cucumber': 'خيار',
  'Feta Cheese': 'جبنة فيتا',
  'Olives': 'زيتون',
  'Red Onion': 'بصل أحمر',
  'Special Dressing': 'تتبيلة خاصة',
  '4 Chicken Pieces': '4 قطع دجاج',
  'Fries (1 Person)': 'بطاطا (شخص واحد)',
  'Kinza Soda': 'مشروب كينزا',
  'Fragrant Mandi Rice': 'أرز مندي',
  'Roasted Chicken': 'دجاج محمر',
  'Daqoos Sauce': 'صلصة الدقوس',
  'Spiced Zurbian Rice': 'أرز زربيان مبهر',
  'Chicken': 'دجاج',
  'Potato Pieces': 'قطع بطاطا',
  'Onion Pieces': 'قطع بصل',
  'Kabsa Spiced Rice': 'أرز كبسة',
  'Spiced Rice': 'أرز مبهر',
  'Carrots': 'جزر',
  'Raisins': 'زبيب',
  'Chickpeas': 'حمص',
  'Gluten-Free Wrap': 'راب خالي من الغلوتين',
  'Zinger Pieces': 'قطع زنجر',
  'Gluten-Free Fries': 'بطاطا خالية من الغلوتين',
  'Dipping Sauce': 'صوص التغميس',
  'Parmesan Cheese': 'جبنة بارميزان',
  'Caesar Dressing': 'صوص سيزر'
};

let sql = '-- ==========================================\n-- Supabase Automatic Arabic Translation Patch (V2)\n-- ==========================================\n\n';

products.forEach(p => {
  let changed = false;
  
  if (p.optionGroups) {
    p.optionGroups.forEach(og => {
      if (!og.name_ar && dict[og.name]) { og.name_ar = dict[og.name]; changed = true; }
      if (og.options) {
        og.options.forEach(opt => {
          if (!opt.name_ar && dict[opt.name]) { opt.name_ar = dict[opt.name]; changed = true; }
        });
      }
    });
  }
  
  if (p.modifiers) {
    p.modifiers.forEach(m => {
      if (!m.name_ar && dict[m.name]) { m.name_ar = dict[m.name]; changed = true; }
    });
  }
  
  if (p.ingredients) {
    p.ingredients.forEach(i => {
      if (!i.name_ar && dict[i.name]) { i.name_ar = dict[i.name]; changed = true; }
    });
  }
  
  if (changed) {
    const esc = str => str ? "'" + str.replace(/'/g, "''") + "'" : 'NULL';
    const optGrpStr = JSON.stringify(p.optionGroups || []).replace(/'/g, "''");
    const modStr = JSON.stringify(p.modifiers || []).replace(/'/g, "''");
    const ingStr = JSON.stringify(p.ingredients || []).replace(/'/g, "''");
    
    // We only update optionGroups, modifiers, ingredients here since names/desc were done in V1
    // (If they are empty they remain empty, but we update the jsonb fields)
    sql += `UPDATE public.products SET 
  "optionGroups" = '${optGrpStr}'::jsonb,
  modifiers = '${modStr}'::jsonb,
  ingredients = '${ingStr}'::jsonb
WHERE id = '${p.id}';\n\n`;
  }
});

fs.writeFileSync('update_arabic.sql', sql);
console.log('SQL generated: update_arabic.sql');
