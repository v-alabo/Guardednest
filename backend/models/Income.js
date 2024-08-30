const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  username: { type: String, required: true },
  balance: { type: Number, required: true },
  profit: { type: Number, required: true }
});

const incomeModel = mongoose.model("paypal", incomeSchema);

module.exports = incomeModel;