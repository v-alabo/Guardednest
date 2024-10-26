import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://techmongo:sauceboy@technoob.37x9bhl.mongodb.net/guardednest')
        .then(() => console.log("DB Connected"))
        .catch((err) => console.error("DB connection error:", err));
};

export { connectDB };
