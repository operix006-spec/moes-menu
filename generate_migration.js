const fs = require('fs');
const path = require('path');

// Read the data.js file
let dataContent = fs.readFileSync(path.join(__dirname, 'assets/js/data.js'), 'utf8');

// Mock a browser environment to safely eval the file
const script = `
  ${dataContent}
  return DEFAULT_DATA;
`;

const data = new Function(script)();

// Function to escape SQL strings
const escapeSql = (str) => {
  if (str === null || str === undefined) return 'NULL';
  if (typeof str === 'boolean') return str ? 'true' : 'false';
  if (typeof str === 'object') return `'${JSON.stringify(str).replace(/'/g, "''")}'::jsonb`;
  if (typeof str === 'number') return str;
  return `'${String(str).replace(/'/g, "''")}'`;
};

let sql = `-- =================================================================================
-- Moe's PureBite - Supabase Data Migration
-- Instructions: Copy and run this script in your Supabase SQL Editor AFTER the schema script.
-- =================================================================================\n\n`;

// 1. Categories
sql += `-- Categories\n`;
data.categories.forEach(cat => {
  sql += `INSERT INTO public.categories (id, name, name_ar, icon, "order", enabled) VALUES (${escapeSql(cat.id)}, ${escapeSql(cat.name)}, ${escapeSql(cat.name_ar)}, ${escapeSql(cat.icon)}, ${cat.order || 0}, ${escapeSql(cat.enabled !== false)});\n`;
});
sql += `\n`;

// 2. Products
sql += `-- Products\n`;
data.products.forEach(p => {
  sql += `INSERT INTO public.products (id, category, name, name_ar, description, description_ar, "basePrice", image, available, "isBestSeller", "isFeatured", "isPreOrder24h", "optionGroups", modifiers, ingredients) VALUES (
    ${escapeSql(p.id)}, 
    ${escapeSql(p.category)}, 
    ${escapeSql(p.name)}, 
    ${escapeSql(p.name_ar)}, 
    ${escapeSql(p.description)}, 
    ${escapeSql(p.description_ar)}, 
    ${p.basePrice || 0}, 
    ${escapeSql(p.image)}, 
    ${escapeSql(p.available !== false)}, 
    ${escapeSql(p.isBestSeller)}, 
    ${escapeSql(p.isFeatured)}, 
    ${escapeSql(p.isPreOrder24h)}, 
    ${escapeSql(p.optionGroups)}, 
    ${escapeSql(p.modifiers)}, 
    ${escapeSql(p.ingredients)}
  );\n`;
});
sql += `\n`;

// 3. Settings
sql += `-- Settings\n`;
sql += `INSERT INTO public.settings (id, "restaurantName", "whatsappNumber", currency, "logoPath", tagline) VALUES ('global', ${escapeSql(data.settings.restaurantName)}, ${escapeSql(data.settings.whatsappNumber)}, ${escapeSql(data.settings.currency)}, ${escapeSql(data.settings.logoPath)}, ${escapeSql(data.settings.tagline)});\n\n`;

// 4. Home Content
sql += `-- Home Content\n`;
sql += `INSERT INTO public.home_content (id, "heroBadge", "heroTitle", "heroDescription", "heroCtaText", "heroSecondaryCta") VALUES ('global', ${escapeSql(data.homeContent.heroBadge)}, ${escapeSql(data.homeContent.heroTitle)}, ${escapeSql(data.homeContent.heroDescription)}, ${escapeSql(data.homeContent.heroCtaText)}, ${escapeSql(data.homeContent.heroSecondaryCta)});\n\n`;

// 5. About Content
sql += `-- About Content\n`;
sql += `INSERT INTO public.about_content (id, title, title_ar, story, story_ar, image, features) VALUES ('global', ${escapeSql(data.aboutContent.title)}, ${escapeSql(data.aboutContent.title_ar)}, ${escapeSql(data.aboutContent.story)}, ${escapeSql(data.aboutContent.story_ar)}, ${escapeSql(data.aboutContent.image)}, ${escapeSql(data.aboutContent.features)});\n\n`;

fs.writeFileSync(path.join(__dirname, 'supabase_data.sql'), sql);
console.log('Successfully generated supabase_data.sql');
