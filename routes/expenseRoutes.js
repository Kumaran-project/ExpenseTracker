
const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authenticate=require("../middleware/auth")

router.post('/expenses',authenticate.authenticateUser, expenseController.addExpense);
router.get('/expenses', authenticate.authenticateUser,expenseController.getExpenses);
router.delete('/expenses/:id',authenticate.authenticateUser, expenseController.deleteExpense);

module.exports = router;
