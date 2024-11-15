const form=document.querySelector("form");
const Err=document.querySelector("error-message");

form.addEventListener("submit",(e)=>{
  e.preventDefault();


  const email=document.querySelector("#email");
  const password=document.querySelector("#password");
  const user={
    email:email.value,
    password:password.value

  }
  axios.post("http://localhost:3000/user/login",user).then((result) => {
    console.log(result);
  }).catch((error) => {
   Err.textContent=error.data.message;
})

})