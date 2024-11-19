const express=require("express");
const authenticate=require("../middleware/auth")
const router=express.Router();
const orderController=require("../controllers/orderController")

router.get("/purchasePremiumSubscription",authenticate.authenticateUser,orderController.createOrder);
router.post("/updateOrderStatus",authenticate.authenticateUser,orderController.updateOrderStatus);


module.exports=router;