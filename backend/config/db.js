// ./config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://techmongo:sauceboy@technoob.37x9bhl.mongodb.net/guardednest').then(()=>console.log("DB Connected"));
}

module.exports = { connectDB }; 
//4L6hjrxIuRb0QTn53TwvHMknJZo3S0CuPVwFZxzU5KN1xWXOXrFcTaU8lToNvYnV
