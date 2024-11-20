document.querySelector(".submit").addEventListener(async(e)=>{
  try{
    const token=localStorage.getItem("Token");
     await axios.get("http://localhost:3000/user/password/forgotpassword",{header:{Authorization:token}})
     console.log("password sent successfully");
  }
  catch(error){
     console.log(error);
  }
})