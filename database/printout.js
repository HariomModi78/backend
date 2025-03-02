const mongoose = require("mongoose");

const printoutSchema  = mongoose.Schema({
    name:String,
    userid:String,
    mobileNumber:String,
    tokenNumber:String,
    status:Boolean,
    pdf:String,
})

module.exports = mongoose.model("printout",printoutSchema)