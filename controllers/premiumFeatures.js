const user=require("../models/user");
const expense=require("../models/Expense");
const Sequelize=require("sequelize");
module.exports.getTotalExpense=async(req,res)=>{
  try{
     const userExpenses=await user.findAll({
      include:expense,
      attributes:["userName",[Sequelize.literal("sum(expense.amount)"),'totalExpense']],
      group:['user.id','user.userName']
    })
    const result = userExpenses.map((user) => user.toJSON());
    console.log(result);
    res.status(200).json({success:true,result});
  }
  catch(err){
  console.log(err);
  }
}