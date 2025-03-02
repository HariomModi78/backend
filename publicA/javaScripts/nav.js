let home = document.querySelector(".home");
let profile = document.querySelector(".profile");
let cart = document.querySelector(".cart");
let menu = document.querySelector(".menu");
let support = document.querySelector(".support");

home.addEventListener("click",function(){
      window.location.href = "/";
})
profile.addEventListener("click",function(){
  window.location.href = "/profile";
})
cart.addEventListener("click",function(){
  window.location.href = "/cart";
})
menu.addEventListener("click",function(){
  window.location.href = "/menu";
})
support.addEventListener("click",function(){
  window.location.href = "/support";
})


