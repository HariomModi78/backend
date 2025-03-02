const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    userid:String,
    productid:String,
    status:String,
    orderDate:String,
    deliveredDate:String,
    imageUrl:String,
    name:String,
    username:String,
})

module.exports = mongoose.model("order",orderSchema);