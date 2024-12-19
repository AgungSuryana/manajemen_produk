const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();


app.use(express.json()); 


app.use(cors());


app.use('/auth', authRoutes);
app.use('/', productRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
