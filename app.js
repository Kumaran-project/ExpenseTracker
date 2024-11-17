const express = require('express');
const bodyParser = require('body-parser');
const path=require
const cors = require('cors');
const sequelize = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/user');

const app = express();
const PORT = 3000;



app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});
app.use('/api', expenseRoutes);
app.use('/user',userRoutes);
app.use(express.static("./public"));


sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
