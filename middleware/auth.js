const jwt=require("jsonwebtoken");
const user=require("../models/user");
module.exports.authenticateUser=(req,res,next)=>{
  const token=req.header("Authorization");   
  console.log(token);
  jwt.verify(token, process.env.TOKEN_SECRET, async(err, response) => {
    if (err) {
      console.log('Invalid Token:', err.message);
      res.status(401).json({success:false,message:"invalid token"});
    } 
    
    try{
      console.log(response.id);
      const loggeduser=await user.findByPk(response.id);
      req.user=loggeduser;
      console.log(req.user);
      next();
    }
    catch(error){
      console.log(error);
      res.status(401).json({success:true,message:"invalid user"})
    }
  });
  
}