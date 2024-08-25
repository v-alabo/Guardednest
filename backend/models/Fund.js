const mongoose = require('mongoose')

const fundSchema = new mongoose.Schema({
    username: String,
    plan: String,
    amount: String,
})

const fundModel = mongoose.model("funds", fundSchema);
module.exports = fundModel