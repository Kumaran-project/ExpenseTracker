const express=require("express");

const router=express.Router();
const userController=require("../controllers/userController");

router.get("login",userController.getLogin);
router.get("sign-up",userController.getSignUp);
router.get("expense",userController.getExpense);


router.post("sign-up",userController.postUser);
router.post("login",userController.loginUser);

module.exports=router;