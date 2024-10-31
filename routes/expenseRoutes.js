
const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.post('/expenses', expenseController.createExpense);
router.get('/expenses', expenseController.getExpenses);
router.delete('/expenses/:id', expenseController.deleteExpense);

module.exports = router;
