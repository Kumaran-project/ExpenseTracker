const Express=require("express");
const router=Express.Router();
const passwordController=require("../controllers/forgotpassword");
const authenticate=require("../middleware/auth")


router.get("/forgotpassword",authenticate.authenticateUser,passwordController.forgotPassword);

module.exports=router;