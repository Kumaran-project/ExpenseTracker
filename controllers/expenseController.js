const path=require("path");
const Expense = require('../models/Expense');
const user=require("../models/user");
const sequelize=require("../config/db");
const { Transaction } = require("sequelize");



exports.addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    const t=await sequelize.transaction();

    const newExpense = await req.user.createExpense({ amount, description, category },{transaction:t});
    console.log(newExpense);
    const totalExpense = (req.user.totalExpense || 0) + amount;
   req.user.totalExpense=totalExpense;
    await  req.user.save({transaction:t});
    await t.commit();
    res.status(201).json(newExpense);
  } catch (error) {
    console.log(error);
    await t.rollback();
    res.status(500).json({ error: 'Failed to create expense' });
  }
};


exports.getExpenses = async (req, res) => {
  try {
    console.log(req.user); 
    const expenses = await req.user.getExpenses();
    console.log(expenses);
    res.status(200).json({expenses});
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve expenses' });
  }
};


exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const t = await sequelize.transaction();
    const expenseTodelete = await Expense.findByPk(id,{transaction:t});
    
    console.log(expenseTodelete.toJSON());

    if(req.user.id!==expenseTodelete.userId){
      return res.status(403).json({ error: 'unauthorized' });
    }
    
    if (expenseTodelete) {
     
      req.user.totalExpense=req.user.totalExpense-expenseTodelete.amount;
      await req.user.save({transaction:t});
      await expenseTodelete.destroy({transaction:t});
      t.commit();
      return res.status(204).json({success:true,message:"deleted expense successfully"});
    } else {
     return res.status(404).json({ error: 'Expense not found' });
    }
  } catch (error) {
    console.log(error);
    t.rollback();
    res.status(500).json({ error: 'Failed to delete expense' });
  }
};

module.exports.getDownloadFile=async(req,res)=>{
  try{

    const expenses=await req.user.getExpenses();
    res.status(200).json(expenses);
  }
  catch(error){
     console.log(error)
  }
}