const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const order=sequelize.define("order",{
  orderId:{
    type:DataTypes.STRING,
    allowNull:false
  },
  orderStatus:{
    type:DataTypes.STRING,
    allowNull:false,
    defaultValue:"pending"
  },
  paymentId:DataTypes.STRING

})

module.exports=order;