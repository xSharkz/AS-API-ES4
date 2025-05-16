const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const user = {
  id: 'admin123',
  email: 'admin@ucn.cl',
  password: '123456'
};

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email !== user.email || password !== user.password) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.json({ token });
});

module.exports = router;
