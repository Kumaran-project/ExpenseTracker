const path=require("path");
const Expense = require('../models/Expense');
const user=require("../models/user");



exports.addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    console.log(req.user);
    const loggedinuser=await user.findByPk(req.user);
    const newExpense = await loggedinuser.createExpense({ amount, description, category });
    console.log(newExpense);
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create expense' });
  }
};


exports.getExpenses = async (req, res) => {
  try {
    console.log(req.user);
    const loggedinuser=await user.findByPk(req.user);
    
    const expenses = await loggedinuser.getExpenses();
    console.log(expenses);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve expenses' });
  }
};


exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expenseTodelete = await Expense.findByPk(id);
    const loggedinuser=await user.findByPk(req.user);
    console.log(expenseTodelete.toJSON());

    if(loggedinuser.id!==expenseTodelete.userId){
      return res.status(403).json({ error: 'unauthorized' });
    }
    
    if (expenseTodelete) {
      await loggedinuser.removeExpense(expenseTodelete);
      return res.status(200).json({success:true,message:"deleted expense successfully"});
    } else {
     return res.status(404).json({ error: 'Expense not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
};
