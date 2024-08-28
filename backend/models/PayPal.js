const mongoose = require("mongoose");

const payPalSchema = new mongoose.Schema({
  username: { type: String, required: true },
  paypal: { type: String, required: true }, 
  amount: { type: Number, required: true }
});

const payPalModel = mongoose.model("paypal", payPalSchema);

module.exports = payPalModel;