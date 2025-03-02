cart.style.cssText = "color:black";
home.style.cssText = "color:black";
profile.style.cssText = "color:black";
menu.style.cssText = "color:black";
support.style.cssText = "color:blue";


let back = document.querySelector(".back");
let cartIcon = document.querySelector(".cartIcon");

back.addEventListener("click",function(){
    window.location.href = "/profile";
})

cartIcon.addEventListener("click",function(){
    window.location.href = "/cart";
})