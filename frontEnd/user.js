const form=document.querySelector("form");

form.addEventListener("submit",(e)=>{
  e.preventDefault();

  const user_name=document.querySelector("#user_name");
  const email=document.querySelector("#email");
  const password=document.querySelector("#password");
  const user={
    user_name:user_name.value,
    email:email.value,
    password:password.value

  }
  axios.post("http://localhost:3000/user/sign-up",user).then((result) => {
    console.log(result)
  }).catch((err) => {
    console.log(err);
  });

})