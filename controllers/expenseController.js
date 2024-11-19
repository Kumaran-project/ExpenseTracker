const path=require("path");
const Expense = require('../models/Expense');
const user=require("../models/user");



exports.addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;

    const newExpense = await req.user.createExpense({ amount, description, category });
    console.log(newExpense);
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create expense' });
  }
};


exports.getExpenses = async (req, res) => {
  try {
    console.log(req.user); 
    const expenses = await req.user.getExpenses();
    console.log(expenses);
    res.status(200).json({expenses,user:req.user.toJSON()});
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve expenses' });
  }
};


exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expenseTodelete = await Expense.findByPk(id);
    
    console.log(expenseTodelete.toJSON());

    if(req.user.id!==expenseTodelete.userId){
      return res.status(403).json({ error: 'unauthorized' });
    }
    
    if (expenseTodelete) {
      await expenseTodelete.destroy();
      return res.status(204).json({success:true,message:"deleted expense successfully"});
    } else {
     return res.status(404).json({ error: 'Expense not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
};
