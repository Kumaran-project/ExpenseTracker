const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const user = require("../models/user");
module.exports.postUser = async (req, res) => {
  const { user_name, password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({ user_name, email, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await user.findOne({ where: { email: email } });
    if (!existingUser) {
      res.status(404).json({ success: false, message: "404, No user found" });
    } else {
      bcrypt.compare(password, existingUser.password).then((result) => {
        if (result) {
          res
            .status(200)
            .json({ success: true, message: "User logged in successfully" });
        } else {
          res
            .status(401)
            .json({
              success: true,
              message: "Authentication failed, Invalid password",
            });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
