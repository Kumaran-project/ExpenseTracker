const sequelize=require("../config/db");
const {DataTypes, UUID}=require("sequelize");

const requestpassword=sequelize.define("passwordRequests",{
  id:{
    type:DataTypes.UUID,
    allowNull:false,
    primaryKey:true,
  },
  isActive:DataTypes.BOOLEAN
})

module.exports=requestpassword;