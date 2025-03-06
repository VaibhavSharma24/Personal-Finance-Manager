const express = require('express');
const { readData, writeData } = require('../utils/fileUtils');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const USERS_FILE = './data/users.json';

// User Registration
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });

  let users = await readData(USERS_FILE);
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  const newUser = { id: uuidv4(), name, email, password };
  users.push(newUser);
  await writeData(USERS_FILE, users);

  res.json({ message: 'User registered successfully', user: { id: newUser.id, name, email } });
});

// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let users = await readData(USERS_FILE);
  const user = users.find(user => user.email === email && user.password === password);

  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
});

module.exports = router;
