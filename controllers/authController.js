const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Fungsi untuk mendaftar pengguna baru
exports.registerUser = (req, res) => {
    const { username, password, role } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: err.message });

        User.createUser({ username, password: hashedPassword, role }, (err, result) => {
            if (err) return res.status(500).json({ message: err.message });

            const token = jwt.sign(
                { userId: result.insertId, username, role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(201).json({
                message: "Berhasil Register",
                token: token
            });
        });
    });
};


// Fungsi untuk login pengguna
exports.login = (req, res) => {
    const { username, password } = req.body;

    User.getUserByUsername(username, async (err, user) => {
        if (err) return res.status(500).json({ message: err.message });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Password salah' });

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Kirim token ke client
        res.json({ token });
    });
};