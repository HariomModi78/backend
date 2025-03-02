let back = document.querySelector(".back");
let cartIcon = document.querySelector(".cartIcon");

back.addEventListener("click",function(){
    window.location.href = "/";
})

cartIcon.addEventListener("click",function(){
    window.location.href = "/cart";
})