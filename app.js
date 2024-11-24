const express = require("express");
const cors = require("cors");
const fs=require("fs");
const path=require('path');
const helmet=require("helmet");
const compression=require("compression");
const morgan=require(morgan);
const sequelize = require("./config/db");
const expenseRoutes = require("./routes/expenseRoutes");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");
const premiumRoutes = require("./routes/premiumFeatures");
const passwordRoutes = require("./routes/password");
const user = require("./models/user");
const expense = require("./models/Expense");
const order = require("./models/order");
const passwordRequests = require("./models/requestpassword");
const fileUrl=require("./models/downloadedfile");
const morgan = require("morgan");
const { Stream } = require("stream");

user.hasMany(expense);
expense.belongsTo(user);

user.hasMany(order);
order.belongsTo(user);

user.hasMany(passwordRequests);
passwordRequests.belongsTo(user);

user.hasMany(fileUrl);
fileUrl.belongsTo(user);

const app = express();
const PORT = 3000;

const reqLogFile=fs.createWriteStream(path.join(__dirname,'reqLogFile.log'),{flags:a});

app.use(cors());
app.use(helmet(helmet()));
app.use(compression());
app.use(morgan('combined',{Stream:reqLogFile}));
app.use(express.json());
app.use(express.static("./public"));
app.use("/user", expenseRoutes);
app.use("/user", userRoutes);
app.use("/user/order", orderRoutes);
app.use("/user/premium", premiumRoutes);
app.use("/user/password/", passwordRoutes);



const privateKey = fs.readFileSync('server.key', 'utf8');
const certificate = fs.readFileSync('server.crt', 'utf8');

const credentials = { key: privateKey, cert: certificate };




console.log(sequelize.models)
sequelize
  .sync()
  .then(() => {
  //   https.createServer(credentials, app).listen(3000, () => {
  //     console.log('Secure server running at https://localhost:3000');
  // });
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
