cart.style.cssText = "color:black";
home.style.cssText = "color:black";
profile.style.cssText = "color:blue";
menu.style.cssText = "color:black";
support.style.cssText = "color:black";


let back = document.querySelector(".back");
let cartIcon = document.querySelector(".cartIcon");

back.addEventListener("click",function(){
    window.location.href = "/profile";
})

cartIcon.addEventListener("click",function(){
    window.location.href = "/cart";
})
let productName  = document.getElementsByClassName("productName");
let search = document.querySelector("#search");

console.log(search);

let main = document.querySelector("main");
console.log(main);

let product = document.getElementsByClassName("product");
 let deliveryDate  = document.getElementsByClassName("deliveryDate ")
for(let i=0;i<product.length;i++){

    if(deliveryDate [i].innerText == "Delivered"){
        product[i].style.cssText = "color:green"
    }
    else{
        console.log("not working")
    }
}
// console.log("Order time hai ye",orderTime[8].id)

// let productid = document.querySelector(".productid");
// productid.addEventListener("click",function(){
//     window.location.href = "/order/"
// })








