WITH numbered_products AS (
  SELECT id, ROW_NUMBER() OVER(ORDER BY id) as new_order
  FROM products
)
UPDATE products
SET "order" = numbered_products.new_order
FROM numbered_products
WHERE products.id = numbered_products.id;

NOTIFY pgrst, 'reload schema';
