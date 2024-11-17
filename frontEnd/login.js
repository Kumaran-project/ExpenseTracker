const form=document.querySelector("form");
const Err=document.querySelector(".error-message");

form.addEventListener("submit",(e)=>{
  e.preventDefault();


  const email=document.querySelector("#email");
  const password=document.querySelector("#password");
  const user={
    email:email.value,
    password:password.value

  }
  axios.post("http://localhost:3000/user/login",user).then((result) => {
    alert("user logged in successfully");
    
    if(result.status===200){
      console.log(result.data.redirectUrl);
      window.location.href = result.data.redirectUrl;
    }
    
  }).catch((error) => {
    console.log(error.response.data.message);
    console.log(Err)
    Err.textContent=error.response.data.message;
   
})

})