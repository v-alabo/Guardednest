const mongoose = require('mongoose')

const FundSchema = new mongoose.Schema({
    username: String,
    plan: String,
    amount: String,
    //user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const FundModel = mongoose.model("funds", FundSchema);
module.exports = FundModel