const user=require("../models/user")
module.exports.postUser=(req,res)=>{
  console.log(req.body);
   user.create(req.body).then((result)=>{
    res.status(201).json(result);
   }).catch((err)=>{
    console.log(err);
   })
  
}