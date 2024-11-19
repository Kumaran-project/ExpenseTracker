const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
// const path=require("path");
const jwt=require("jsonwebtoken");
const user = require("../models/user");



module.exports.postUser = async (req, res) => {
  const { userName, password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({ userName, email, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
function generateToken(id,name){
return jwt.sign({id,name},"secretkey",{expiresIn:"1h"});
}

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await user.findOne({ where: { email: email } });
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "404, No user found" });
    } 
      bcrypt.compare(password, existingUser.password).then((result) => {
        if (result===true) {

          res
            .status(200).json({success:true,redirectUrl:"http://localhost:3000/index.html",token:generateToken(existingUser.id,existingUser.userName)});
            
        } else {

          res
            .status(401)
            .json({
              success: true,
              message: "Authentication failed, Invalid password",
            });
        }
      });
    }
   catch (error) {
    console.log(error);
  }
};
