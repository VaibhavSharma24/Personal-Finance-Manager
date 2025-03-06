const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    res.send('Backend is running!');
  });
  

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const userRoutes = require('./routes/users');
const transactionRoutes = require('./routes/transactions');

app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
