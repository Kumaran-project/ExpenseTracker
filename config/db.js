const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USERNAME,process.env.MYSQL_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
