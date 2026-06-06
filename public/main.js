
let Password=document.getElementById("signupPassword")
let labelPassword=document.getElementById("labelPassword")
let confirmPassword=document.getElementById("confirmPassword")
let errorMessege=document.getElementById("errorMessege")
let signuplabelPassword=document.getElementById("signuplabelPassword")
let passMessege=document.getElementById("passMessege")



Password.addEventListener("input",(event)=>{
    let pass=event.target.value
    let characters=document.getElementById("characters")
    let oneSymbol=document.getElementById("oneSymbol")
    let upperCase=document.getElementById("uppercase")
    const symbols = [
  "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", 
  ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"
];
    const uppercase=[
  "A","B","C","D","E","F","G","H","I","J","K","L","M",
  "N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
];

   if(pass){
      passMessege.innerHTML=""
     }


  let isLengthValid = pass.length >= 8 && pass.length <= 14;
  let hasSymbol = symbols.some(s => pass.includes(s));
  let hasUppercase = uppercase.some(u => pass.includes(u));

   


  characters.style.color = isLengthValid
    ? "rgba(23, 207, 78, 1)"
    : "rgb(214, 108, 108)";

  oneSymbol.style.color = hasSymbol
    ? "rgba(23, 207, 78, 1)"
    : "rgb(214, 108, 108)";


  upperCase.style.color = hasUppercase
    ? "rgba(23, 207, 78, 1)"
    : "rgb(214, 108, 108)";


  labelPassword.style.color =
    isLengthValid && hasSymbol && hasUppercase
      ? "rgba(23, 207, 78, 1)"
      : "";

   signupPassword.style.border =
    isLengthValid && hasSymbol && hasUppercase
      ? "1px solid rgba(23, 207, 78, 1)"
      : "";
    
      


})

confirmPassword.addEventListener("input",()=>{
   let pass=Password.value
   let confirm=confirmPassword.value
   if(confirm==pass ){
      errorMessege.innerHTML="Valid match"
      errorMessege.style.color="rgba(23, 207, 78, 1)"
      confirmPassword.style.border="1px solid rgba(23, 207, 78, 1)"
        setInterval(() => {
          errorMessege.innerHTML="" 
        }, 2000);
        }else{
          errorMessege.innerHTML="password don't match"
          errorMessege.style.color = "rgb(214, 108, 108)";
          confirmPassword.style.border = "1px solid rgb(214, 108, 108)";
          signuplabelPassword.style.color=""
             setTimeout(() => {
               errorMessege.innerHTML="" 
          }, 3000);
        }

 
})


let signupEmail=document.getElementById("signupEmail")
let loginPassword=document.getElementById("loginPassword")
let signupPassword=document.getElementById("signupPassword")
let signupName=document.getElementById("signupName")
let loginEmail=document.getElementById("loginEmail")


loginEmail.addEventListener("input",(event)=>{
  let logemail=event.target.value
  let emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if(emailRegex.test(logemail)){
    loginEmail.style.border="1px solid rgba(23, 207, 78, 1)"
  }else{
    loginEmail.style.border="1px solid rgb(214, 108, 108)"
  }

  // console.log(logemail)
})




signupEmail.addEventListener("input",(event)=>{
    let email=event.target.value.trim()
    let emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/

    signupEmail.classList.remove("input-error", "input-success");
    if(emailRegex.test(email)){
        
        signupEmail.style.border = "1px solid rgba(23, 207, 78, 1)";
        errorEmail.innerHTML =""
        labelEmail.style.color="rgba(23, 207, 78, 1)"
    }else {
        signupEmail.style.border = "1px solid rgb(214, 108, 108)"
    }
    // console.log(email);
    
})
let themeToggle=document.getElementById("themeToggle")
let signupBtn=document.getElementById("signupBtn")
let labelEmail=document.getElementById("labelEmail")
let errorEmail=document.getElementById("errorEmail")
let signupNameError=document.getElementById("signupNameError")
let signupNameinput=document.getElementById("signupNameinput") 
let signupNamelabel=document.getElementById("signupNamelabel")
let successBtn=document.getElementById("successBtn");
let successBtnCL=document.getElementsByClassName("successBtnCL");


signupNameinput.addEventListener("input",(event)=>{
   let name = signupNameinput.value.trim()
   let nameRegex= /^[^\s@1-9]+\s[A-Za-z\s]+$/
   if(nameRegex.test(name)){
    signupNameinput.style.border = "1px solid rgba(23, 207, 78, 1)";
    signupNamelabel.style.color="rgba(23, 207, 78, 1)"
    signupNameError.innerHTML=""
   }else{
    signupNameinput.style.border = "1px solid rgb(214, 108, 108)"
   }
})


