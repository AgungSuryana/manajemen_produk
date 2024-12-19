const Product = require('../models/productModel');

// Ambil semua produk
exports.getAllProducts = (req, res) => {
    Product.getAllProducts((err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json(results);
    });
};

// Ambil produk berdasarkan ID
exports.getProductById = (req, res) => {
    const { id } = req.params;
    Product.getProductById(id, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'tidak ada produk', id });
        res.status(200).json(results[0]);
    });
};

// Tambah produk baru
exports.createProduct = (req, res) => {
    const product = req.body;
    Product.createProduct(product, (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: 'Product berhasil di buat', productId: result.insertId });
    });
};

// Perbarui produk berdasarkan ID
exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const product = req.body;
    Product.updateProduct(id, product, (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'tidak ada produk', id })
        res.status(200).json({ message: 'Product berhasil di update' });
    });
};

// Hapus produk berdasarkan ID
exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    Product.deleteProduct(id, (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json({ message: 'Product berhasil di hapus' });
    });
};
