const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

// --- SECURE FUNCTIONS ---

function searchProductSafe(name) {
    // We use the ? placeholder. This is "Parameterized"
    const query = 'SELECT * FROM products WHERE name LIKE ?';
    const searchTerm = `%${name}%`; 
    
    console.log(`Executing Secure Query: ${query}`);
    const rows = db.prepare(query).all(searchTerm);
    console.log('Result:', rows, '\n');
    return rows;
}

function loginSafe(username, password) {
    // Both inputs use ? placeholders to prevent injection
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    
    console.log(`Executing Secure Query: ${query}`);
    const row = db.prepare(query).get(username, password);
    
    if (row) {
        console.log('Result: Login Successful!', row.username, '\n');
    } else {
        console.log('Result: Login Failed. Invalid credentials.\n');
    }
    return row;
}

// --- TASK 4: THE SECURITY TESTS ---
// These attacks worked in Task 3, but must return [] or undefined here.

console.log("--- Test 1: Blocking Search Bypass ---");
searchProductSafe("' OR 1=1--");

console.log("--- Test 2: Blocking UNION Attack ---");
searchProductSafe("' UNION SELECT id, username, password, role FROM users--");

console.log("--- Test 3: Blocking Login Comment Bypass ---");
loginSafe("admin'--", "anything");

console.log("--- Test 4: Blocking Always-True Login ---");
loginSafe("' OR '1'='1", "' OR '1'='1");

db.close();