const fs = require('fs');
const products = JSON.parse(fs.readFileSync('C:/Users/abdal/.gemini/antigravity-ide/brain/6a850fc2-2edc-4271-814f-dcc17882a4ed/scratch/live_products.json', 'utf-8'));

const nameDict = {
  'Chicken Quesadilla': 'كساديا دجاج',
  'Broasted 4 Pieces': 'بروستد 4 قطع',
  'Broasted 8 Pieces': 'بروستد 8 قطع',
  'Broasted 16 Pieces': 'بروستد 16 قطعة',
  'Broasted 20 Pieces': 'بروستد 20 قطعة',
  'Mandi': 'مندي',
  'Zurbian': 'زربيان',
  'Kabsa': 'كبسة',
  'Uzbekian': 'أوزبكي',
  'Soft Drinks (Kinza)': 'مشروبات غازية (كينزا)',
  'Fries (1 Person)': 'بطاطا (شخص واحد)',
  'Fries (2 People)': 'بطاطا (شخصين)',
  'Large Fries': 'بطاطا حجم كبير',
  'Extra Large Fries': 'بطاطا حجم عائلي'
};

const descDict = {
  'Chicken Quesadilla': {
    en: "Grilled chicken with melted cheese folded inside a golden grilled gluten-free tortilla.",
    ar: "دجاج مشوي مع جبنة ذائبة داخل خبز تورتيلا خالي من الغلوتين محمص للون الذهبي."
  },
  'Broasted 4 Pieces': {
    en: "4 pieces of crispy gluten-free broasted chicken, served with fries, garlic dip, and Kinza soda.",
    ar: "4 قطع بروستد دجاج مقرمش خالي من الغلوتين، يقدم مع البطاطا، المثومة، ومشروب كينزا."
  },
  'Broasted 8 Pieces': {
    en: "8 pieces of crispy gluten-free broasted chicken, served with fries for two, garlic dip, and 2 Kinza sodas.",
    ar: "8 قطع بروستد دجاج مقرمش خالي من الغلوتين، يقدم مع بطاطا لشخصين، المثومة، وعلبتين كينزا."
  },
  'Broasted 16 Pieces': {
    en: "16 pieces of crispy gluten-free broasted chicken, served with family fries, garlic dip, and a 1-liter Kinza.",
    ar: "16 قطعة بروستد دجاج مقرمش خالي من الغلوتين، يقدم مع بطاطا حجم عائلي، المثومة، وكينزا 1 لتر."
  },
  'Broasted 20 Pieces': {
    en: "20 pieces of crispy gluten-free broasted chicken, served with extra large fries, garlic dip, and a 2-liter Kinza.",
    ar: "20 قطعة بروستد دجاج مقرمش خالي من الغلوتين، يقدم مع بطاطا حجم عائلي كبير، المثومة، وكينزا 2 لتر."
  },
  'Mandi': {
    en: "Traditional Mandi with tender roasted chicken and fragrant spiced rice, served with fresh Daqoos.",
    ar: "مندي تقليدي مع دجاج محمر طري وأرز مبهر غني بالنكهات، يقدم مع صلصة الدقوس الطازجة."
  },
  'Zurbian': {
    en: "Rich and flavorful Zurbian rice cooked with tender spiced chicken, potatoes, and caramelized onions.",
    ar: "أرز زربيان غني بالنكهات مطبوخ مع الدجاج المبهر، قطع البطاطا، والبصل المكرمل."
  },
  'Kabsa': {
    en: "Classic Kabsa with savory spiced basmati rice and roasted chicken, served with Daqoos.",
    ar: "كبسة أصيلة مع أرز بسمتي مبهر ودجاج محمر طري، تقدم مع صلصة الدقوس."
  },
  'Uzbekian': {
    en: "Authentic Uzbekian pilaf rice cooked with tender meat, sweet carrots, raisins, and chickpeas.",
    ar: "أرز أوزبكي أصيل مطبوخ مع اللحم الطري، الجزر الحلو، الزبيب، وحبات الحمص."
  },
  'Soft Drinks (Kinza)': {
    en: "Refreshing Kinza sodas available in various flavors.",
    ar: "مشروبات كينزا الغازية المنعشة متوفرة بعدة نكهات."
  }
};

let sql = '-- ==========================================\n-- Supabase Automatic Arabic Translation Patch (FINAL V3)\n-- ==========================================\n\n';

products.forEach(p => {
  let changed = false;
  
  if (nameDict[p.name]) { p.name_ar = nameDict[p.name]; changed = true; }
  
  if (descDict[p.name]) {
    p.description = descDict[p.name].en;
    p.description_ar = descDict[p.name].ar;
    changed = true;
  } else if (p.description && !p.description_ar) {
    // If it has english desc but no arabic, we should flag it (handled in V1 actually)
  }
  
  if (changed) {
    const esc = str => str ? "'" + str.replace(/'/g, "''") + "'" : 'NULL';
    
    // We update name_ar, description, and description_ar
    sql += `UPDATE public.products SET 
  name_ar = ${esc(p.name_ar)},
  description = ${esc(p.description)},
  description_ar = ${esc(p.description_ar)}
WHERE id = '${p.id}';\n\n`;
  }
});

fs.writeFileSync('update_arabic.sql', sql);
console.log('SQL generated: update_arabic.sql');
