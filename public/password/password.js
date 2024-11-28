document.querySelector("form").addEventListener('submit',async(e)=>{
  try{
    e.preventDefault();
    const token=localStorage.getItem("Token");
    console.log(token);
    const email=document.querySelector(".email").value;
    // console.log(email)
     await axios.post("http://localhost:3000/user/password/forgotpassword",{email},{headers:{Authorization:token}})
     console.log("password sent successfully");
  }

  
  catch(error){
     console.log(error);
  }
})