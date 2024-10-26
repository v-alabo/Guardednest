import mongoose from "mongoose";

const fundSchema = new mongoose.Schema({
    username: String,
    plan: String,
    amount: String,
});

const fundModel = mongoose.model("funds", fundSchema);

// Use ES6 export
export default fundModel;
