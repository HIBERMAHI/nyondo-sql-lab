const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

/**
 * TASK 5: SECURE SEARCH WITH VALIDATION
 * Rules: Must be string, at least 2 chars, no < > or ;
 */
function searchProductSafe(name) {
    const specialChars = /[<>;]/;
    
    // VALIDATION STEP
    if (typeof name !== 'string' || name.length < 2 || specialChars.test(name)) {
        console.error(`Rejected Search: "${name}" (Validation Failed)`);
        return []; 
    }

    // DATABASE STEP
    const query = 'SELECT * FROM products WHERE name LIKE ?';
    return db.prepare(query).all(`%${name}%`);
}

/**
 * TASK 5: SECURE LOGIN WITH VALIDATION
 * Rules: Username no spaces/not empty. Password at least 6 chars.
 */
function loginSafe(username, password) {
    // VALIDATION STEP
    if (!username || typeof username !== 'string' || username.includes(' ')) {
        console.error(`Rejected Login: Invalid username format.`);
        return undefined;
    }
    if (typeof password !== 'string' || password.length < 6) {
        console.error(`Rejected Login: Password too short.`);
        return undefined;
    }

    // DATABASE STEP
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    return db.prepare(query).get(username, password);
}

// --- THE 6 TEST CASES FROM YOUR LAB MANUAL ---
console.log("--- Task 5: Running Final Tests ---");

console.log('Test 1 (cement):', searchProductSafe('cement'));        
console.log('Test 2 (empty):', searchProductSafe(''));                 
console.log('Test 3 (script):', searchProductSafe('<script>'));   

console.log('Test 4 (Login OK):', loginSafe('admin', 'admin123') ? "Success" : "Failed");
console.log('Test 5 (Login Short):', loginSafe('admin', 'ab') ? "Success" : "Failed");
console.log('Test 6 (Login Space):', loginSafe('ad min', 'pass123') ? "Success" : "Failed");

db.close();