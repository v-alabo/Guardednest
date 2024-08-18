const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {type:String,unique:true},
    fname: String,
    lname: String,
    date: String,
    address: String,
    country: String,
    phone: Number,
    email: {type:String,unique:true},
    password: String
})

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel