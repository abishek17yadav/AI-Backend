const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usermodel = require('../models/User');

const router = express.Router();
// app.use(express.json())
// app.use(express.urlencoded({extended:true}));

// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await usermodel.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'Signup successful', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Signup failed', error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usermodel.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1d' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

module.exports = router;
