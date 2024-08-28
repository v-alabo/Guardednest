const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
  username: { type: String, required: true },
  wallet: { type: String, required: true }, 
  amount: { type: Number, required: true }
});

const cryptoModel = mongoose.model("crypto", cryptoSchema);

module.exports = cryptoModel;