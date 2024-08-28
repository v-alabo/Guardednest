const mongoose = require("mongoose");

const cashAppSchema = new mongoose.Schema({
  username: { type: String, required: true },
  cashtag: { type: String, required: true }, 
  amount: { type: Number, required: true }
});

const cashAppModel = mongoose.model("cashapp", cashAppSchema);

module.exports = cashAppModel;