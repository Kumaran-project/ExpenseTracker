  const Sequelize=require("sequelize")
const user=require("../models/user")
module.exports.postUser=(req,res)=>{
  console.log(req.body);
   user.create(req.body).then((result)=>{
    res.status(201).json(result);
   }).catch((error)=>{
    if (error instanceof Sequelize.UniqueConstraintError) {
      return res.status(409).json({ error: 'Email is already registered' });
    }
    console.log(error);
    
   })
  
}