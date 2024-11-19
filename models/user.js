const sequelize=require("../config/db");
const {DataTypes}=require("sequelize");

const user=sequelize.define(
  "user",{
    userName:{
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
    },
    IsPremiumUser:DataTypes.BOOLEAN
  }
)
// console.log(sequelize);
module.exports=user;
