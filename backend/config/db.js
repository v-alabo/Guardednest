import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Dakjebbin:Dakjebbin505@cluster0.vqb04.mongodb.net/consignment')
        .then(() => console.log("DB Connected"))
        .catch((err) => console.error("DB connection error:", err));
};

// Use ES6 named export
export { connectDB };
