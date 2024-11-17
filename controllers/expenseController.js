const path=require("path");
const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    const newExpense = await Expense.create({ amount, description, category });
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create expense' });
  }
};
exports.addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    const newExpense = await Expense.create({ amount, description, category });
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create expense' });
  }
};


exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve expenses' });
  }
};


exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Expense.destroy({ where: { id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Expense not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
};
