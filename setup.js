const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

// 1. Create the Table
db.exec(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL
    )
`);

// 2. Prepare and Insert the 5 products
const insert = db.prepare('INSERT INTO products (name, description, price) VALUES (?, ?, ?)');
const insertAll = db.transaction((items) => {
    for (const item of items) insert.run(...item);
});

insertAll([
    ['Cement (bag)', 'Portland cement 50kg bag', 35000],
    ['Iron Sheet 3m', 'Gauge 30 roofing sheet 3m long', 110000],
    ['Paint 5L', 'Exterior wall paint white 5L', 60000],
    ['Nails 1kg', 'Common wire nails 1kg pack', 12000],
    ['Timber 2x4', 'Pine timber plank 2x4 per metre', 25000]
]);

// 3. Verify the work
const rows = db.prepare('SELECT * FROM products').all();
console.log(rows);



// Add this to setup.js
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'attendant'
    )
`);

const insertUser = db.prepare('INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)');
const userTransaction = db.transaction((users) => {
    for (const user of users) insertUser.run(...user);
});

userTransaction([
    ['admin', 'admin123', 'admin'],
    ['fatuma', 'pass456', 'attendant'],
    ['wasswa', 'pass789', 'manager']
]);

console.log("✅ Users table added!");