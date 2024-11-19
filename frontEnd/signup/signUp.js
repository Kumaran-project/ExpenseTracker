const form=document.querySelector("form");
const Err=document.querySelector("error-message");

form.addEventListener("submit",(e)=>{
  e.preventDefault();

  const userName=document.querySelector("#user_name");
  const email=document.querySelector("#email");
  const password=document.querySelector("#password");
  const user={
    userName:userName.value,
    email:email.value,
    password:password.value

  }
  axios.post("http://localhost:3000/user/sign-up",user).then((result) => {
    console.log(result)
  }).catch((error) => {
    if (error.response && error.response.status === 409) {
      alert('This email is already registered. Please use another email.');
    } else {
      alert('An error occurred. Please try again.');
    }
})

})