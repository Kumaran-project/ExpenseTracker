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


module.exports.loginUser=async(req,res)=>{
  const {email,password}=req.body;
  try{
  const existingUser= await user.findOne({where:{email:email}});
  if(!existingUser)
  {
    res.status(404).json({success:false,message:"404, No user found"});
  }
  else{
    const user_password=existingUser.password;
    if(user_password===password){
      res.status(200).json({success:true,message:"User logged in successfully"});
    }
    else{
      res.status(401).json({success:true,message:"Authentication failed, Invalid password"});
    }
  }
  }
  catch(error){
    console.log(error);
  }
}

