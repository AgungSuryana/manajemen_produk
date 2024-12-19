const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const { registerUser, login } = require('../controllers/authController');

router.post('/register', authenticateToken, authorizeRole('admin'), registerUser);

router.post('/login', login);


module.exports = router;
