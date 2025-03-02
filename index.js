const express = require("express");
const app = express(); 
const path = require("path");
const customerDataBase = require("./database/customer");
const productDataBase = require("./database/product");
const printoutDataBase = require("./database/printout");
const orderDataBase = require("./database/order");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const product = require("./database/product");
const customer = require("./database/customer");
const multer = require("multer");
const fs = require("fs");
const order = require("./database/order");
const nodemailer = require("nodemailer");
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log(__dirname,'uploads')
const transporter = nodemailer.createTransport({
    
    secure:true,
    host:"smtp.gmail.com",
    port:465,
    auth:{
        user:"scmodi9@gmail.com",
        pass:"zdsobwpildembplk"
    }


})

function sendMail(to,sub,msg){
transporter.sendMail({
    to:to,
    subject:sub,
    html:msg
})
}


 
try{
    var today = new Date();
    var folderName = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    var folderPath = path.join(__dirname, 'uploads', folderName);
    console.log(`Folder created: ${folderPath}`);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }
}catch(e){
    res.send("Error aa gay bhai")
}
    
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,`./${folderPath}`);
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`);
    }
})
const upload = multer({storage:storage});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,"publicA")));
app.set("view engine","ejs");



app.get("/printout",async function(req,res){
    try{
        let data = jwt.verify(req.cookies.token,"hariommodiji");
    let user = await customerDataBase.findOne({mobileNumber:data.mobileNumber});
    res.redirect(`/printout/${user.email}/${user._id}`);
    }catch(e){
        res.redirect("/login")
    }
})
app.get("/printout/:username/:userid",async function(req,res){
    try{
        let data = jwt.verify(req.cookies.token,"hariommodiji");
    
   
    let user = await customerDataBase.findOne({mobileNumber:data.mobileNumber});
    try{
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
    }catch(e){
        res.send("Erro aa gay bahi")
    }

    res.render("printout",{user:user});
}catch(e){
    res.redirect("/login")
}
})
app.post("/printout/:userid",upload.single("printout"),async function(req,res,next){
    try{
        let user = await customerDataBase.findOne({_id:req.params.userid});
        let tokenNumber = (Math.random()*1000000).toFixed(0);
        await printoutDataBase.create({
            name:user.name,
            mobileNumber:user.mobileNumber,
            userid:user._id,
            tokenNumber:tokenNumber,
            status:false,
            pdf:req.file.path,
        })
       
        res.send(`${tokenNumber}`)
    }
    catch(e){
        res.send("token number vapaas generate nahe hoga")
    }
    
})
app.get("/home/:userid",async function(req,res){
    try{
        let user = await customerDataBase.findOne({_id:req.params.userid});
        let product = await productDataBase.find();
        if(product) res.render("home",{user:user,product:product});
        else res.send("error hai bhai")
    }
    catch(e){
        res.send("error aa gaya bhi")
    }
   

}) 
app.get("/",async function(req,res){
    try{
        let data = jwt.verify(req.cookies.token,"hariommodiji");
        console.log(data.mobileNumber);
        let user = await customerDataBase.findOne({mobileNumber:data.mobileNumber});
        res.redirect(`/home/${user._id}`);
    }
    catch(e){
        // res.cookie("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGVOdW1iZXIiOiI3ODk4NDg4OTM1IiwiaWF0IjoxNzQwNjc3NDk4fQ.NO6OTqnX2Z6plSl1FWMLBXObPKObYpHCvRdNYjpGxrQ")
        res.render("login");
    }
})
app.get("/clear",function(req,res){
    try{
        res.clearCookie("token");
        res.redirect("/");
    }catch(e){
        res.redirect("/login")
    }
   
})
app.get("/login",function(req,res){
    res.render("login");
})



app.get("/profile/:userid",async function(req,res){
    try{
        let user = await customerDataBase.findOne({_id:req.params.userid});
     if(user) res.render("profile",{user:user});
     else res.send("error aa gaya")

    }
    catch(e){
        res.send("error aa gaya")
    }
})
app.get("/profile",async function(req,res){
    try{
        let data = jwt.verify(req.cookies.token,"hariommodiji");
        console.log(data.mobileNumber);
        let user = await customerDataBase.findOne({mobileNumber:data.mobileNumber});
        if(user)  res.redirect(`/profile/${user._id}`);
        else res.send("Error aa gaya");
    }catch(e){
        res.redirect("/login")
    }
   
   
})
app.get("/signup",function(req,res){
    res.render("signup");
})
app.get("/cart/:userid",async function(req,res){
    try{
        let user = await customerDataBase.findOne({_id:req.params.userid});
        let uniquecart = [...new Set(user.cart)]; 
        console.log(uniquecart)
        let cartProduct = await productDataBase.find({_id:uniquecart});
        console.log("This is cart ",cartProduct)
        res.render("cart",{user:user,cartProduct:cartProduct});
    }catch(e){
        res.send("error aa gaya")

    }
   
    


})

app.get("/cart",async function(req,res){
    try{
        let data = jwt.verify(req.cookies.token,"hariommodiji");

    
    console.log(data.mobileNumber);
    let user = await customerDataBase.findOne({mobileNumber:data.mobileNumber});
    if(user){
        res.redirect(`/cart/${user._id}`);
    }
    else{
        res.send("error hai Bhai")
    }
    }catch(e){
    res.redirect("/login")
    }
})
app.get("/productView/:productid",async function(req,res){

    try{
        let product = await productDataBase.findOne({_id:req.params.productid});
        let data =jwt.verify(req.cookies.token,"hariommodiji");
        let user =  await customerDataBase.findOne({mobileNumber:data.mobileNumber});
        if(user){
            res.render("productView",{product:product,user:user,productid:req.params.productid});
    
        }
        else{
            res.send("error aa gaya")
    
        }
    }catch(e){
        res.send("user is not login")
    }
    
 
})
app.get("/removeItem",function(req,res){
    let data = jwt.verify(req.cookies.token,"hariommodiji");
    if(data.mobileNumber=="7898488935"){
        res.render("remove");
    }
    else{
        res.redirect("/")
    }

})
app.post("/removeItem",async function(req,res){
   await  productDataBase.findOneAndDelete({name:req.body.name});
    res.redirect("/");
})
app.get("/updateItem/:productid",async function(req,res){
    try{let data = jwt.verify(req.cookies.token,"hariommodiji");
    if(data.mobileNumber=="7898488935"){
        let product = await productDataBase.findOne({_id:req.params.productid});
    res.render("update",{product:product});
    }
    else{
        res.redirect("/")
    }
    }catch(e){
    res.send("error aa gaya")
    }
})
app.post("/updateItem",async function(req,res){
   await  productDataBase.findOneAndUpdate({name:req.body.name},{name:req.body.newname,fakePrice:req.body.fakePrice,realPrice:req.body.realPrice,imageUrl:req.body.imageUrl,productCategary:req.body.productCategary});
    res.redirect("/");
})

app.get("/wishList/:userid/:productid",async function(req,res){
    await customerDataBase.findOneAndUpdate({_id:req.params.userid},{
        $push:{wishList:req.params.productid},
    })
    res.redirect(`/wishList/${req.params.userid}`);
})

app.get("/wishList/:userid",async function(req,res){
    let user = await customerDataBase.findOne({_id:req.params.userid});
    let wishList = await productDataBase.find({_id:user.wishList})
    console.log(wishList)
    res.render("wishList",{wishList:wishList});
})
app.get("/support",function(req,res){
    res.render("support");
})
app.get("/menu",function(req,res){
    res.render("menu");
})
app.get("/addItem",function(req,res){
    let data = jwt.verify(req.cookies.token,"hariommodiji");
    if(data.mobileNumber=="7898488935"){
  
        res.render("addItem");

    }
    else{
        res.redirect("/")
    }
})
app.post("/addItem",async function(req,res){
    let val = await productDataBase.create({
        imageUrl:req.body.imageUrl,
        name:req.body.name,
        fakePrice:req.body.fakePrice,
        realPrice:req.body.realPrice,
        productCategary:req.body.productCategary,
        off:(100- Number(Number(req.body.realPrice)/Number(req.body.fakePrice))*100).toFixed(2)
    })
   
    res.redirect("/");
})

app.post("/login",async function(req,res){
    let data = await customerDataBase.findOne({mobileNumber:req.body.mobileNumber});
    if(data){
        bcrypt.compare(req.body.password,data.password, async function(err,result){
            if(result==true){
                
                let token  =  jwt.sign({mobileNumber:req.body.mobileNumber},"hariommodiji");
                res.cookie("token",token);
                
                try{
                let data = jwt.verify(req.cookies.token,"hariommodiji");
                console.log(data.mobileNumber);
                let user = await customerDataBase.findOne({mobileNumber:data.mobileNumber});
                res.redirect(`/`);
             }
            catch(e){
               res.redirect("/")
            } 

                
            }
            else{
                res.redirect("/")
            }
        })
    }
    else{
        res.redirect("/")


    }
    
})

app.post("/signup",async function(req,res){
    if(req.body.mobileNumber.length !=10){
        res.send("Please enter 10 digit mobile nubmer")
    }
    else if(req.body.password == req.body.confirmPassword){
        let user = await customerDataBase.findOne({mobileNumber:req.body.mobileNumber}); 
        if(user){
            res.send("this Mobile number is already registered")
        }
        else{
            
            let otp = (Math.random()*10000).toFixed(0);
            let otpSave  =  jwt.sign({otp:otp},"hariommodiji");
            res.cookie("save",otpSave);
            sendMail(req.body.email,"the PayprStory",otp);
            console.log(otp);
            res.redirect(`/otp/${req.body.name}/${req.body.email}/${req.body.mobileNumber}/${req.body.password}/${req.body.college}`)
            
        }
    }
    else{
        res.send("Password and confirm pasword are different")
    }
   
})
app.get("/otp/:name/:email/:mobileNumber/:password/:college",function(req,res){
    res.render("otp",{name:req.params.name,email:req.params.email,mobileNumber:req.params.mobileNumber,password:req.params.password,college:req.params.college});
})
app.post("/otp/:name/:email/:mobileNumber/:password/:college",function(req,res){
   
    let otp = jwt.verify(req.cookies.save,"hariommodiji");
    console.log(otp)
    if(otp.otp == req.body.otp){
        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(req.params.password,salt,async function(err,hash){
                
                await customerDataBase.create({
                    name:req.params.name,
                    email:req.params.email,
                    mobileNumber:req.params.mobileNumber,
                    password:hash,
                    college:req.params.college,
                })
            })
        })
    res.redirect("/")

    }
    else{
        res.send("Working but otp is Wrong")
    }
   
})
app.get("/buy/:productid",async function(req,res){
    let product = await productDataBase.findOne({_id:req.params.productid})
    let data = jwt.verify(req.cookies.token,"hariommodiji");
    
    let user = await customerDataBase.findOne({mobileNumber:data.mobileNumber});
    if(user) {
    res.render("buy",{product:product,user:user});

    }
    else{
        res.send("error aa gaya")

    }
    
})
app.get("/addToCart/:productid",async function(req,res){

        let product = await productDataBase.findOne({_id:req.params.productid});
        if(product){
            let data = jwt.verify(req.cookies.token,"hariommodiji");
        let user = await customerDataBase.findOneAndUpdate({mobileNumber:data.mobileNumber},{ $push: { cart: req.params.productid } });
        
        res.render("buy",{product:product,user:user});   
        }
        else{
            res.send("Hariom")
        }
         
    

    
    
})

app.get("/order/:userid",async function(req,res){
    try{
    let user =await customerDataBase.findOne({_id:req.params.userid});
    console.log(user);
    let order = await orderDataBase.find({userid:req.params.userid});
    console.log("Order ka saman ",order)
    let allOrder = await orderDataBase.find();
    res.render("order",{user:user,order:order,allOrder:allOrder});
    }catch(e){
        res.redirect("/login")

    }
})
// app.get("/orderDetails/:userid",async function(req,res){
//     let user =await customerDataBase.findOne({_id:req.params.userid});
//     console.log(user);
//     let order = await orderDataBase.find({userid:req.params.userid});
//     console.log("Order ka saman ",order)
//     res.render("orderDetails",{user:user,order:order});
// })
app.get("/orderDelivered/:userid/:productid/:orderDate",async function(req,res){
    try{let data = jwt.verify(req.cookies.token,"hariommodiji");
    let me  = await customerDataBase.findOne({mobileNumber:data.mobileNumber}); 
    let user =await customerDataBase.findOne({_id:req.params.userid});
    console.log(user);
    let order = await orderDataBase.findOneAndUpdate({userid:req.params.userid,productid:req.params.productid,orderDate:req.params.orderDate},{
        status:"Delivered..."
    });
//    res.redirect(`/orderDetails${user._id}`);
    res.redirect(`/order/${me._id}`)
    }catch(e){
        res.redirect("/login")
    }
   
})

app.get("/orderConfirmed/:userid/:productid",async function(req,res){
    let data = jwt.verify(req.cookies.token,"hariommodiji");
    let user = await customerDataBase.findOne({mobileNumber:data.mobileNumber});
   
    let product = await productDataBase.findOne({_id:req.params.productid});
    let date = new Date();
    // date = date.toDateString();
   let order = await orderDataBase.create({
    userid:req.params.userid,
    productid :req.params.productid,
    status:"pending...",
    orderDate:Date.now(),
    imageUrl: product.imageUrl,
    name:product.name,
    username:user.name
   })
   await customerDataBase.findOneAndUpdate({mobileNumber:data.mobileNumber},{
    $push:{order:order._id}
    })

    res.redirect(`/order/${req.params.userid}`)
    })



app.get("/categaryProduct/:categary",async function(req,res){
    let product = await productDataBase.find();
    res.render("categaryProduct",{product:product,categary:req.params.categary});
})

app.get("/printoutOrder",async function(req,res){
    let printout = await printoutDataBase.find();

    res.render("printoutOrder",{printout:printout});
})

app.get("/read",async function(req,res){
    let data = await customerDataBase.find();
    res.send(data)
})


app.listen(3000);

