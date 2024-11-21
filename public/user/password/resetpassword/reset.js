document.querySelector("form").addEventListener("submit",async(e)=>{
  e.preventDefault();
  const email=document.querySelector("#email").value;
  const password=document.querySelector("#password").value;

  try{
      const response=await axios.post("http://localhost:3000/user/password/updatepassword",{email,password});
      console.log(response.data.message)
  }
  catch(error){
    console.log(error);

  }
})