const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/user');
const orderRoutes=require("./routes/order");
const premiumRoutes=require("./routes/premiumFeatures");
const user=require("./models/user");
const expense=require("./models/Expense");
const order=require("./models/order");
user.hasMany(expense);
expense.belongsTo(user);

user.hasMany(order);
order.belongsTo(user);

const app = express();
const PORT = 3000;



app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
app.use('/api', expenseRoutes);
app.use('/user',userRoutes);
app.use("/user/order",orderRoutes);
app.use("/user/premium",premiumRoutes);


sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
