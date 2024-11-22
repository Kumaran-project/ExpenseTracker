const ExpenseAmount = document.querySelector("#expense");
const expenseType = document.querySelector("#Enter-description");
const expenseCategory = document.querySelector("#category");
const form = document.querySelector("form");
const listToAdd = document.querySelector("#list-toadd");
const token = localStorage.getItem("Token"); 

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const expenseDetails = {
    amount: parseFloat(ExpenseAmount.value),
    description: expenseType.value,
    category: expenseCategory.value,
  };
  try {
    const response = await axios.post(
      "http://localhost:3000/user/expenses",
      expenseDetails,
      {
        headers: {
          Authorization: token, // Include Authorization header
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      console.log("Expense added successfully:", response.data);
      renderExpenses(); 
      form.reset(); // Clear the form fields
    }
  } catch (error) {
    console.error("Error adding expense:");
  }
});
async function deleteExpense(id) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/user/expenses/${id}`,
      {
        headers: {
          Authorization: token, // Include Authorization header
        },
      }
    );

    if (response.status === 204) {
      console.log("Expense deleted successfully:", response.data);
    } else {
      console.error("Failed to delete expense:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting expense:");
  }
}
function parseJwt(token) {
  if (!token) {
    throw new Error("Token is required");
  }
  const payloadBase64 = token.split('.')[1]; // Extract the payload part
  if (!payloadBase64) {
    throw new Error("Invalid JWT format");
  }

  const payloadJson = atob(payloadBase64); 
  return JSON.parse(payloadJson); 
}

function premiumUser(payload){
  if(payload.IsPremiumUser===true){
    const payment= document.getElementById('rzp-button1')
    if(payment){
      payment.remove();
    }
    document.querySelector('.subscriber').hidden = false;
   const download=document.querySelector(".download");
   download.addEventListener("click",async(e)=>{
    try{
       const s3response= await axios.get("http://localhost:3000/user/download",{headers:{Authorization:token}});
       window.location.href=s3response.data.fileURL;
       const fileToAdd=document.querySelector(".files");
       const h1=document.createElement("h1");
       fileToAdd.append(h1);
       h1.textContent="downloads"
       s3response.data.downloads.forEach((download)=>{
        const li=document.createElement("li");
        
        li.textContent=`userId:${download.id}- url:${download.url}`;
        
        fileToAdd.append(li);
       })
    }
    catch(error)
    {
      console.log(error);
    }
   });
    
  }
}
async function renderExpenses() {
  try {
    const response = await axios.get("http://localhost:3000/user/expenses", {
      headers: { Authorization: token },
    }); 
    const expenses = response.data.expenses;
    console.log(response.data);
    listToAdd.innerHTML = ""; 
    console.log(token);
    const payload=parseJwt(token);
    premiumUser(payload);
     
    expenses.forEach((expenseDetails) => {
      const expense = document.createElement("li");
      const expensedes = `${expenseDetails.amount}-${expenseDetails.description}-${expenseDetails.category}`;
      expense.textContent = expensedes;

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete Expense";

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit Expense";

      expense.append(editBtn, delBtn);
      listToAdd.append(expense);

      // Delete button functionality
      delBtn.addEventListener("click", async () => {
        await deleteExpense(expenseDetails.id);
        listToAdd.removeChild(expense); // Remove the expense from the DOM
      });
      editBtn.addEventListener("click", () => {
        ExpenseAmount.value = expenseDetails.amount;
        expenseType.value = expenseDetails.description;
        expenseCategory.value = expenseDetails.category;
        listToAdd.removeChild(expense); // Remove the expense from the DOM
        deleteExpense(expenseDetails.id); // Delete the expense for updating
      });
    });
  } catch (error) {
    console.log("Error fetching expenses:",error);
  }
}
renderExpenses();


document.getElementById('rzp-button1').onclick = async function(e){
 try{
  const response= await axios.get("http://localhost:3000/user/order/purchasePremiumSubscription",{headers:{Authorization:token}});

  
var options = {
  "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
  "order_id":response.data.order.orderID,
    "description": "Test Transaction",
    "name":"kumaran company",
  "handler": async function (result){
    console.log(response)
    try{
      console.log(result,options.order_id);
     await axios.post("http://localhost:3000/user/order/updateOrderStatus",{orderId:response.data.order.orderId,paymentId:result.razorpay_payment_id},
      {headers:{Authorization:token}});
      renderExpenses();
      alert("you are a premium subscriber now")
     }
     catch(error){
      console.log(error);
     }
  }
};
const rzp1 = new Razorpay(options);

  rzp1.open();
  e.preventDefault();
  rzp1.on('payment.failed', function (response){
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
});

 }
 catch(error){
  console.log(error);
 }
}

document.querySelector(".show-leader-board").addEventListener("click",async(e)=>{
  try{
   const leaderBoardUsers=await axios.get("http://localhost:3000/user/premium/totalExpense",{headers:{
    Authorization:token
   }})
  const leaderlist=document.querySelector(".leaderBoard");
  const leader=document.querySelector(".user-toAdd");
  leader.textContent="";
  console.log(leaderBoardUsers,leaderlist,leader);
  leaderBoardUsers.data.userExpenses.forEach((user)=>{
    const li=document.createElement("li");
    li.textContent=`user-${user.userName}-totalExpense ${user.totalExpense}`;
    leader.append(li);
  })
  leaderlist.hidden=false;
  console.log(leaderBoardUsers,leaderlist);
  

  }
  catch(err){
   console.log(err)
  }
})