const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:String,
    fakePrice:String,
    realPrice:String,
    imageUrl:String,
    productCategary:String,
    off:String,
})

module.exports = mongoose.model("product",productSchema) 