const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

function searchProduct(name) {
    // DANGER: String interpolation creates a security hole
    const query = `SELECT * FROM products WHERE name LIKE '%${name}%'`;
    console.log('Executing Query:', query);
    
    const rows = db.prepare(query).all();
    console.log('Result:', rows, '\n');
}

// TEST 1: A normal search
console.log("--- Normal Search ---");
searchProduct('Cement');

// TEST 2: THE ATTACK
console.log("--- SQL Injection Attack ---");
searchProduct("' OR 1=1--");

db.close();