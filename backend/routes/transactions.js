const express = require('express');
const { readData, writeData } = require('../utils/fileUtils');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const TRANSACTIONS_FILE = './data/transactions.json';

// Get all transactions
router.get('/', async (req, res) => {
  const transactions = await readData(TRANSACTIONS_FILE);
  res.json(transactions);
});

// Add a new transaction
router.post('/', async (req, res) => {
  const { amount, date, category, description } = req.body;
  if (!amount || !date || !category || !description) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const transactions = await readData(TRANSACTIONS_FILE);
  const newTransaction = { id: uuidv4(), amount, date, category, description };
  transactions.push(newTransaction);
  await writeData(TRANSACTIONS_FILE, transactions);

  res.json({ message: 'Transaction added', transaction: newTransaction });
});

// Update a transaction
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { amount, date, category, description } = req.body;

  let transactions = await readData(TRANSACTIONS_FILE);
  const index = transactions.findIndex(tx => tx.id === id);
  
  if (index === -1) return res.status(404).json({ error: 'Transaction not found' });

  transactions[index] = { id, amount, date, category, description };
  await writeData(TRANSACTIONS_FILE, transactions);

  res.json({ message: 'Transaction updated', transaction: transactions[index] });
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  let transactions = await readData(TRANSACTIONS_FILE);
  transactions = transactions.filter(tx => tx.id !== id);
  await writeData(TRANSACTIONS_FILE, transactions);

  res.json({ message: 'Transaction deleted' });
});

module.exports = router;
