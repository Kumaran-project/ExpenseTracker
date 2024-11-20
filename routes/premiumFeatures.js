const express=require("express");
const router=express.Router();
const premiumController=require("../controllers/premiumFeatures")
const authenticate=require("../middleware/auth")

router.get("/totalExpense",authenticate.authenticateUser,premiumController.getTotalExpense);
module.exports=router;