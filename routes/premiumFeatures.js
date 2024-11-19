const express=require("express");
const router=express.Router();
const premiumController=require("../controllers/premiumFeatures")


router.get("/totalExpense",premiumController.getTotalExpense);
module.exports=router;