signupBtn.addEventListener("click", async() => {
     





    let userName = signupNameinput.value.trim();
    let userEmail = signupEmail.value.trim();
    let pass = Password.value;
    let confirm = confirmPassword.value;
    


    
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let nameRegex= /^[^\s@1-9]+\s[A-Za-z\s]+$/

    let hasError = false;

    if (userName === "" || !nameRegex.test(userName)) {
        signupNameError.innerHTML = "Required" 
        signupNameError.style.color = "rgb(214, 108, 108)";
        signupNameinput.style.border = "1px solid rgb(214, 108, 108)";
        signupNamelabel.style.color = "rgb(214, 108, 108)";
        hasError = true;
    }

    if (userEmail === "" || !emailRegex.test(userEmail)) {
        errorEmail.innerHTML = userEmail === "" ? "Required" : "Invalid email";
        errorEmail.style.color = "rgb(214, 108, 108)";
        signupEmail.style.border = "1px solid rgb(214, 108, 108)";
        labelEmail.style.color = "rgb(214, 108, 108)";
        hasError = true;
    }

    if (pass === "") {
        signupPassword.style.border = "1px solid rgb(214, 108, 108)";
        labelPassword.style.color = "rgb(214, 108, 108)";
        signuplabelPassword.style.color = "rgb(214, 108, 108)";
        passMessege.innerHTML = "Required" 
        passMessege.style.color = "rgb(214, 108, 108)";
        hasError = true;
    }else{
       passMessege.innerHTML = "" 
    }

    if (confirm === "") {
        errorMessege.innerHTML ="Required"
        errorMessege.style.color = "rgb(214, 108, 108)";
        confirmPassword.style.border = "1px solid rgb(214, 108, 108)";
        signuplabelPassword.style.color = "rgb(214, 108, 108)";
        hasError = true;
    }

    if (!hasError) {
        errorMessege.style.color = "rgba(23, 207, 78, 1)";
        confirmPassword.style.border = "1px solid rgba(23, 207, 78, 1)";
        signuplabelPassword.style.color = "rgba(23, 207, 78, 1)";
        

         const res = await fetch("/sign_UP", {
          method: "POST",
          headers: {"Content-type": "application/json"
          },
          body: JSON.stringify({
            userName,
            userEmail,
            pass
          }) 

         })
        const data = await res.json()
         if(res.ok){
    
          successBtn.style.display="block"
          successBtn.innerHTML=data.message;
          

          setTimeout(() => {
            successBtn.style.display="none"
           
          }, 3000);

         }else{
          successBtn.successBtnCL="bg-red-400"
          successBtn.innerHTML="Something went wrong";
         }
       
      
       
          
    }

        const symbols = [
  "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", 
  ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"
];
    const uppercase=[
  "A","B","C","D","E","F","G","H","I","J","K","L","M",
  "N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
];

    let isLengthValid = pass.length >= 8 && pass.length <= 14;
      let hasSymbol = symbols.some(s => pass.includes(s));
  let hasUppercase = uppercase.some(u => pass.includes(u));

    signupPassword.style.border =
    !isLengthValid && !hasSymbol && !hasUppercase
      ? "1px solid rgb(214, 108, 108)"
      : "";

    
});

let signinBtn=document.getElementById("signinBtn");
let LGsuccessBtn=document.getElementById("LGsuccessBtn");


signinBtn.addEventListener("click", async()=>{
   
   let loginPass=loginPassword.value
   let logEmail=loginEmail.value.trim()
   let emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/

   if(emailRegex.test(logEmail) && loginPass){
       const res = await fetch("/sign_UP/login", {
          method: "POST",
          headers: {"Content-type": "application/json"
          },
          body: JSON.stringify({
           logEmail,
           loginPass
          }) 

         })
          
          const data = await res.json()
          console.log(data)
          LGsuccessBtn.style.display="block"
          LGsuccessBtn.innerHTML=data.message;

          setTimeout(() => {
            LGsuccessBtn.style.display="none"
           
          }, 10000);
       
    }else if(!emailRegex.test(logEmail) &&!loginPass){
    loginEmail.style.border="1px solid rgb(214, 108, 108)"
    loginPassword.style.border="1px solid rgb(214, 108, 108)"

  }


  
})