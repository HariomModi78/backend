cart.style.cssText = "color:black";
home.style.cssText = "color:blue";
profile.style.cssText = "color:black";
menu.style.cssText = "color:black";
support.style.cssText = "color:black";

let item = document.getElementsByClassName("item");


for(let i=0;i<item.length;i++){
    item[i].addEventListener("click",function(){
        let productid = item[i].id;
        window.location.href = `/productView/${productid}`
    })
}
