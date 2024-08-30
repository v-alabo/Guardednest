const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type:String,unique:true},
    fname: String,
    lname: String,
    date: String,
    address: String,
    country: String,
    phone: Number,
    email: {type:String,unique:true},
    password: String,
    balance: Number,
    profit: Number
})

const userModel = mongoose.model("users", userSchema);
module.exports = userModel