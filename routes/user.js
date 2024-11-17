const express=require("express");

const router=express.Router();
const userController=require("../controllers/userController");

router.post("/sign-up",userController.postUser);
router.post("/login",userController.loginUser);

module.exports=router;