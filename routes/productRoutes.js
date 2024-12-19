const express = require('express');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const { 
    getAllProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');

const router = express.Router();

router.get('/products', authenticateToken, getAllProducts); 
router.get('/products/:id', authenticateToken, getProductById); 
router.post('/products', authenticateToken, authorizeRole('admin'), createProduct);
router.put('/products/:id', authenticateToken, authorizeRole('admin'), updateProduct); 
router.delete('/products/:id', authenticateToken, authorizeRole('admin'), deleteProduct); 

module.exports = router;
