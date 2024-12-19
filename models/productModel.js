const db = require('../config/db');

exports.getAllProducts = callback => {
    db.query('SELECT * FROM products', callback);
};

exports.getProductById = (id, callback) => {
    db.query('SELECT * FROM products WHERE id = ?', [id], callback);
};

exports.createProduct = (product, callback) => {
    const { name, description, price, stock } = product;
    db.query('INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)', 
             [name, description, price, stock], callback);
};

exports.updateProduct = (id, product, callback) => {
    const { name, description, price, stock } = product;
    db.query('UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?', 
             [name, description, price, stock, id], callback);
};

exports.deleteProduct = (id, callback) => {
    db.query('DELETE FROM products WHERE id = ?', [id], callback);
};
