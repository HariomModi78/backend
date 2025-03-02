cart.style.cssText = "color:black";
home.style.cssText = "color:black";
profile.style.cssText = "color:blue";
menu.style.cssText = "color:black";
support.style.cssText = "color:black";

let order = document.querySelector(".order");
let wishList = document.querySelector(".wishList");

// order.addEventListener("click",function(){
//     window.location.href = `/order/${user._id}`
// })
wishList.addEventListener("click",function(){
    window.location.href = "/wishList"
})