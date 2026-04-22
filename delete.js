const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

console.log("--- TASK 3: DELETE OPERATIONS ---");

// 1. Delete the product with ID = 5 (Wheelbarrow/Timber)
const productIdToDelete = 5;
const deleteStmt = db.prepare('DELETE FROM products WHERE id = ?');
const result = deleteStmt.run(productIdToDelete);

console.log(`✅ Successfully deleted product with ID: ${productIdToDelete}`);
console.log(`Rows affected: ${result.changes}`);

// 2. Final verification: View all remaining products
const remainingProducts = db.prepare('SELECT * FROM products').all();
console.log("\nRemaining Products in Database:");
console.table(remainingProducts);

db.close();