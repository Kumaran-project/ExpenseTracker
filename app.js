const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/user');
const authenticateJWT=require("./middleware/auth");
const user=require("./models/user");
const expense=require("./models/Expense");
user.hasMany(expense);
expense.belongsTo(user);

const app = express();
const PORT = 3000;



app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
app.use('/api',authenticateJWT.authenticateUser, expenseRoutes);
app.use('/user',userRoutes);



sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
