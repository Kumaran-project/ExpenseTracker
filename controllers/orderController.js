const Razorpay=require("razorpay");

var rzp = new Razorpay({ key_id:process.env.RAZORPAY_KEY_ID , key_secret: process.env.RAZORPAY_KEY_SECRET });
const order=require("../models/order");



module.exports.createOrder=async(req,res)=>{

 try{  
 const orderResponse =await rzp.orders.create({
    amount: 50000,
    currency: "INR",
    receipt:`${Math.floor(Math.random() * 100000)}`
  });
    const order=await req.user.createOrder({orderId:orderResponse.id,});
    res.status(201).json({order,key_id:rzp.key_id,amount:orderResponse.amount,currency:orderResponse.currency})

 }
 catch(error){
  console.log(error);
  res.status(403).json({succes:"false",message:"unable to buy premium sunscription"})
 }
}

module.exports.updateOrderStatus=async(req,res)=>{

  try{
    
  const {paymentId,orderId}=req.body;
  
  const orderToBeUpdated=await order.findOne({where:{orderId:orderId}});
  const status=await orderToBeUpdated.update({paymentId,orderStatus:"successful"});
  await req.user.update({IsPremiumUser:"true"});
  res.status(202).json({success:"true",message:"transaction Successful",orderStatus:status.orderStatus});
  }
catch(error){
  console.log(error);
  res.status(403).json({success:"false",message:"forbidden"});
}

}