const Express=require("express");
const router=Express.Router();
const passwordController=require("../controllers/password");


router.post("/forgotpassword",passwordController.forgotPassword);

router.get("/resetpassword/:id",passwordController.resetPassword);

router.post("/updatepassword",passwordController.updatePassword);

module.exports=router;