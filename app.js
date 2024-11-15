const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/user');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());
app.use('/api', expenseRoutes);
app.use("/user",userRoutes);


sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
