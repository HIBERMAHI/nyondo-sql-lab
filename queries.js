const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db'); // This defines "db" for the whole file

console.log("--- TASK 2: QUERY RESULTS ---");

// Query A: Get every column
const queryA = db.prepare('SELECT * FROM products').all();
console.log("\nQuery A:", queryA);

// Query B: Name and price
const queryB = db.prepare('SELECT name, price FROM products').all();
console.log("\nQuery B:", queryB);

// Query C: ID 3
const queryC = db.prepare('SELECT * FROM products WHERE id = 3').get();
console.log("\nQuery C:", queryC);

// Query D: Partial match 'sheet'
const queryD = db.prepare("SELECT * FROM products WHERE name LIKE '%sheet%'").all();
console.log("\nQuery D:", queryD);

// Query E: Sorted by price (highest first)
const queryE = db.prepare('SELECT * FROM products ORDER BY price DESC').all();
console.log("\nQuery E:", queryE);

// Query F: Top 2 most expensive
const queryF = db.prepare('SELECT * FROM products ORDER BY price DESC LIMIT 2').all();
console.log("\nQuery F:", queryF);

// --- Query G: The Update ---
console.log("\n--- Query G: Updating Cement Price ---");

// 1. Perform the update
db.prepare('UPDATE products SET price = 38000 WHERE id = 1').run();

// 2. Confirm the change
const updatedCement = db.prepare('SELECT * FROM products WHERE id = 1').get();
console.log("Updated Product:", updatedCement);

// IMPORTANT: Only close the database at the very end of the script
db.close();