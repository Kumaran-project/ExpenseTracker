const user=require("../models/user");
const expense=require("../models/Expense");
const Sequelize=require("sequelize");
module.exports.getTotalExpense=async(req,res)=>{
  try{
     const userExpenses=await user.findAll({
      include:{
       model: expense,
       attributes:[]
      },
      
      attributes:["userName",[Sequelize.fn("sum",Sequelize.col("expenses.amount")),'totalExpense']],
      order: [
        [Sequelize.literal("SUM(expenses.amount)"), "DESC"] // Corrected ordering
      ],
      group:['user.id','user.userName']
    })
    res.status(200).json({success:true,userExpenses});
  }
  catch(err){
  console.log(err);
  }
}