const sequelize=require("../config/db");
const {DataTypes,Sequelize}=require("sequelize");

const fileUrl=sequelize.define("fileUrl",{
  url:DataTypes.STRING
})

console.log(sequelize.models);
module.exports=fileUrl;