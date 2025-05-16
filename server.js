require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/productos', productRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Esta es una prueba de que mi servidor está funcionando correctamente.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
