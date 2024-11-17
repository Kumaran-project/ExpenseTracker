const jwt=require("jsonwebtoken");
module.exports.authenticateUser=(req,res,next)=>{
  const token=req.header("Authorization");
  jwt.verify(token, 'secretkey', (err, encodeddata) => {
    if (err) {
      console.log('Invalid Token:', err.message);
      res.status(401).json({success:false,message:"invalid token"});
    } else {
      console.log(encodeddata.id);
      req.user=encodeddata.id;
      next();
    }
  });
  
}