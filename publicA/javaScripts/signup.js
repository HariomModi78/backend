let login = document.querySelector(".loginButton");
login.addEventListener("click",function(){
    
    window.location.href = "/login";
})
let checkBox = document.querySelector("#checkBox");
let myForm = document.querySelector("#myForm");
let mobileNumber = document.querySelector("#mobileNumber");
   

myForm.addEventListener("submit",function(event){
    let number = parseInt(mobileNumber);

    if (!(checkBox.checked)) {
        console.log(mobileNumber.innerText.value)
        event.preventDefault(); // Prevent form submission
       alert("Terms and condition")
    }
})