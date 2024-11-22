const path=require("path");
const Expense = require('../models/Expense');
const sequelize=require("../config/db");
const AWS=require("aws-sdk");


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
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: "ap-southeast-2",
    });
    const S3=new AWS.S3();
    const BucketName="kumaranexpensetracker";
    const fileName=`expense-${req.user.id}/${new Date()}.txt`
    const data= await req.user.getExpenses();
    const stringifyData=JSON.stringify(data);
    const params={
       Bucket:BucketName,
       Key:fileName,
       Body:stringifyData,
       ACL: "public-read",
      
    }
    const S3Response=await S3.upload(params).promise();
    console.log(S3Response);
    const fileUrl=await req.user.createFileUrl({url:S3Response.Location});
    console.log(fileUrl);
    const fileDownloaded=await req.user.getFileUrls();
    res.status(200).json({success:true,fileURL:S3Response.Location,downloads:fileDownloaded});
  }
  catch(error){
     console.log(error)
  }
}