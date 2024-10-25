import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    fname: String,
    lname: String,
    date: String,
    address: String,
    country: String,
    phone: Number,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

const userModel = mongoose.models.users || mongoose.model("users", userSchema);

// Use ES6 export
export default userModel;
