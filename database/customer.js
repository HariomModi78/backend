const mongoose = require("mongoose");
const product = require("./product");
const printout = require("./printout")
const order = require("./order");
mongoose.connect("mongodb://127.0.0.1:27017/shopping");
const userSchema = mongoose.Schema({
    name:String,
    email:String,
    mobileNumber:String,
    password:String,
    college:String,
    cart:Array,
    order:Array,
    wishList:Array
})

module.exports = mongoose.model("customer",userSchema)
