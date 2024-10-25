import mongoose from "mongoose";


const withdrawalSchema = new mongoose.Schema({
  username: { type: String, required: true },
  acctname: { type: String, required: true },
  acctnum: { type: Number, required: true },  
  amount: { type: Number, required: true },
  bank: { type: String, required: true },
  paypal: { type: String, required: true },
  wallet: { type: String, required: true },
  cashtag: { type: String, required: true }  
});

const withdrawModel = mongoose.model("withdraw", withdrawalSchema);

export default withdrawModel;