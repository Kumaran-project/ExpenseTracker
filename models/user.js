const sequelize=require("../config/db");
const {DataTypes}=require("sequelize");

const user=sequelize.define(
  "user",{
    user_name:{
      type:DataTypes.STRING,
      allowNull:false,
      
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      unique: true
    }
  }
)
// console.log(sequelize);
module.exports=user;
