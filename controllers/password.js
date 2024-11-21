const brevo = require('@getbrevo/brevo');
const forgotpassword=require("../models/requestpassword");
const { v4: uuidv4 } = require('uuid');
const path=require("path");
const user=require("../models/user");
const bcrypt=require("bcrypt");

require("dotenv").config();
const resetform = path.join(__dirname, "..","frontend","resetPassword", 'reset.html');

let apiInstance = new brevo.TransactionalEmailsApi();

let apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = process.env.BREVO_API_KEY;

let sendSmtpEmail = new brevo.SendSmtpEmail();


module.exports.forgotPassword = async (req, res) => {
  try {
    const request=await forgotpassword.create({id:uuidv4(),isActive:true});
    const email=req.body.email;
    console.log(req.body);
    sendSmtpEmail.subject = "My {{params.subject}}";
sendSmtpEmail.htmlContent = "<html><body><h3>{{params.parameter}}</h3> <p>{{params.link}}<P></body></html>";
sendSmtpEmail.sender = { name: "kumaran", email: "kumaranselvaraj07@gmail.com" };
sendSmtpEmail.to = [{ email}];
sendSmtpEmail.replyTo = { email: "example@brevo.com", name: "sample-name" };
sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
sendSmtpEmail.params = {
  parameter: "Reset password link",
  subject: "Reset password validation",
  link:`http://localhost:3000/user/password/resetpassword/${request.id}`

};

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('API called successfully. Returned data:', data);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};


module.exports.resetPassword=async(req,res)=>{
  try{
    console.log(req.params.id);
    const requestid=await forgotpassword.findByPk(req.params.id);
    if(!requestid){
       return res.status(404).json({success:false,message:"invalidURL"});
    }
    console.log(typeof requestid.isActive);
    if(requestid.isActive===true)
    return res.status(200).sendFile(resetform);
    
    return res.status(404).json({success:false,message:"invalidURL"});

  }
  catch(error){
   console.log(error);
  }
}

module.exports.updatePassword=async(req,res)=>{
  try{
    const {email,password}=req.body;
    const userinstance=await user.findOne({where:{email}});
    console.log(userinstance);
    const hashedPassword = await bcrypt.hash(password, 10);
    userinstance.password=hashedPassword;
    await userinstance.save();
    const requestid=await forgotpassword.findByPk(userinstance.id);
    requestid.isActive=0; 
    console.log(requestid);
    await requestid.save();
    res.status(200).json({success:true,message:"password Updated succesfully"})
  }
  catch(error){
     console.log(error)
     return res.status(404).json({ message: "User not found" });
  

  }
}